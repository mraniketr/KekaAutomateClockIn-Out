const { Console } = require("console");
const puppeteer = require("puppeteer");
require("dotenv").config();
puppeteer
  .launch({ headless: process.env.HEADLESS == "true" ? true : false })
  .then(async (browser) => {
    const context = browser.defaultBrowserContext();
    await context.overridePermissions(process.env.SUBDOMAINURI, [
      "geolocation",
    ]);
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
    );
    await page.setGeolocation({
      latitude: Number(process.env.LATITUDE),
      longitude: Number(process.env.LONGITUDE),
    });
    console.log("Start ");
    await page.goto(process.env.URI);
    await page.waitForSelector("#email");
    console.log("2");
    await page.type("#email", process.env.EMAIL);
    await page.evaluate(() => $("form")[0].submit());
    await page.waitForSelector(".login-option");
    console.log("3");
    await page.evaluate(() => $(".login-option>button")[1].click());
    await page.waitForSelector("#password");
    await new Promise((r) => setTimeout(r, 1000));
    await page.type("#password", process.env.PASSWORD);
    console.log("4");
    await page.evaluate(() => $("form")[0].submit());
    console.log("logged In ");
    await page.waitForSelector(
      "body > xhr-app-root > div > xhr-home > div > home-dashboard > div > div > div > div > div:nth-child(2) > div > div:nth-child(5) > div:nth-child(6) > home-attendance-clockin-widget > div > div.card-body.clear-padding.d-flex.flex-column.justify-content-between > div > div.h-100.d-flex.align-items-center > div > div.d-flex.align-items-center > div:nth-child(1) > button"
    );
    await page.click(
      "body > xhr-app-root > div > xhr-home > div > home-dashboard > div > div > div > div > div:nth-child(2) > div > div:nth-child(5) > div:nth-child(6) > home-attendance-clockin-widget > div > div.card-body.clear-padding.d-flex.flex-column.justify-content-between > div > div.h-100.d-flex.align-items-center > div > div.d-flex.align-items-center > div:nth-child(1) > button"
    );

    await page.waitForSelector(
      "body > xhr-app-root > div > xhr-home > div > home-dashboard > div > div > div > div > div:nth-child(2) > div > div:nth-child(5) > div:nth-child(6) > home-attendance-clockin-widget > div > div.card-body.clear-padding.d-flex.flex-column.justify-content-between > div > div.h-100.d-flex.align-items-center > div > div.d-flex.align-items-center > div:nth-child(1) > button"
    );

    await page.click(
      "body > xhr-app-root > div > xhr-home > div > home-dashboard > div > div > div > div > div:nth-child(2) > div > div:nth-child(5) > div:nth-child(6) > home-attendance-clockin-widget > div > div.card-body.clear-padding.d-flex.flex-column.justify-content-between > div > div.h-100.d-flex.align-items-center > div > div.d-flex.align-items-center > div:nth-child(1) > button"
    );
    await page.waitForSelector(
      "home-attendance-clockin-widget > div > div.card-body.clear-padding.d-flex.flex-column.justify-content-between > div > div.h-100.d-flex.align-items-center > div > div.d-flex.align-items-center > div:nth-child(1) > div > button"
    );
    console.log("SUCCESSFULLY Clocked IN");
    await browser.close();
  })
  .catch((err) => console.log(err));
