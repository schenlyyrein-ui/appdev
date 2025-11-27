// src/api/auth.js

const API_BASE_URL = "http://localhost:4000/api/auth";

export async function signup({ fullname, email, username, password }) {
  const res = await fetch(`${API_BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fullname, email, username, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Signup failed");
  }
  return data; // { message, user, token }
}

export async function login({ identifier, password }) {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ identifier, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }
  return data; // { message, user, token }
}
