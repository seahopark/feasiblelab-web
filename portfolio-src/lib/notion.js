import fs from 'fs';
import path from 'path';
import { NotionAPI } from 'notion-client';
import { getBlockValue, getSignedFileUrl } from 'notion-utils';

const notion = new NotionAPI();

export const PORTFOLIO_PAGE_ID = '36cd9c3a5cb8800ab19add9bc0abe4e6';

export async function getPageRecordMap(pageId) {
  return notion.getPage(pageId);
}

const ASSET_DIR = path.join(process.cwd(), 'public', 'notion-assets');

function guessExtension(url) {
  try {
    const { pathname } = new URL(url);
    const ext = path.extname(pathname);
    if (ext && ext.length <= 5) return ext;
  } catch {
    // fall through to default
  }
  return '.png';
}

// Notion block `properties.source` URLs are short-lived signed links
// (expire in hours). A static export needs the actual bytes downloaded
// at build time so images don't break after the export goes live.
export async function downloadBlockImages(recordMap) {
  fs.mkdirSync(ASSET_DIR, { recursive: true });
  const imageMap = {};
  const blocks = recordMap.block || {};

  await Promise.all(
    Object.entries(blocks).map(async ([blockId, wrapper]) => {
      const block = getBlockValue(wrapper);
      if (!block || block.type !== 'image') return;
      const source = block.properties?.source?.[0]?.[0];
      if (!source) return;

      // `source` is often an internal `attachment:<fileId>:<name>` reference
      // that needs resolving against recordMap.signed_urls to get an
      // actually-fetchable (but still short-lived) download URL.
      const resolvedUrl = getSignedFileUrl(source, block, recordMap.signed_urls) || source;

      const ext = guessExtension(resolvedUrl);
      const filename = `${blockId}${ext}`;
      const filePath = path.join(ASSET_DIR, filename);

      try {
        const res = await fetch(resolvedUrl);
        if (!res.ok) {
          console.warn(`[notion-assets] ${res.status} fetching block ${blockId}`);
          return;
        }
        const buffer = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(filePath, buffer);
        // Must match next.config.js `basePath` since this path bypasses
        // Next's asset pipeline (it's a plain string, not an import).
        imageMap[blockId] = `/portfolio/notion-assets/${filename}`;
      } catch (err) {
        console.warn(`[notion-assets] failed for block ${blockId}:`, err.message);
      }
    })
  );

  return imageMap;
}
