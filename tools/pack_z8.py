"""Filter the raw GIBS level-7 JPEGs to lit tiles, convert them to WebP, and write tiles/z8.json
([lon0, lon1, lat0, lat1, filename] per tile). Usage: pack_z8.py <rawdir> [lit-fraction threshold]."""
import json, math, os, sys
import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
RAW = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "tiles", "z8raw")
THRESH = float(sys.argv[2]) if len(sys.argv) > 2 else 0.002
OUT = os.path.join(ROOT, "tiles", "z8")
os.makedirs(OUT, exist_ok=True)
DEG = 2.25

cities = json.load(open(os.path.join(ROOT, "tiles", "cities.json")))
city_tiles = {(math.floor((lon + 180) / DEG) % 160, math.floor((90 - lat) / DEG)) for lat, lon in cities}

meta, kept, total = [], 0, 0
for f in sorted(os.listdir(RAW)):
    if not f.endswith(".jpg"):
        continue
    c, r = map(int, f[:-4].split("_"))
    im = Image.open(os.path.join(RAW, f)).convert("RGB")
    a = np.asarray(im)
    lit = (a[:, :, 0] > 100).mean()  # lights are yellow-white; the navy ground stays well under R=100
    if lit < THRESH and (c, r) not in city_tiles:
        continue
    name = f"{c}_{r}.webp"
    im.save(os.path.join(OUT, name), "WEBP", quality=80, method=6)
    total += os.path.getsize(os.path.join(OUT, name))
    kept += 1
    lon0 = -180 + c * DEG
    lat1 = 90 - r * DEG
    meta.append([round(lon0, 4), round(lon0 + DEG, 4), round(lat1 - DEG, 4), round(lat1, 4), name])

meta.sort()
json.dump(meta, open(os.path.join(ROOT, "tiles", "z8.json"), "w"))
print(f"kept {kept} tiles, {total/1e6:.1f} MB webp, avg {total//max(1,kept)} bytes")
