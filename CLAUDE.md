# Patel Wedding Seating Chart

Guest-facing seating lookup for Dhiral & Sanam's wedding reception.
May 30, 2026 · The Ballantyne Hotel, Charlotte, NC.

## What This Is

A single-page static site guests scan via QR code at the reception entrance.
They type their name, see their table number and tablemates instantly.
They can also browse all tables in a grid and tap any table for a full guest list.

No backend. No build step. Plain HTML, CSS, JS.

## File Structure

```
index.html    — markup and layout
styles.css    — all styles (CSS variables, components, animations)
script.js     — seating data + search logic + DOM rendering
```

## Updating the Seating Data

All guest data lives in the `TABLES` object at the top of `script.js`:

```js
const TABLES = {
  "1": ["First Last", "First Last", ...],
  "2": [...],
  ...
};
```

- Keys are table numbers as strings
- Values are arrays of guest names as strings
- Notes like `(infant)` or `(highchair)` are stripped automatically before display
- To update: edit the arrays and push — no other changes needed

## Design Tokens

Defined as CSS variables in `styles.css`:

| Variable       | Value     | Usage                       |
| -------------- | --------- | --------------------------- |
| `--oxblood`    | `#4A0E0E` | Header, result card bg      |
| `--gold`       | `#B8973A` | Accents, borders, dividers  |
| `--gold-light` | `#D4AF5A` | Table number in result card |
| `--cream`      | `#FAF7F2` | Page background             |
| `--warm-white` | `#FDF9F4` | Search section, tab bar     |

Fonts: **Cormorant Garamond** (display/headings) + **Jost** (body). Both via Google Fonts.

## Search Behavior

- Triggers after 2+ characters typed
- Matching priority: exact → starts-with → contains
- All matching is case-insensitive, non-alpha characters stripped
- "Not found" state shown if no match

## Deployment

Hosted on GitHub Pages. Pushes to `main` deploy automatically.

Live URL: `https://patels95.github.io/patel-wedding-seating`
Short URL (Bitly): `bit.ly/dhiralsanam` _(update once created)_
QR code generated from the Bitly short URL — not the GitHub URL directly.

## Key Constraints

- Mobile-first — guests are on their phones
- No frameworks, no bundlers, no dependencies beyond Google Fonts
- Keep it simple — this is a small static wedding site, not a production app
- Do not add features without checking; the guest experience should stay fast and minimal
