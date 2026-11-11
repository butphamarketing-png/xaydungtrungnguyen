export const REAL_PHOTOS = Array.from({ length: 10 }, (_, i) => `/cong-trinh/tn-${String(i + 1).padStart(2, "0")}.jpg`);

const KEEP = /^\/(cong-trinh\/tn-|logo|zalo|loader-|favicon|icon)|^\/[^?]*\.svg(\?|$)|^data:|^blob:/i;

const assigned = new Map();

export function realPhoto(src = "") {
  if (!src || KEEP.test(src)) return src;
  if (!assigned.has(src)) assigned.set(src, REAL_PHOTOS[assigned.size % REAL_PHOTOS.length]);
  return assigned.get(src);
}

function fixImg(img) {
  if (window.location.pathname.startsWith("/adminbp")) return;
  const src = img.getAttribute("src") || "";
  if (!src || KEEP.test(src)) return;
  img.removeAttribute("srcset");
  img.setAttribute("src", realPhoto(src));
}

export function installRealPhotoGuard() {
  if (typeof window === "undefined") return;

  document.querySelectorAll("img").forEach(fixImg);
  new MutationObserver((records) => {
    for (const record of records) {
      if (record.type === "attributes") {
        if (record.target.tagName === "IMG") fixImg(record.target);
        continue;
      }
      record.addedNodes.forEach((node) => {
        if (node.nodeType !== 1) return;
        if (node.tagName === "IMG") fixImg(node);
        else node.querySelectorAll?.("img").forEach(fixImg);
      });
    }
  }).observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ["src"] });
}
