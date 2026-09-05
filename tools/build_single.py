"""Inline everything into one HTML file (dist/nightfall.html) for hosts that block external files, such as
claude.ai artifacts. Usage: build_single.py [max MB] [z8 mode: all|cities|none]
The z8 layer is the big one, so with a byte budget it keeps the tiles nearest the game cities first."""
import base64, json, math, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
BUDGET = float(sys.argv[1]) * 1e6 if len(sys.argv) > 1 else 15.5e6
MODE = sys.argv[2] if len(sys.argv) > 2 else "all"
T = os.path.join(ROOT, "tiles")

def uri(rel):
    b = open(os.path.join(ROOT, rel), "rb").read()
    return "data:image/webp;base64," + base64.b64encode(b).decode()

html = open(os.path.join(ROOT, "index.html")).read()
three = open(os.path.join(ROOT, "vendor", "three.min.js")).read()
app = open(os.path.join(ROOT, "app.js")).read()
z7 = json.load(open(os.path.join(T, "z7.json")))
z8 = json.load(open(os.path.join(T, "z8.json"))) if os.path.exists(os.path.join(T, "z8.json")) else []
cities = json.load(open(os.path.join(T, "cities.json")))

parts = ['const TILES = {\n  base: "%s",' % uri("tiles/base.webp")]
parts.append("  hi: [" + ",".join('"%s"' % uri(f"tiles/hi/{i}_{j}.webp") for j in range(4) for i in range(8)) + "],")
parts.append("  z7: [" + ",".join(json.dumps([*m[:4], uri("tiles/z7/" + m[4])]) for m in z7) + "],")
fixed = sum(len(p) for p in parts) + len(html) + len(three) + len(app)

chosen = []
if MODE != "none":
    def dist(m):  # angular distance from the tile centre to the nearest game city, in degrees
        clat, clon = (m[2] + m[3]) / 2, (m[0] + m[1]) / 2
        return min(math.hypot(lat - clat, (lon - clon) * math.cos(math.radians(clat))) for lat, lon in cities)
    order = sorted(z8, key=dist)
    used = fixed
    for m in order:
        if MODE == "cities" and dist(m) > 1.8:
            break
        d = uri("tiles/z8/" + m[4])
        if used + len(d) + 80 > BUDGET:
            break
        chosen.append(json.dumps([*m[:4], d]))
        used += len(d) + 80
parts.append("  z8: [" + ",".join(chosen) + "]\n};")

html = re.sub(r'<script src="vendor/three.min.js"></script>', lambda _: "<script>" + three + "</script>", html)
html = re.sub(r'<script src="tiles/manifest.js"></script>', lambda _: "<script>" + "\n".join(parts) + "</script>", html)
html = re.sub(r'<script src="app.js"></script>', lambda _: "<script>" + app + "</script>", html)
os.makedirs(os.path.join(ROOT, "dist"), exist_ok=True)
out = os.path.join(ROOT, "dist", "nightfall.html")
open(out, "w").write(html)
print(f"{out}: {os.path.getsize(out)/1e6:.2f} MB, z8 tiles inlined: {len(chosen)}/{len(z8)}")
