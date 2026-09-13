# Changelog — Eläinlääkäripeli

## 2026-09-12 — Open world map

### Added
- `🗺️ Kartta` room with `renderMap()` — navigate to Klinikka, Piha, Albumi, Kokoelma
- Mini clinic preview on map showing `placedDecorations` (room: clinic)
- `GAME_STATE.MAP` + VALID_TRANSITIONS for map navigation
- Bella first-visit greeting on map (`mapVisited` persisted)

## 2026-09-12 — Interactive clinic decoration

### Added
- Interactive `clinic-scene` on reception (view) and garden (place decorations)
- `decoInventory` + `placedDecorations` save arrays with localStorage sync
- Tap palette → tap scene to place earned decorations (🌷🧸🎈🖼️)

### Fixed
- `AnimMgr.cleanup()` no longer clears all game timers (day/night interval safe)
- Removed duplicate `attachButtonSpeech` listeners on every render
- SmokeTest asserts all render functions exist

## Validation Pilot Release

### Added
- Single-file game `elinlaakari-peli.html` (Finnish, offline)
- 5 animals with personalities, pilot cases (deterministic)
- Drag & drop tools + mini-games (heartbeat, thermometer, magnify)
- Bella assistant, Web Audio, speech synthesis fi-FI
- Star progression (1/3/5), per-animal stickers, photo album
- Surprise box, colorable reward canvas, clinic growth visuals
- Daily gift, day/night mode, NPC waiting queue
- Accessibility: reduced motion, high contrast, large touch, mute
- SafeStore, save versioning, StateMachine, EventBus, AnimMgr cleanup
- Smoke test (`__smokeTest`) and stress test (`__stressTest`)

### Fixed
- Correct `prefers-reduced-motion: reduce` (not `reducing`)
- Real high-contrast theme (not CSS invert hack)
- `performance.memory.usedJSHeapSize` with Chromium guard
- Immutable ANIMALS/REGISTRY (no in-place mutation)
- Color + icon + voice for all feedback (not color alone)

### Preserved
- Legacy localStorage keys: vetStars, vetCured, vetPhotos, vetDecos, vetDailyGift
