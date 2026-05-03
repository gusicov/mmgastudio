import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
// Pre-set intro-seen so the loader is skipped
await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.evaluate(() => { try { localStorage.setItem('mmga-intro-seen', '1'); } catch(e) {} });
await page.reload({ waitUntil: 'networkidle0', timeout: 30000 });
// Wait for video to render a frame
await new Promise(r => setTimeout(r, 2500));
await page.screenshot({ path: './temporary screenshots/screenshot-70-hero-video.png', fullPage: false });
await browser.close();
console.log('done');
