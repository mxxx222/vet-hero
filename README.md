# Vet Hero

Vet Hero is a production-ready, offline-first browser game for children ages 4–8. The game runs entirely in the browser with no external dependencies and saves progress locally.

## Run locally

1. Open `index.html` in a browser.
2. The game loads immediately and works offline after the first load.

## What’s included

- 6 friendly animal patients with unique needs
- reception, examination, treatment, recovery, photo gallery, sticker collection, and garden screens
- investigation and treatment decision flow with positive guidance
- offline-ready play with network state updates
- localStorage persistence for all key progression values
- daily gift rewards and clinic decoration progression
- accessibility-friendly UI and reduced-motion support

## Persistence and legacy compatibility

The game preserves existing legacy save keys:

- `vetStars`
- `vetCured`
- `vetPhotos`
- `vetDecos`
- `vetDailyGift`

Additional backward-compatible keys support richer data:

- `vetHeroSchemaVersion`
- `vetHeroStickerIds`
- `vetHeroPhotoAlbum`
- `vetHeroClinicTier`
- `vetHeroQueue`
- `vetHeroLastActiveArea`

## Accessibility notes

- Large touch-friendly buttons and tile targets
- Live status updates via ARIA live regions
- Reduced motion respected through OS preferences
- Clear visual focus and semantic button roles

## Testing notes

- Open `index.html` with network disabled and confirm the game still loads.
- Verify navigation buttons respond on touch and mouse.
- Complete a patient cycle: Reception → Examination → Treatment → Celebration.
- Confirm localStorage contains `vetStars`, `vetCured`, `vetPhotos`, `vetDecos`, and `vetDailyGift`.
- Visit Gallery and Stickers screens to confirm collection state loads.
- Claim the daily gift once per local day.
- Confirm the offline indicator updates when the browser is offline.

## Governance docs

- [COPILOT_INSTRUCTIONS.md](COPILOT_INSTRUCTIONS.md)
- [docs/VET_HERO_MASTER_PROMPT.md](docs/VET_HERO_MASTER_PROMPT.md)
- [docs/QA_TEST_MATRIX.md](docs/QA_TEST_MATRIX.md)
- [docs/ENGINEERING_CHANGE_TEMPLATE.md](docs/ENGINEERING_CHANGE_TEMPLATE.md)
