# Vaca Muerta demo video

Re-makes `public/video/vaca-muerta-demo.mp4` (1280x720, 30 fps, about 60 s, no audio) and its poster
`public/video/vaca-muerta-demo-poster.jpg` from the published site.

```sh
python3 scripts/vaca-muerta-demo/record.py                                   # the live site
python3 scripts/vaca-muerta-demo/record.py --site ~/dev/vaca-muerta-data/site  # a local copy of the site's pages
```

Needs Python Playwright with its Chromium (`pip install playwright && playwright install chromium`) and ffmpeg.
A run takes about 3.5 minutes on a machine with a GPU. At the end it prints the size and the distinct-frame count
(`ffmpeg ... -vf mpdecimate`); the 2026-11-25 render kept 1780 of 1794 frames. `contact-sheet.jpg` shows one frame
every 2 s of that render.

## How the frames are made

The previous video was a real-time screen recording of the WebGL page: the headless browser could not draw every
frame in time, so it kept 58 distinct frames out of 857. Here `virtual-time.js` is injected before the page's own
scripts and replaces `requestAnimationFrame`, `performance.now`, the timers and the Web Animations clock with a clock
that only moves when the recorder steps it. Each video frame is one fixed slice of page time (stepped at 60 Hz or
finer, so the site never lowers its quality), drawn on the GPU and captured with the DevTools protocol, however long
that takes. The page is drawn at 1920x1080 and scaled down.

The 3D page (`mundo.html`) is drawn 490 px wider than the frame and cropped, because the site centres its scene to the
right of its story panel. The site's own panels are hidden and the captions are an overlay added by the recorder,
written in `record.py`. Before recording, the script checks the page's own figure self-check (`cifras comprobadas
N/N`) and stops if any figure fails.

## What it shows

1. The tour on `mundo.html`: wells appearing on the satellite image from 2011 to 2026 (fast through the first years),
   the 3D time reading with an orbit, one fracture event with its parent wells, and the 2,094 events turning into
   the event-study chart.
2. Three plates of the front page: the event-study gap, the placebo with false dates, the replication in two US
   basins (Colorado yes, Wyoming no).
3. The question agent, from `agente-demo.txt`.
4. An end card.

## agente-demo.txt

The verbatim output of `uv run python -m agente.demo` in the `vaca-muerta-data` repo at commit 562d175, with the
warehouse holding data to 2026-10. That demo does not call a language model: it replays the routing chosen in the
recorded evaluation (`agente/eval/resultados/holdout.json`) and runs each chosen operation live against the
warehouse, as its own header line says. The video shows two of its five answers (an interference cost and an
abstention); the long data hashes on the citation lines are shortened.
