// Smooth-scroll libraries (Lenis) can fight native scroll on some devices —
// causing erratic scroll position and UI that flickers in response to it.
// That's not worth the tradeoff for a portfolio site, so this is a no-op
// and the app relies on native scrolling plus `scroll-behavior: smooth`
// in global.css for anchor navigation. Kept as a hook (rather than deleted)
// so it's a one-line swap to bring smooth scroll back later if wanted.
export default function useLenis() {}
