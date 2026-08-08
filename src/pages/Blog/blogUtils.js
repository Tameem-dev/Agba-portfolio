export function readingTime(bodyParagraphs) {
  const words = bodyParagraphs.join(' ').split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
