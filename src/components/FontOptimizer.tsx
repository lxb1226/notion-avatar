import { useEffect } from 'react';

export default function FontOptimizer() {
  useEffect(() => {
    // Preload critical fonts with font-display: swap
    const fontFace = new FontFace(
      'Quicksand',
      'url(/fonts/Quicksand.ttf) format("truetype")',
      {
        display: 'swap',
        weight: 'normal',
        style: 'normal',
      }
    );

    fontFace
      .load()
      .then((loadedFont) => {
        document.fonts.add(loadedFont);
        // Add class to body to indicate font is loaded
        document.body.classList.add('fonts-loaded');
      })
      .catch((error) => {
        console.warn('Font loading failed:', error);
        // Fallback to system fonts
        document.body.classList.add('fonts-fallback');
      });
  }, []);

  return null;
}
