import { act } from "react";
import { createRoot } from "react-dom/client";
import { beforeEach, afterEach, it, expect, vi } from "vitest";
import Reveal from "../src/components/Reveal";

let root, container, callback, observer;
beforeEach(() => {
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  observer = { observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() };
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(cb) {
        callback = cb;
        return observer;
      }
    },
  );
  window.matchMedia.mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});
it("reveals once on entering the viewport and cleans up the observer", async () => {
  await act(async () =>
    root.render(
      <Reveal>
        <h2>Experience</h2>
      </Reveal>,
    ),
  );
  const element = container.firstChild;
  expect(element.dataset.visible).toBe("false");
  await act(async () => callback([{ isIntersecting: true, target: element }]));
  expect(element.dataset.visible).toBe("true");
  expect(observer.unobserve).toHaveBeenCalledWith(element);
  await act(async () => root.unmount());
  expect(observer.disconnect).toHaveBeenCalled();
  root = createRoot(container);
});
it("keeps content visible with reduced motion or no observer support", async () => {
  window.matchMedia.mockReturnValue({
    matches: true,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });
  await act(async () =>
    root.render(
      <Reveal>
        <p>Always readable</p>
      </Reveal>,
    ),
  );
  expect(container.firstChild.dataset.visible).toBe("true");
  expect(observer.observe).not.toHaveBeenCalled();
});
it("keeps content visible if IntersectionObserver is unavailable", async () => {
  vi.stubGlobal("IntersectionObserver", undefined);
  await act(async () =>
    root.render(
      <Reveal>
        <p>Fallback content</p>
      </Reveal>,
    ),
  );
  expect(container.firstChild.dataset.visible).toBe("true");
});
it("reveals immediately when reduced motion is enabled during the visit", async () => {
  const addEventListener = vi.fn();
  const removeEventListener = vi.fn();
  window.matchMedia.mockReturnValue({
    matches: false,
    addEventListener,
    removeEventListener,
  });
  await act(async () =>
    root.render(
      <Reveal>
        <p>Motion preference</p>
      </Reveal>,
    ),
  );
  const onChange = addEventListener.mock.calls[0][1];
  await act(async () => onChange({ matches: true }));
  expect(container.firstChild.dataset.visible).toBe("true");
  expect(observer.disconnect).toHaveBeenCalled();
});
