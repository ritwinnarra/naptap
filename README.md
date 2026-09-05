# Nightfall Globe

A clone of [maptap.gg](https://maptap.gg) played on the Earth at night. Five cities a day. Spin the globe, drop a pin, get scored by distance.

The imagery is NASA's 2012 VIIRS day/night band composite (the classic "Black Marble"), so every city is lit wherever you look.

## Cities

The game draws from `cities.js`, about 1,360 notable places, built from the [GeoNames](https://www.geonames.org/) dumps (CC BY 4.0) by `tools/build_cities.py`. A place is in if any of these hold:

- population of 1 million or more
- a national capital
- a state or province capital of 400k or more, or of any size in the US, Canada, Australia, India and Brazil
- one of the 200 or so cities in `data/curated.json`, which carry hand-written facts
- listed in `data/notable.json`: places that are famous out of proportion to their size, from Oakland and Lake Tahoe to Petra and Tirumala. Most are looked up in GeoNames by name; a few dozen that aren't cities at all are given with coordinates.

Picks are weighted by population^(2/3), with a floor of 300k so the small famous places still come up.

The full list of every city over 100k (5,854 of them) is kept in `data/cities_100k.js` with the same format. To use it instead, point the script tag in `index.html` at it.

Boroughs and districts of larger cities are excluded. Cities in China, Russia, India, Brazil, Australia and Indonesia show their province or state, and so does any city that shares its name with another. Rebuild with

    python3 tools/build_cities.py <dir with cities15000.txt, cities500.txt, countryInfo.txt, admin1CodesASCII.txt>

after downloading those files from https://download.geonames.org/export/dump/.

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
- `tools/build_cities.py` builds `cities.js` from the GeoNames dump.
- `tools/build_single.py` inlines everything into `dist/nightfall.html` for hosts that block external files (claude.ai artifacts, for one). Pass a size budget in MB; it keeps the z8 tiles nearest the game cities first.

Needs Python 3 with Pillow and NumPy.
