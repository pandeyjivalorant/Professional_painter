'use client';

import ReactLightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/counter.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

/**
 * Fullscreen Lightbox / Modal viewer.
 *
 * Features provided by `yet-another-react-lightbox`:
 *  - Dark backdrop  (customised to #0B0B0B @ 97% opacity)
 *  - Close button   (top-right, styled gold)
 *  - ESC to close   (built-in)
 *  - Arrow key nav  (built-in)
 *  - Mouse wheel zoom (Zoom plugin)
 *  - Pinch zoom on mobile (Zoom plugin)
 *  - Drag to pan when zoomed (Zoom plugin)
 *  - Smooth fade animation (animation.fade = 400)
 *  - Thumbnails for navigation
 */
export function Lightbox({ open, close, slides, index }) {
  // Only use thumbnails plugin if there's more than one image
  const plugins = [Zoom, Counter];
  if (slides && slides.length > 1) {
    plugins.push(Thumbnails);
  }

  return (
    <ReactLightbox
      open={open}
      close={close}
      index={index}
      slides={slides}
      plugins={plugins}
      animation={{ fade: 400, swipe: 400 }}
      carousel={{ finite: false, preload: 2 }}
      controller={{ closeOnBackdropClick: true }}
      zoom={{
        maxZoomPixelRatio: 5,
        zoomInMultiplier: 2,
        doubleTapDelay: 300,
        doubleClickDelay: 300,
        doubleClickMaxStops: 2,
        keyboardMoveDistance: 50,
        wheelZoomDistanceFactor: 100,
        pinchZoomDistanceFactor: 100,
        scrollToZoom: true,
      }}
      counter={{ container: { style: { top: 'unset', bottom: 0 } } }}
      thumbnails={{
        position: 'bottom',
        width: 120,
        height: 80,
        border: 1,
        borderRadius: 0,
        padding: 4,
        gap: 16,
      }}
      styles={{
        container: { backgroundColor: 'rgba(11, 11, 11, 0.98)' },
        button: { filter: 'none', color: '#C9A227' },
        navigationPrev: { color: '#C9A227' },
        navigationNext: { color: '#C9A227' },
        icon: { color: '#C9A227' },
        thumbnailsContainer: { backgroundColor: 'transparent' },
        thumbnail: { borderColor: 'rgba(255,255,255,0.2)' },
      }}
      render={{
        iconClose: () => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="hover:rotate-90 transition-transform duration-300"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ),
      }}
    />
  );
}
