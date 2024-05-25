const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://sportsonline.gl/prog.txt');

  // Extrair todo o HTML da página
  const htmlContent = await page.evaluate(() => document.documentElement.outerHTML);

  // Escrever o HTML extraído em um arquivo
  fs.writeFileSync('conteudo.txt', htmlContent);

  console.log('HTML extraído e salvo em conteudo.html');

  await browser.close();
})();
