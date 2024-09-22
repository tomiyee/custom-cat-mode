// These paths are defined in the file-loader section of webpack.config.cjs

console.log('Cat Content Script Loaded');

/** The location of the millie gif */
const MILLIE_GIF = chrome.runtime.getURL('dist/public/icons/millie.gif');

enum Kitty {
  MANEKI = '.maneki-kitty',
  KINAKO = '.kinako-kitty',
  STRIPES = '.stripes-kitty',
  MIDNIGHT = '.midnight-kitty',
  FIREFOX = '.firefox-kitty',
}

const GIF_SUBSTITUTIONS: Record<Kitty, string> = {
  [Kitty.FIREFOX]: MILLIE_GIF,
  [Kitty.KINAKO]: MILLIE_GIF,
  [Kitty.MANEKI]: MILLIE_GIF,
  [Kitty.MIDNIGHT]: MILLIE_GIF,
  [Kitty.STRIPES]: MILLIE_GIF,
};

function waitForHeader() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) =>
      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          if (
            node.id === 'header' ||
            node.querySelectorAll('#header').length !== 0
          ) {
            console.log('Header loaded');
            observer.disconnect();
            observeNewImages();
          }
        }
      }),
    );
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

// Function to observe for new image elements being added to the DOM
function observeNewImages() {
  const observer = new MutationObserver(() => {
    Object.entries(GIF_SUBSTITUTIONS).forEach(([kitty, substitution]) => {
      const elems = document.querySelectorAll<HTMLDivElement>(kitty);
      elems.forEach((elem) => {
        const target = `url(${substitution})`;
        if (elem.style.backgroundImage !== target)
          elem.style.backgroundImage = target;
      });
    });
  });

  const header = document.getElementById('header');
  if (header === null) {
    console.error('Could not find the header');
    return;
  }
  observer.observe(header, { childList: true, subtree: true });
}

// Start observing the DOM for new images
window.addEventListener('load', () => {
  waitForHeader();
});
