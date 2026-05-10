import { readFileSync, writeFileSync } from 'fs';

const PROJECT_PAGES = [
  'residentialcomplex1.html',
  'residentialcomplex2.html',
  'residentialcomplex3.html',
  'privatehouse1.html',
  'privatehouse2.html',
  'privatehouse3.html',
  'privatehouse4.html',
  'privatehouse5.html',
  'industrial.html',
  'interiordesign.html',
  'kindergarten.html',
  'industrialhall2.html',
];

function removeBlock(html, startMarker, endMarker, keepEnd = false) {
  const start = html.indexOf(startMarker);
  if (start === -1) return html;
  const end = html.indexOf(endMarker, start);
  if (end === -1) return html;
  const endPos = keepEnd ? end : end + endMarker.length;
  return html.slice(0, start) + html.slice(endPos);
}

for (const file of PROJECT_PAGES) {
  let html = readFileSync(file, 'utf8');

  if (!html.includes('project-contact')) {
    console.log(`SKIP (already clean): ${file}`);
    continue;
  }

  // 1. Remove CSS block: from comment through closing @media brace before </style>
  //    Strategy: find the comment, find </style> after it, find the last content to keep
  {
    const cssMarker = '/* ── Contact Section ── */';
    const cssMStart = html.indexOf(cssMarker);
    if (cssMStart !== -1) {
      // Walk back to find start of blank line before the comment
      let cutStart = cssMStart;
      // Go back past whitespace/newlines to the previous non-whitespace char
      while (cutStart > 0 && /[\s]/.test(html[cutStart - 1])) cutStart--;
      // Find </style> after the marker
      const styleClose = html.indexOf('</style>', cssMStart);
      if (styleClose !== -1) {
        html = html.slice(0, cutStart + 1) + '\n  </style>' + html.slice(styleClose + '</style>'.length);
      }
    }
  }

  // 2. Remove the HTML section: <!-- CONTACT --> ... </section>
  {
    const htmlStart = html.indexOf('<!-- ────────────────── CONTACT ────────────────── -->');
    if (htmlStart !== -1) {
      // Walk back to trim preceding blank lines
      let cutStart = htmlStart;
      while (cutStart > 0 && html[cutStart - 1] === '\n') cutStart--;
      // Also trim \r before the \n
      while (cutStart > 0 && html[cutStart - 1] === '\r') cutStart--;
      const sectEnd = html.indexOf('</section>', htmlStart);
      if (sectEnd !== -1) {
        html = html.slice(0, cutStart) + '\n\n' + html.slice(sectEnd + '</section>'.length);
      }
    }
  }

  // 3. Remove the JS script block containing contact form logic
  {
    const jsMarker = '// Contact form — Formspree AJAX submit';
    const jsMarkerIdx = html.indexOf(jsMarker);
    if (jsMarkerIdx !== -1) {
      // Find enclosing <script>
      const scriptOpen = html.lastIndexOf('<script>', jsMarkerIdx);
      const scriptClose = html.indexOf('</script>', jsMarkerIdx);
      if (scriptOpen !== -1 && scriptClose !== -1) {
        let cutStart = scriptOpen;
        // Walk back past preceding newlines
        while (cutStart > 0 && (html[cutStart - 1] === '\n' || html[cutStart - 1] === '\r')) cutStart--;
        html = html.slice(0, cutStart) + '\n' + html.slice(scriptClose + '</script>'.length);
      }
    }
  }

  writeFileSync(file, html, 'utf8');
  console.log(`CLEANED: ${file}`);
}

console.log('\nAll project pages cleaned.');
