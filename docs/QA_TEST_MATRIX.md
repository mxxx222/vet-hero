# QA Test Matrix — Eläinlääkäripeli

| Area | Test | Expected |
| --- | --- | --- |
| Launch | Open `elinlaakari-peli.html` offline | Loads, no console errors |
| Save | Complete treatment, refresh | `vetStars`, `vetCured` persist |
| Legacy | Old save keys only | Migration from legacy keys works |
| Pilot | 5 pilot cases in order | Repeatable, deterministic |
| Tools | Drag stethoscope/thermo/magnify to animal | Mini-game starts, finding recorded |
| Diagnosis gate | < 2 tools | Cannot proceed to treatment |
| Treatment | Wrong tool | Soft "ups", Bella redirects |
| Treatment | Correct tool | Confetti, star, sticker, surprise box |
| Stars | 1/3/5 unique animals cured | ⭐ / ⭐⭐ / ⭐⭐⭐ |
| Stickers | Heal each animal | Unlocks in Kokoelma modal |
| Album | Photo after recovery | Appears in Albumi modal |
| Daily gift | Claim once per day | Cannot double-claim same day |
| A11y | Reduced motion toggle | Animations disabled |
| A11y | High contrast | Readable, no invert hack |
| A11y | Large touch | Buttons ≥ 80px |
| A11y | Mute | Game playable silently |
| Touch | Drag tools on tablet | Pointer events work |
| Speech | fi-FI or fallback | No crash if voice missing |
| Stress | `__stressTest(100)` | 100/100 cases |
| Memory | Long session | No runaway timers/confetti |

## Automated
```javascript
window.__smokeTest();      // unit checks
window.__stressTest(100);  // case generation loop
```

## Manual FINAL QA
- [ ] 100 patients without refresh
- [ ] 100 patients with refresh mid-session
- [ ] Reduced motion full session
- [ ] Muted full session
- [ ] Touch-only mobile
- [ ] Portrait + landscape
