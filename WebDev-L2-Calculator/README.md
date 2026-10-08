# Calculator — OIBSIP Web Development Internship (Level 2, Task 1)

## Objective
A fully functional browser-based calculator built with vanilla HTML, CSS, and JavaScript, capable of performing basic arithmetic operations through a clean button interface.

## Tech Stack
- HTML5
- CSS3 (Grid layout)
- JavaScript (Vanilla — no libraries)

## Features
- Display screen showing current input and running expression
- Number buttons (0–9) and decimal point
- Operator buttons: addition (+), subtraction (−), multiplication (×), division (÷)
- Equals (=) button to evaluate the expression
- Clear (C) button to reset
- Backspace (⌫) button to delete the last character
- Division-by-zero handled gracefully (displays "Error" instead of crashing)
- Operator chaining supported (e.g. 5 + 3 × 2 computes sequentially without a full reset)
- Button layout built using CSS Grid
- All interactivity handled via `addEventListener` — no inline `onclick` attributes
- Core logic built manually (no `eval()` used)

## How to Run
1. Clone or download this folder
2. Open `index.html` in any web browser
3. No build steps or dependencies required

## Folder Structure
```
WebDev-L2-Calculator/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Author
Lingadarini K
Web Development & Designing Track — Oasis Infobyte SIP Internship
