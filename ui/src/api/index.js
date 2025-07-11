const API_KEY = localStorage.getItem('apiKey') || 'changeme';

async function apiFetch(url, options = {}) {
  const headers = {
    'x-api-key': API_KEY,
    ...(options.headers || {}),
  };
  const opts = { ...options, headers };
  const res = await fetch(url, opts);
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || res.statusText);
  }
  return res.json();
}

export const api = {
  get: (url) => apiFetch(url),
  post: (url, body) => apiFetch(url, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } }),
  put: (url, body) => apiFetch(url, { method: 'PUT', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } }),
}; 