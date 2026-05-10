import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

// Project page — should have NO contact section, just footer at bottom
await page.goto('http://localhost:3000/residentialcomplex1', { waitUntil: 'networkidle0', timeout: 30000 });
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await new Promise(r => setTimeout(r, 800));
await page.screenshot({ path: './temporary screenshots/screenshot-77-project-no-contact.png', fullPage: false });
console.log('77 done');

// /projects page — should have Let\'s Talk contact section
await page.goto('http://localhost:3000/projects', { waitUntil: 'networkidle0', timeout: 30000 });
await page.evaluate(() => {
  const el = document.querySelector('#contact');
  if (el) el.scrollIntoView({ block: 'start' });
});
await new Promise(r => setTimeout(r, 900));
await page.screenshot({ path: './temporary screenshots/screenshot-78-projects-contact.png', fullPage: false });
console.log('78 done');

await browser.close();
console.log('all done');
