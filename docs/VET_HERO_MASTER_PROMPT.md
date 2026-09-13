# Vet Hero / Maxin Eläinklinikka — Master Prompt

## Vision
Offline-first browser game for children ages 4–8. Finnish UI and voice (fi-FI). Single-file deployment: `elinlaakari-peli.html`.

## Core Principles
- Fun before educational; positive before challenging
- Visual + audio + emotional + progress feedback on every action
- Never punish; never show failure
- Playable without reading; touch-first; mobile-first
- Privacy-first: localStorage only, no network

## Save Keys (never rename)
- `vetStars`, `vetCured`, `vetPhotos`, `vetDecos`, `vetDailyGift`
- Extended: `vetHeroSaveBundle`, `vetHeroA11y`, `vetHeroCuredAnimals`, `vetHeroDecorations`

## Pilot Mode
- `CONFIG.USE_PILOT_MODE = true` — 5 fixed cases for validation
- Dynamic random cases behind flag for Phase 2+

## Architecture
- CONFIG, REGISTRY (immutable ANIMALS), SafeStore, StateMachine, EventBus
- AudioMgr (Web Audio + speechSynthesis), AnimMgr (confetti, cleanup)
- Accessibility toggles: reduced motion, high contrast, large touch, mute

## QA Before Release
See [QA_TEST_MATRIX.md](QA_TEST_MATRIX.md). Run `window.__smokeTest()` and `window.__stressTest(100)` in browser console.
