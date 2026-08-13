import { Browser, chromium, Page, request } from "@playwright/test";
import { LoginPage } from "../src/pages/auth/LoginPage";
import { Context } from "node:vm";
import { RandomUtils } from "../src/utils/RandomUtils";


// (async () => {

//     let browser: Browser = await chromium.launch({ channel: 'chrome', headless: false, args: ['--start-maximized'] })
//     let context: Context = await browser.newContext({ viewport: null })
//     let page: Page = await context.newPage();
//     const size = await page.evaluate(() => ({
//         width: window.innerWidth,
//         height: window.innerHeight,
//     }));
//     console.log('Actual window size:', size);
//     // let loginpage = new LoginPage(page);
//     // await loginpage.goToLoginPage("https://www.hotstar.com/in");
//     // const title = await loginpage.getLoginPageTitle();
//     await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login')
//     const title2 = await page.title();
//     const url = page.url();
//     console.log(title2);
//     console.log(url);
//     await page.close();
//     await context.close();
//     await browser.close();
// })();

(()=>{
const date = new Date();
date.setDate(date.getDate()+5)
//console.log(date);

let date1 = RandomUtils.exactFutureDate(5, 'days')
console.log(date1);
})();

