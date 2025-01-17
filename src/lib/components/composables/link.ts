/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
export function handleAnchorClick(event: MouseEvent) {
  event.preventDefault();
  const link = event.currentTarget;
  const anchorId = new URL(link.href).hash.replace('#', '');
  const anchor = document.getElementById(anchorId);
  window.scrollTo({
    top: anchor.offsetTop,
    behavior: 'smooth'
  });
}