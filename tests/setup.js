import { vi } from "vitest";

// Node 26 exposes an unavailable localStorage global; use jsdom's real browser storage.
Object.defineProperty(globalThis, "localStorage", {
  configurable: true,
  value: globalThis.jsdom.window.localStorage,
});
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
window.matchMedia = vi.fn(() => ({
  matches: false,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}));
