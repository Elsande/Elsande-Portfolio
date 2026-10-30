# React migration implementation plan

**Goal:** Migrate the approved portfolio to React + Vite with maintainable folders and equivalent behavior.
**Spec:** [Approved design](react-migration-design.md)
**Execution:** Inline in the current workspace. No Git worktree: the supplied .git directory is an environment placeholder, not a repository. No commits or deployment requested.

## Constraints

Preserve the approved design, content, EN/ID, light/dark theme, accessible navigation, loader, project filters, CV download and email/clipboard behavior. Keep both HTML URLs. Use plain CSS and no backend, router or UI library. Preserve source documents in docs/references and leave environment folders untouched.

## Tasks

- [x] 1. Set up React/Vite, two HTML entries and tests. Add interaction tests that fail before implementation.
- [x] 2. Extract existing content into src/data. Build preference context/hook, Header, Footer, Loader, ProjectCard, six home sections, and both page components. Test storage failures, filtering, translation, theme, clipboard and loader cleanup.
- [x] 3. Move public assets/source documents into the approved folders. Split and format CSS by responsibility. Remove superseded DOM scripts and tests only after equivalent React tests exist.
- [x] 4. Build both pages, run tests, inspect actual browser output where possible, verify bundled links/assets and document local development/build commands.

## Review focus

- A direct visit to projects.html renders the archive and links back to the correct home anchors.
- Storage blocked or malformed does not prevent rendering or changing preferences.
- StrictMode effect replay does not suppress the first loader or leak timers/listeners.
- Reduced motion removes loading animation; returning visits do not show it.
- Clipboard failure offers a manual fallback; theme and language propagate across pages.

## Verification and decisions

Record results here after execution. Dependency versions resolved from the package registry and locked, rather than copied from an old scaffold.

### Results

- React/Vite migration completed inline. Both production entries build successfully.
- 12 React interaction tests cover normal, blocked-storage, malformed-preference, reduced-motion and StrictMode conditions.
- Production asset checks verify both pages, bundled CSS/JS, portrait and PDF download.
- Browser checks passed at 320, 390, 768, 1024 and 1440px with no horizontal overflow or page errors. Verified navigation, persistence, filters and PDF response.
- Visual review found portrait labels obscured by the photo and an overly dark photo in dark mode. Added a solid caption background and disabled multiply blending in dark mode.
- Ruling: use real jsdom localStorage explicitly in test setup because Node 26 exposes an unavailable global that Vitest otherwise inherits. Production preference handling is unchanged.
- Legacy scripts/styles and static-only tests were removed after replacement React tests passed. Source PDFs and original photo preserved under the approved folders.
