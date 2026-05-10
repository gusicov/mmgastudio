import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

// Homepage contact — verify phone numbers
await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.evaluate(() => { try { localStorage.setItem('mmga-intro-seen', '1'); } catch(e) {} });
await page.reload({ waitUntil: 'networkidle0', timeout: 30000 });
await page.evaluate(() => {
  const el = document.querySelector('#contact');
  if (el) el.scrollIntoView({ block: 'start' });
});
await new Promise(r => setTimeout(r, 800));
await page.screenshot({ path: './temporary screenshots/screenshot-79-homepage-phones.png', fullPage: false });
console.log('79 done');

// /projects contact — verify phone numbers
await page.goto('http://localhost:3000/projects', { waitUntil: 'networkidle0', timeout: 30000 });
await page.evaluate(() => {
  const el = document.querySelector('#contact');
  if (el) el.scrollIntoView({ block: 'start' });
});
await new Promise(r => setTimeout(r, 800));
await page.screenshot({ path: './temporary screenshots/screenshot-80-projects-phones.png', fullPage: false });
console.log('80 done');

await browser.close();
console.log('all done');
