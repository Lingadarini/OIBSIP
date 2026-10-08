# Login Authentication System — OIBSIP Web Development Internship (Level 2, Task 4)

## Objective
A client-side authentication system featuring user registration, login validation, and a protected dashboard page, built using HTML5, CSS3, and vanilla JavaScript with `localStorage` for persistence.

## Tech Stack
- HTML5
- CSS3
- JavaScript (Vanilla)
- Web Crypto API (`crypto.subtle`) for SHA-256 password hashing
- `localStorage` for user accounts, `sessionStorage` for the active login session

## Features
- Registration page with email/username and password fields
- Password validation: minimum 8 characters, at least 1 number
- Duplicate account check — prevents registering the same email/username twice
- Login page with generic error handling (does not reveal which field — email or password — was incorrect)
- Protected Dashboard page — only accessible after a successful login; redirects to the login page if accessed directly without an active session
- Logout button clears the session and redirects to login
- Passwords are never stored in plain text — hashed using SHA-256 before saving
- Basic form validation — empty submissions are rejected on both pages

## How to Run
1. Clone or download this folder
2. Open `register.html` in any web browser to create an account
3. Log in via `login.html` using the same credentials
4. You'll be redirected to `dashboard.html`, a protected page accessible only while logged in
5. No build steps, server, or dependencies required — everything runs client-side

## Folder Structure
```
WebDev-L2-LoginAuth/
├── register.html
├── login.html
├── dashboard.html
├── script.js
├── style.css
└── README.md
```

## Author
Lingadarini K
Web Development & Designing Track — Oasis Infobyte SIP Internship
