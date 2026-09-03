import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { extname } from "node:path";

const workerFiles = [
  "index.html",
  "site.css",
  "site.js",
  "favicon.svg",
  "robots.txt",
  "sitemap.xml",
];

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

const entries = await Promise.all(workerFiles.map(async (file) => {
  const body = await readFile(file);
  const route = `/${file}`;
  return {
    route,
    body: body.toString("base64"),
    contentType: contentTypes[extname(file)] || "application/octet-stream",
  };
}));

const assetMap = Object.fromEntries(entries.flatMap((entry) => {
  const aliases = entry.route === "/index.html" ? [["/", entry], ["/index.html", entry]] : [[entry.route, entry]];
  return aliases;
}));

const worker = `const assets = ${JSON.stringify(assetMap)};\n\nconst securityHeaders = {\n  \"x-content-type-options\": \"nosniff\",\n  \"referrer-policy\": \"no-referrer-when-downgrade\",\n};\n\nconst decodeAsset = (body) => Uint8Array.from(atob(body), (char) => char.charCodeAt(0));\n\nexport default {\n  async fetch(request, env) {\n    const url = new URL(request.url);\n    const pathname = url.pathname.endsWith(\"/\") && url.pathname !== \"/\"\n      ? url.pathname + \"index.html\"\n      : url.pathname;\n    const asset = assets[pathname] || assets[decodeURIComponent(pathname)];\n\n    if (asset) {\n      return new Response(decodeAsset(asset.body), {\n        headers: {\n          ...securityHeaders,\n          \"content-type\": asset.contentType,\n          \"cache-control\": asset.contentType.startsWith(\"text/html\")\n            ? \"no-cache\"\n            : \"public, max-age=31536000, immutable\",\n        },\n      });\n    }\n\n    if (env?.ASSETS) return env.ASSETS.fetch(request);\n\n    return new Response(\"Not found\", {\n      status: 404,\n      headers: {\n        ...securityHeaders,\n        \"content-type\": \"text/plain; charset=utf-8\",\n      },\n    });\n  },\n};\n`;

const wrangler = {
  name: "la-beccaccia-rapallo",
  compatibility_date: "2026-05-15",
  compatibility_flags: ["nodejs_compat"],
  main: "index.js",
  no_bundle: true,
  assets: {
    directory: "../client",
  },
};

await rm("dist", { recursive: true, force: true });
await mkdir("dist/server", { recursive: true });
await mkdir("dist/client", { recursive: true });
await cp("assets", "dist/client/assets", { recursive: true });
await writeFile("dist/server/index.js", worker);
await writeFile("dist/server/wrangler.json", `${JSON.stringify(wrangler)}\n`);
