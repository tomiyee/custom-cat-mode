// These paths are defined in the file-loader section of webpack.config.cjs

/** The location of the millie gif */
const MILLIE_GIF = 'dist/public/icons/millie.gif';

/** Replaces the src attribute of the image to the given string */
function replaceImageSrc(image: HTMLImageElement, customImageUrl: string) {
  image.setAttribute('src', customImageUrl);
}

// Function to observe for new image elements being added to the DOM
function observeNewImages(customImageUrl: string) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      console.log(mutation);
      mutation.addedNodes.forEach((node) => {
        // If a new image is added to the DOM
        if (node instanceof HTMLImageElement)
          replaceImageSrc(node, customImageUrl);

        // If other elements (like divs) are added, check their children
        if (node instanceof HTMLElement) {
          const newImages = node.querySelectorAll('img');
          newImages.forEach((img) => replaceImageSrc(img, customImageUrl));
        }
      });
    });
  });

  // Observe the entire document for changes in child nodes
  observer.observe(document.body, { childList: true, subtree: true });

  // Replace existing images
  const images = document.querySelectorAll<HTMLImageElement>('img');
  images.forEach((img) => replaceImageSrc(img, gifUrl));
}

const gifUrl = chrome.runtime.getURL(MILLIE_GIF);

// Start observing the DOM for new images
observeNewImages(gifUrl);
