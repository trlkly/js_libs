// ==UserScript==
// @exclude       *
// @namespace     BigTSDMB
// @author        BigTSDMB

// ==UserLibrary==
// @name          $LIBRARY setStyle
// @description   Adds (or modifies) styles of a document. Fully featured replacement for GM_addStyle.
// @license       MIT
// @version       1.0

// ==/UserScript==

// ==/UserLibrary==

function setStyle(css, attributes) {
  if (typeof attributes == 'string') { attributes = { id: attributes } } //backwards compatibility
  let style = document.getElementById(attributes.id) || document.createElement('style');
  style.textContent = css;
  if (attributes) { Object.assign(style, attributes) }
  if (document.documentElement) {
    document.documentElement.appendChild(style);
  } else {
    new MutationObserver( (_, observer) => {
      observer.disconnect();
      document.documentElement.appendChild(style)
    }).observe(document, { childList: true } );
  }
  if (style.important) { //if important, append style at the end of the document after page loads
    style.removeAttribute('important');
    addEventListener('DOMContentLoaded', () => { document.documentElement.appendChild(style) });
  }
  return style;
}