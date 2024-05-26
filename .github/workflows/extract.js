const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://sportsonline.gl/prog.txt');

  const htmlContent = await page.content();

  fs.writeFileSync('API/streaming.txt', htmlContent);

  console.log('HTML extraído e salvo em streaming.txt');

  await browser.close();
})();
