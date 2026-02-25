// Centralized style constants for normalization
export const BASE_SPACE = 8;
export const FONT_FAMILY = 'System';
export const FONT_SIZE_BASE = 16;

export function scaled(n) {
  return BASE_SPACE * n;
}

export default {
  BASE_SPACE,
  FONT_FAMILY,
  FONT_SIZE_BASE,
  scaled,
};
