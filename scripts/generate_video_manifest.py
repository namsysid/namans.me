#!/usr/bin/env python3

from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
VIDEO_DIR = ROOT / "assets" / "videos"
MANIFEST_PATH = VIDEO_DIR / "manifest.json"
VIDEO_EXTENSIONS = {".mp4", ".mov", ".m4v", ".webm", ".ogg"}


def make_title(path: Path) -> str:
    return path.stem.replace("_", " ").replace("-", " ").strip()


def main() -> None:
    entries = []

    for path in sorted(VIDEO_DIR.iterdir()):
        if not path.is_file() or path.suffix.lower() not in VIDEO_EXTENSIONS:
            continue

        entries.append(
            {
                "filename": path.name,
                "title": make_title(path),
                "href": f"assets/videos/{path.name}",
            }
        )

    MANIFEST_PATH.write_text(json.dumps(entries, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(entries)} videos to {MANIFEST_PATH}")


if __name__ == "__main__":
    main()
