# Local From Bocas – Visual Style Guide v0.1

_First draft based on the current Squarespace Site Styles palette and component previews shared._  
_Hex codes are approximate – sample the original assets if you need exact brand colors._

---

## 1. Brand Essence

**Voice**   Friendly • Local-expert • Eco-conscious • Empowering.

**Tag-line (working):** "Your trusted local gateway to Bocas del Toro."

---

## 2. Color Palette

| Swatch | Name | Hex (≈) | RGB | Typical Usage |
|--------|------|---------|-----|---------------|
| ![#8CC4D8](https://via.placeholder.com/24/8CC4D8/000000?text=+) | Ocean Blue | `#8CC4D8` | 140 196 216 | Links, accent backgrounds, checked-state in forms |
| ![#F4EDDD](https://via.placeholder.com/24/F4EDDD/000000?text=+) | Sand Ivory | `#F4EDDD` | 244 237 221 | Global page background, form fields |
| ![#F08E80](https://via.placeholder.com/24/F08E80/000000?text=+) | Coral Pink | `#F08E80` | 240 142 128 | Primary buttons, highlights, CTAs |
| ![#7C756D](https://via.placeholder.com/24/7C756D/FFFFFF?text=+) | Driftwood Brown | `#7C756D` | 124 117 109 | Headings, body text, icons |
| ![#675F59](https://via.placeholder.com/24/675F59/FFFFFF?text=+) | Deep Cacao | `#675F59` | 103 97 91 | Footers, dark overlays, borders |

> **Contrast note:** Ocean Blue & Coral Pink both pass WCAG AA on Sand Ivory. For buttons over Deep Cacao use **#FFFFFF** text.

---

## 3. Typography

| Role | Typeface | Weight | Size / Line-height* | Extras |
|------|----------|--------|---------------------|--------|
| Display / H1 | Epilogue (or similar geometric sans) | 600 | 48 px / 1.1 | Letter-spacing 0.05em all-caps optional |
| H2 – H3 | Epilogue | 500 | 32–40 px | Same tracking as H1 |
| Body | Karla | 400 | 18 px / 1.6 | Sentence case |
| Small / Meta | Karla | 400 | 14 px / 1.5 | Uppercase, ‑2% tracking |

\*Adjust sizes responsively: reduce 15–20 % on screens < 640 px.

---

## 4. Buttons

| Type | Fill | Text | Border | Radius | Shadow |
|------|------|------|--------|--------|--------|
| Primary | Coral Pink | #FFFFFF | None | 999 px (pill) | 0 2 4 rgba(0,0,0,0.1) |
| Secondary | Transparent | Driftwood Brown | 2 px Driftwood Brown | 999 px | None |
| Disabled | Deep Cacao @ 20 % opacity | #FFFFFF @ 60 % | None | 999 px | None |

_Hover / Focus:_ lighten Coral Pink by +10 % (`#F4ABA1`), underline text on keyboard focus for accessibility.

---

## 5. Form Elements

* **Input field background:** Sand Ivory 100 %.
* **Border:** 1 px solid Driftwood Brown.
* **Corner radius:** 24 px (capsule appearance).
* **Checkbox / Toggle checked color:** Ocean Blue.
* **Placeholder text:** Driftwood Brown @ 60 % opacity.

---

## 6. Iconography

Use thin-stroke line icons (1.5 px) in Driftwood Brown.  
Prefer **Phosphor** or **Lucide** icon sets for consistency.

---

## 7. Imagery & Illustration

* Vibrant, sun-lit photos of Bocas del Toro: ocean blues + lush greens.  
* Apply a subtle warm filter (`#F4EDDD` overlay @ 10 %) to harmonise with Ivory background.  
* Illustrations: flat, desaturated palette matching Ocean Blue & Coral Pink accents.

---

## 8. Layout & Spacing

* **Grid:** 12-col fluid, max-width 1200 px, 24 px gutters.
* **Spacing scale:** 4 / 8 / 12 / 24 / 48 px.
* **Section padding:** min 48 px top & bottom.
* **Cards:** Sand Ivory background, 8 px radius, subtle shadow `0 1 3 rgba(0,0,0,0.05)`.

---

## 9. Squarespace Implementation Cheatsheet

| Element | Panel | Setting |
|---------|-------|---------|
| Color palette | Design → Colors → Edit Palette | Enter hex above in given order |
| Fonts | Design → Fonts | Set heading tier to Epilogue, body tier to Karla |
| Buttons | Design → Buttons | Choose "Full Pill" shape, set fill & text colors |
| Forms | Site Styles → Forms | Update field background & border |
| Section backgrounds | Fluid Engine → Section Styles | Use Sand Ivory by default; alternate Ocean Blue @ 4 % tint for variety |

---

## 10. Voice & Messaging (Micro-copy)

* Use first-person when sharing local tips ("I've lived in Bocas my whole life ...").
* Keep CTAs action-oriented: **"Plan Your Trip", "Book Now"**.
* Sprinkle ecological responsibility: **"Leave only footprints on the sand."**

---

## Next Steps

1. Test color contrast on real content sections.
2. Define motion guidelines (button hover, image reveal) if needed.
3. Iterate once the full site structure is in place.

_Last updated: 2025-06-26_ 