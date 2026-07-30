// Runs blocking in <head> so the first painted frame is already in the right
// theme. Kept as a separate file rather than an inline <script> so the
// Content-Security-Policy in public/_headers can stay on script-src 'self'
// without needing 'unsafe-inline' or a hash that silently rots when edited.
try {
  var stored = localStorage.getItem('theme')
  var dark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  document.documentElement.dataset.theme = dark ? 'dark' : 'light'
} catch (e) {}
