// Shared helper functions for the Login Authentication System

function getUsers() {
  return JSON.parse(localStorage.getItem("registeredUsers")) || [];
}

function saveUsers(users) {
  localStorage.setItem("registeredUsers", JSON.stringify(users));
}

// Hash a password using SHA-256 via the browser's built-in Web Crypto API
// Passwords are never stored in plain text.
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}