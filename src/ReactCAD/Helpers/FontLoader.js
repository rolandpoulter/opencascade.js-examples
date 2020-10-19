import opentype from 'opentype.js'

export function FontLoader() {
  // Preload the Various Fonts that are available via Text3D
  const preloadedFonts = [
    // '../../fonts/Roboto.ttf',
    // '../../fonts/Papyrus.ttf',
    // '../../fonts/Consolas.ttf'
  ];

  const fonts = {};

  preloadedFonts.forEach((fontURL) => {
    opentype.load(fontURL, (err, font) => {
      if (err) { console.log(err); }
      let fontName = fontURL.split('./fonts/')[1].split('.ttf')[0];
      fonts[fontName] = font;
    });
  });

  return fonts;
}
