import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

// Project page contact section
await page.goto('http://localhost:3000/residentialcomplex1', { waitUntil: 'networkidle0', timeout: 30000 });
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await new Promise(r => setTimeout(r, 1000));
await page.screenshot({ path: './temporary screenshots/screenshot-73-project-contact.png', fullPage: false });
console.log('73 done');

// Homepage contact section (skip loader)
await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.evaluate(() => { try { localStorage.setItem('mmga-intro-seen', '1'); } catch(e) {} });
await page.reload({ waitUntil: 'networkidle0', timeout: 30000 });
await page.evaluate(() => {
  const el = document.querySelector('#contact');
  if (el) el.scrollIntoView({ block: 'start' });
});
await new Promise(r => setTimeout(r, 800));
await page.screenshot({ path: './temporary screenshots/screenshot-74-homepage-contact.png', fullPage: false });
console.log('74 done');

// Hero video new clip
await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.evaluate(() => { try { localStorage.setItem('mmga-intro-seen', '1'); } catch(e) {} });
await page.reload({ waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 2500));
await page.screenshot({ path: './temporary screenshots/screenshot-75-hero-new-video.png', fullPage: false });
console.log('75 done');

// Homepage contact - scrolled to very bottom to show both phones
await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.evaluate(() => { try { localStorage.setItem('mmga-intro-seen', '1'); } catch(e) {} });
await page.reload({ waitUntil: 'networkidle0', timeout: 30000 });
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await new Promise(r => setTimeout(r, 900));
await page.screenshot({ path: './temporary screenshots/screenshot-76-homepage-contact-full.png', fullPage: false });
console.log('76 done');

await browser.close();
console.log('all done');
