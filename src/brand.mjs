// Brand mark — a "T" with two forward tide lines (sea glass + coral) on a Pacific-indigo tile.
/** Logo mark SVG. `id` must be unique per page instance. */
export function markSvg(id = 'tw', cls = 'brand__mark') {
  return `<svg class="${cls}" viewBox="0 0 48 48" aria-hidden="true" focusable="false"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#26345C"/><stop offset="1" stop-color="#141C33"/></linearGradient></defs><rect width="48" height="48" rx="12" fill="url(#${id})"/><path d="M10.5 13.5 H33.5 M22 13.5 V36" stroke="#F3EBDD" stroke-width="3.8" stroke-linecap="round"/><path d="M27.2 25.2 q3.1 -2.5 6.2 0 t6.2 0" stroke="#9ED8C6" stroke-width="2.5" stroke-linecap="round" fill="none"/><path d="M27.2 31.4 q3.1 -2.5 6.2 0 t6.2 0" stroke="#E8775A" stroke-width="2.5" stroke-linecap="round" fill="none"/></svg>`;
}

export const markFile = () =>
  markSvg('g', 'mark').replace('<svg class="mark"', '<svg xmlns="http://www.w3.org/2000/svg"').replace(' aria-hidden="true" focusable="false"', '');
