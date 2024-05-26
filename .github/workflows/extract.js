const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://sportsonline.gl/prog.txt');

  const htmlContent = await page.content();

  fs.writeFileSync('API/conteudo.html', htmlContent);

  console.log('HTML extraído e salvo em conteudo.html');

  await browser.close();
})();
