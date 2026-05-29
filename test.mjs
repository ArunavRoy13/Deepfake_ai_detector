import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.toString());
  });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('CONSOLE ERROR:', msg.text());
    }
  });

  await page.goto('http://localhost:3000/detect', { waitUntil: 'networkidle2' });
  
  // Wait for 2 seconds
  await new Promise(r => setTimeout(r, 2000));
  
  console.log("TEST FINISHED");
  await browser.close();
})();
