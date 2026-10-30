import { StrictMode, act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "../src/App.jsx";

let container;
let root;
const click = async (selector) => {
  await act(async () => container.querySelector(selector).click());
};

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  window.history.replaceState(null, "", "/");
  window.matchMedia.mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });
  document.head.innerHTML = '<meta name="theme-color" content="#f7f7f2">';
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.restoreAllMocks();
  vi.useRealTimers();
});
const render = async () =>
  act(async () =>
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    ),
  );

describe("home and preferences", () => {
  it("renders the CV experience and one page heading", async () => {
    await render();
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(container.textContent).toContain("PT. Platinum Ceramics Industry");
    expect(container.querySelector("a[download]").getAttribute("href")).toBe(
      "./documents/cv.pdf",
    );
    expect(container.querySelector("img").getAttribute("src")).toBe(
      "./images/portrait.webp",
    );
  });
  it("translates the complete page and restores the choice on remount", async () => {
    await render();
    await click("#lang-toggle");
    expect(document.documentElement.lang).toBe("id");
    expect(container.textContent).toContain("Lihat proyek saya");
    expect(
      container.querySelector("#menu-toggle").getAttribute("aria-label"),
    ).toBe("Buka navigasi");
    expect(localStorage.getItem("portfolio-language")).toBe("id");
    await act(async () => root.unmount());
    root = createRoot(container);
    await render();
    expect(container.textContent).toContain("Lihat proyek saya");
  });
  it("toggles and persists theme", async () => {
    await render();
    await click("#theme-toggle");
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem("portfolio-theme")).toBe("dark");
    expect(document.querySelector('meta[name="theme-color"]').content).toBe(
      "#17211d",
    );
  });
  it("renders and switches preferences when browser storage is blocked", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw Error("blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw Error("blocked");
    });
    await render();
    await click("#lang-toggle");
    await click("#theme-toggle");
    expect(document.documentElement.lang).toBe("id");
    expect(document.documentElement.dataset.theme).toBe("dark");
  });
  it("ignores invalid saved preferences", async () => {
    localStorage.setItem("portfolio-theme", "invalid");
    localStorage.setItem("portfolio-language", "invalid");
    await render();
    expect(document.documentElement.lang).toBe("en");
    expect(document.documentElement.dataset.theme).toBe("light");
  });
});

describe("mobile navigation", () => {
  it("keeps the menu open when its SVG icon is clicked", async () => {
    await render();
    await act(async () =>
      container
        .querySelector("#menu-toggle svg path")
        .dispatchEvent(new MouseEvent("click", { bubbles: true })),
    );
    expect(
      container.querySelector("#menu-toggle").getAttribute("aria-expanded"),
    ).toBe("true");
  });

  it("opens, closes with Escape, and restores focus", async () => {
    await render();
    await click("#menu-toggle");
    expect(
      container.querySelector("#menu-toggle").getAttribute("aria-expanded"),
    ).toBe("true");
    await act(async () =>
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" })),
    );
    expect(
      container.querySelector("#menu-toggle").getAttribute("aria-expanded"),
    ).toBe("false");
    expect(document.activeElement).toBe(
      container.querySelector("#menu-toggle"),
    );
  });
  it("closes when a navigation link is chosen or outside is clicked", async () => {
    await render();
    await click("#menu-toggle");
    await click("#navigation a");
    expect(container.querySelector("#navigation").className).not.toContain(
      "open",
    );
    await click("#menu-toggle");
    await act(async () =>
      document.body.dispatchEvent(new MouseEvent("click", { bubbles: true })),
    );
    expect(container.querySelector("#navigation").className).not.toContain(
      "open",
    );
  });
});

describe("project archive", () => {
  it("renders the direct archive URL and filters its projects", async () => {
    window.history.replaceState(null, "", "/projects.html");
    await render();
    expect(container.querySelector("h1").textContent).toBe(
      "Work, in practice.",
    );
    expect(container.querySelectorAll(".project")).toHaveLength(4);
    expect(container.querySelector("#navigation a").getAttribute("href")).toBe(
      "./index.html#about",
    );
    await click('[data-filter="vision"]');
    expect(container.querySelectorAll(".project")).toHaveLength(2);
    expect(
      container
        .querySelector('[data-filter="vision"]')
        .getAttribute("aria-pressed"),
    ).toBe("true");
    expect(container.querySelector("#filter-status").textContent).toBe(
      "2 projects shown",
    );
    await click("#lang-toggle");
    expect(container.querySelector("#filter-status").textContent).toBe(
      "2 proyek ditampilkan",
    );
    await click('[data-filter="all"]');
    expect(container.querySelectorAll(".project")).toHaveLength(4);
  });
});

describe("loader", () => {
  it("works under StrictMode, has a timeout, and skips subsequent mounts", async () => {
    vi.useFakeTimers();
    await render();
    expect(container.querySelector("#loader")).not.toBeNull();
    await act(async () => vi.advanceTimersByTime(2100));
    expect(container.querySelector("#loader")).toBeNull();
    await act(async () => root.unmount());
    root = createRoot(container);
    await render();
    expect(container.querySelector("#loader")).toBeNull();
  });
  it("skips animation for reduced motion", async () => {
    window.matchMedia.mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
    await render();
    expect(container.querySelector("#loader")).toBeNull();
  });
});

describe("contact", () => {
  it("copies email and clears stale feedback when language changes", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    await render();
    await click("#copy-email");
    expect(writeText).toHaveBeenCalledWith("elsandeputra890@gmail.com");
    expect(container.querySelector("#copy-status").textContent).toBe(
      "Email address copied.",
    );
    await click("#lang-toggle");
    expect(container.querySelector("#copy-status").textContent).toBe("");
    await click("#lang-toggle");
    expect(container.querySelector("#copy-status").textContent).toBe("");
  });
  it("offers manual copy when clipboard permission fails", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockRejectedValue(Error("denied")) },
    });
    await render();
    await click("#copy-email");
    expect(container.querySelector("#copy-status").textContent).toContain(
      "manually",
    );
  });
});
