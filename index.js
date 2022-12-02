import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless:false,
    args: [
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process'
    ]
  });
  const page = await browser.newPage();

  await page.goto('https://www.w3schools.com/html/html_iframe.asp', {
    waitUntil: "networkidle0",
    timeout: 30000
  });


  const frameHandle = await page.$("iframe[title='W3Schools HTML Tutorial']");
  // Find by id 
  // const frameHandle = await page.$('#iframe');

  const frame = await frameHandle.contentFrame();

  // By Url
  // const frames = await page.frames();
  // const frame = frames.find(f => f.url().includes('default'));

  const h1Contents = await frame.$$eval('h1', elements => elements.map(el => el.textContent))

  console.log(h1Contents[0])

})()