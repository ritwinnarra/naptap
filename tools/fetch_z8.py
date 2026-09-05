"""Fetch NASA GIBS VIIRS_CityLights_2012 tiles at the finest level (EPSG:4326 "500m" set, level 7:
160x80 tiles of 512px, 2.25 deg each, ~490 m/px at the equator) for every area the zoom-7 patches cover.
Raw JPEGs land in the given output dir as {col}_{row}.jpg. Run tools/pack_z8.py afterwards to filter and convert."""
import json, math, os, sys, urllib.request
from concurrent.futures import ThreadPoolExecutor

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "tiles", "z8raw")
os.makedirs(OUT, exist_ok=True)
DEG = 2.25
URL = "https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/VIIRS_CityLights_2012/default/500m/7/{row}/{col}.jpg"

z7 = json.load(open(os.path.join(ROOT, "tiles", "z7.json")))
cities = json.load(open(os.path.join(ROOT, "tiles", "cities.json")))
want = set()
for lon0, lon1, lat0, lat1, _ in z7:
    c0, c1 = math.floor((lon0 + 180) / DEG), math.ceil((lon1 + 180) / DEG) - 1
    r0, r1 = math.floor((90 - lat1) / DEG), math.ceil((90 - lat0) / DEG) - 1
    for c in range(c0, c1 + 1):
        for r in range(r0, r1 + 1):
            want.add((c % 160, min(79, max(0, r))))
for lat, lon in cities:
    c, r = math.floor((lon + 180) / DEG), math.floor((90 - lat) / DEG)
    for dc in (-1, 0, 1):
        for dr in (-1, 0, 1):
            want.add(((c + dc) % 160, min(79, max(0, r + dr))))
want = sorted(want)
print("candidate tiles", len(want), flush=True)

def get(cr):
    c, r = cr
    p = os.path.join(OUT, f"{c}_{r}.jpg")
    if os.path.exists(p) and os.path.getsize(p) > 0:
        return "cached"
    for attempt in range(4):
        try:
            d = urllib.request.urlopen(URL.format(row=r, col=c), timeout=60).read()
            open(p, "wb").write(d)
            return "ok"
        except Exception as e:
            err = e
    return f"fail {c}_{r}: {err}"

done = 0
with ThreadPoolExecutor(8) as ex:
    for res in ex.map(get, want):
        done += 1
        if res.startswith("fail"):
            print(res, flush=True)
        if done % 200 == 0:
            print(done, "/", len(want), flush=True)
print("done", done)
