#!/usr/bin/env node
import fs from 'node:fs';
import process from 'node:process';
import { markdownToBlocks } from '@tryfabric/martian';

const MAX_BLOCKS_PER_REQUEST = 100;
const MAX_RICH_TEXT = 2000;
const notionKey = process.env.NOTION_API_KEY;
const databaseId = process.env.NOTION_DATABASE_ID;
const apiVersion = process.env.NOTION_API_VERSION || '2025-09-03';

if (!notionKey || !databaseId) {
  console.error('Missing NOTION_API_KEY or NOTION_DATABASE_ID');
  process.exit(1);
}

function getArg(name, fallback = '') {
  const index = process.argv.indexOf(name);
  if (index === -1 || index + 1 >= process.argv.length) return fallback;
  return process.argv[index + 1];
}

const title = getArg('--title').trim();
const markdownFile = getArg('--markdown-file').trim();
const markdownInline = getArg('--markdown').trim();
const authors = getArg('--authors').trim();
const dateStr = getArg('--date').trim();
const arxiv = getArg('--arxiv').trim();
const pdfLink = getArg('--pdf').trim();
const githubLink = getArg('--github').trim();
const categories = getArg('--categories').trim();
const status = (getArg('--status', 'Done') || 'Done').trim();
const summary = getArg('--summary').trim();
const readAt = getArg('--read-at').trim();
const titleProperty = getArg('--title-property', 'Title').trim() || 'Title';
const iconUrl = getArg('--icon-url', 'https://www.notion.so/icons/book_gray.svg').trim();

if (!title) {
  console.error('Missing required argument: --title');
  process.exit(1);
}
if (!markdownFile && !markdownInline) {
  console.error('Provide --markdown-file or --markdown');
  process.exit(1);
}

const markdown = markdownFile ? fs.readFileSync(markdownFile, 'utf8') : markdownInline;
const truncate = (s, max = MAX_RICH_TEXT) => s.length > max ? s.slice(0, max) : s;

function buildProperties() {
  const properties = {
    [titleProperty]: { title: [{ text: { content: truncate(title) } }] }
  };

  if (authors) properties.Authors = { rich_text: [{ text: { content: truncate(authors) } }] };
  if (summary) properties.Summary = { rich_text: [{ text: { content: truncate(summary) } }] };
  if (status) properties.Status = { select: { name: status } };
  if (categories) {
    properties.Category = {
      multi_select: categories.split(',').map(s => s.trim()).filter(Boolean).map(name => ({ name }))
    };
  }
  if (dateStr) properties.Date = { date: { start: dateStr } };
  if (arxiv) properties['ArXiv Link'] = { url: arxiv };
  if (pdfLink) properties['PDF Link'] = { url: pdfLink };
  if (githubLink) properties['GitHub Link'] = { url: githubLink };
  if (readAt) properties['Read At'] = { date: { start: readAt } };

  return properties;
}

async function notionRequest(path, method, body) {
  const res = await fetch(`https://api.notion.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${notionKey}`,
      'Notion-Version': apiVersion,
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error(JSON.stringify(data, null, 2));
    throw new Error(data.message || `Notion API error: ${res.status}`);
  }
  return data;
}

async function main() {
  const blocks = markdownToBlocks(markdown);
  const payload = {
    parent: { database_id: databaseId },
    properties: buildProperties(),
    children: Array.isArray(blocks) ? blocks.slice(0, MAX_BLOCKS_PER_REQUEST) : []
  };

  if (iconUrl) {
    payload.icon = { type: 'external', external: { url: iconUrl } };
  }

  const created = await notionRequest('/v1/pages', 'POST', payload);
  const pageId = created.id;

  for (let i = MAX_BLOCKS_PER_REQUEST; i < blocks.length; i += MAX_BLOCKS_PER_REQUEST) {
    await notionRequest(`/v1/blocks/${pageId}/children`, 'PATCH', {
      children: blocks.slice(i, i + MAX_BLOCKS_PER_REQUEST)
    });
  }

  console.log(JSON.stringify({
    ok: true,
    pageId,
    url: created.url,
    blocks: blocks.length,
    title
  }, null, 2));
}

main().catch(err => {
  console.error(err.stack || String(err));
  process.exit(1);
});
