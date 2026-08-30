import http from "node:http";
import { readFile } from "node:fs/promises";
import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Marked } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// .cursor/preview -> repo root
const REPO_ROOT = path.resolve(__dirname, "..", "..");
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "0.0.0.0";

const CSS_PATH = path.join(
  __dirname,
  "node_modules",
  "github-markdown-css",
  "github-markdown.css",
);

const DOCS = {
  "/": { file: "README.md", title: "README" },
  "/changelog": { file: "CHANGELOG.md", title: "CHANGELOG" },
  "/notice": { file: "NOTICE.md", title: "NOTICE" },
};

const MIME = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".css": "text/css; charset=utf-8",
};

const marked = new Marked({ gfm: true, breaks: false });
marked.use(gfmHeadingId());

function page(title, bodyHtml, css) {
  const nav = Object.entries(DOCS)
    .map(([href, d]) => `<a href="${href}">${d.title}</a>`)
    .join(" · ");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} — 5Ghost WiFi Lab preview</title>
<style>${css}</style>
<style>
  body { margin: 0; background: #f6f8fa; }
  .topbar { position: sticky; top: 0; z-index: 10; background: #24292f; color: #fff;
            padding: 10px 20px; font: 14px -apple-system, Segoe UI, sans-serif; }
  .topbar a { color: #79c0ff; text-decoration: none; margin: 0 4px; }
  .markdown-body { box-sizing: border-box; max-width: 980px; margin: 24px auto;
                   padding: 32px; background: #fff; border: 1px solid #d0d7de; border-radius: 6px; }
</style>
</head>
<body>
<div class="topbar">5Ghost WiFi Lab docs preview &nbsp;|&nbsp; ${nav}</div>
<article class="markdown-body">
${bodyHtml}
</article>
</body>
</html>`;
}

function safeAssetPath(urlPath) {
  const decoded = decodeURIComponent(urlPath);
  const resolved = path.resolve(REPO_ROOT, "." + decoded);
  // prevent path traversal outside the repo
  if (!resolved.startsWith(REPO_ROOT + path.sep)) return null;
  return resolved;
}

const server = http.createServer(async (req, res) => {
  try {
    const urlPath = (req.url || "/").split("?")[0];

    const doc = DOCS[urlPath];
    if (doc) {
      const [md, css] = await Promise.all([
        readFile(path.join(REPO_ROOT, doc.file), "utf8"),
        readFile(CSS_PATH, "utf8"),
      ]);
      const html = page(doc.title, marked.parse(md), css);
      res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
      res.end(html);
      return;
    }

    // static assets (images, etc.) relative to repo root
    const assetPath = safeAssetPath(urlPath);
    if (assetPath && existsSync(assetPath)) {
      const ext = path.extname(assetPath).toLowerCase();
      res.writeHead(200, {
        "content-type": MIME[ext] || "application/octet-stream",
      });
      createReadStream(assetPath).pipe(res);
      return;
    }

    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("404 Not Found: " + urlPath);
  } catch (err) {
    res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    res.end("500 Internal Error: " + err.message);
  }
});

server.listen(PORT, HOST, () => {
  console.log(`5Ghost docs preview serving ${REPO_ROOT}`);
  console.log(`  http://localhost:${PORT}/           (README)`);
  console.log(`  http://localhost:${PORT}/changelog  (CHANGELOG)`);
  console.log(`  http://localhost:${PORT}/notice     (NOTICE)`);
});
