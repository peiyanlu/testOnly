import { createInterface } from 'node:readline'
import puppeteer from 'puppeteer'


const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.on('line', async (str) => {
  console.log('str >>> :', str)
})


const browser = await puppeteer.launch({
  headless: false,
  defaultViewport: {
    width: 0,
    height: 0,
  },
})

const page = await browser.newPage()
await page.goto('http://localhost:5173/vite-press/')


await page.screenshot({ path: 'example.png' });


await page.type('h1', '被劫持了')

const title = await page.$eval('h1', el => el.textContent);
console.log('页面标题：', title);

// await browser.close();

// await page.waitForSelector('#username');
//
//
// const $username = await page.$('#username');
// await $username?.type('1111111', {
//   delay: 100
// });
//
// const $password = await page.$('#password');
// await $password?.type('testtest', {
//   delay: 100
// });
//
// const $button = await page.$('button[type="submit"]');
// await $button?.click();
