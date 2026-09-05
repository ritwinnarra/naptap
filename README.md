# Nightfall Globe

A clone of [maptap.gg](https://maptap.gg) played on the Earth at night. Five cities a day. Spin the globe, drop a pin, get scored by distance.

The imagery is NASA's 2012 VIIRS day/night band composite (the classic "Black Marble"), so every city is lit wherever you look.

## Running it

It's a static site. Serve the folder and open `index.html`:

    python3 -m http.server 8000

Opening the file directly won't work because the browser blocks texture loads from `file://`.

## How the imagery is layered

GPU memory on phones is small, so the globe keeps only the tiles near the current view loaded and drops the rest as you move. Four layers, coarse to fine:

| layer | tiles | resolution | shown when |
|---|---|---|---|
| base | one 4096x2048 texture | ~10 km/px | always |
| hi | 32 tiles of 2048px | ~2.4 km/px | always |
| z7 | 291 patches of 512px | ~1.2 km/px | zoomed in |
| z8 | 1571 tiles of 512px | ~490 m/px | zoomed right in |

The z8 layer is NASA GIBS `VIIRS_CityLights_2012` at its finest level (EPSG:4326, level 7, 2.25 degree tiles). It only covers lit areas, which is all that matters at night.

`tiles/manifest.js` lists every tile with its lat/lon bounds. Regenerate it with `python3 tools/manifest.py` after changing anything under `tiles/`.

## Tools

- `tools/fetch_z8.py` pulls the level-7 tiles from GIBS for every area the z7 patches cover.
- `tools/pack_z8.py` drops the dark ones and converts the rest to WebP.
- `tools/manifest.py` writes `tiles/manifest.js`.
- `tools/build_single.py` inlines everything into `dist/nightfall.html` for hosts that block external files (claude.ai artifacts, for one). Pass a size budget in MB; it keeps the z8 tiles nearest the game cities first.

Needs Python 3 with Pillow and NumPy.
