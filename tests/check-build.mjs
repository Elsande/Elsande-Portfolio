import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";

for (const entry of ["index.html", "projects.html"]) {
  const html = await readFile(`dist/${entry}`, "utf8");
  assert.match(html, /id="root"/, `${entry} must mount React`);
  const assets = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map(
    (match) => match[1],
  );
  for (const asset of assets) {
    if (!asset.startsWith("http")) await access(resolve("dist", asset));
  }
  assert(
    assets.some((asset) => asset.endsWith(".js")),
    `${entry} needs its production bundle`,
  );
}
for (const file of ["dist/documents/cv.pdf", "docs/references/Profile.pdf"]) {
  const content = await readFile(file);
  assert.equal(
    content.subarray(0, 4).toString(),
    "%PDF",
    `${file} must be a PDF`,
  );
}
await access("dist/images/portrait.webp");
console.log(
  "PASS: both production entries, bundled asset references, portrait, CV download and source Profile PDF",
);
