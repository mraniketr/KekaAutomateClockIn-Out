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
    await page.setGeolocation({
      latitude: Number(process.env.LATITUDE),
      longitude: Number(process.env.LONGITUDE),
    });

    await page.goto(process.env.URI);
    await page.waitForSelector("#email");
    await page.type("#email", process.env.EMAIL);
    await page.click(".login-from-btn");
    await page.waitForSelector(".btn-keka-login");
    await page.click(".btn-keka-login");
    await page.waitForSelector("#password");
    await new Promise((r) => setTimeout(r, 1000));
    await page.type("#password", process.env.PASSWORD);
    await page.click(".login-from-btn");
    console.log("Logged In");
    await page.waitForSelector(
      "home-attendance-clockin-widget > div > div.card-body.clear-padding.d-flex.flex-column.justify-content-between > div > div.h-100.d-flex.align-items-center > div > div.d-flex.align-items-center > div:nth-child(1) > div > button"
    );
    await page.click(
      "home-attendance-clockin-widget > div > div.card-body.clear-padding.d-flex.flex-column.justify-content-between > div > div.h-100.d-flex.align-items-center > div > div.d-flex.align-items-center > div:nth-child(1) > div > button"
    );

    await page.waitForSelector(
      "body > xhr-app-root > div > xhr-home > div > home-dashboard > div > div > div > div > div:nth-child(2) > div > div:nth-child(5) > div:nth-child(6) > home-attendance-clockin-widget > div > div.card-body.clear-padding.d-flex.flex-column.justify-content-between > div > div.h-100.d-flex.align-items-center > div > div.d-flex.align-items-center > div:nth-child(1) > div > button"
    );

    await page.click(
      "body > xhr-app-root > div > xhr-home > div > home-dashboard > div > div > div > div > div:nth-child(2) > div > div:nth-child(5) > div:nth-child(6) > home-attendance-clockin-widget > div > div.card-body.clear-padding.d-flex.flex-column.justify-content-between > div > div.h-100.d-flex.align-items-center > div > div.d-flex.align-items-center > div:nth-child(1) > div > button"
    );
    await new Promise((r) => setTimeout(r, 1000));
    console.log("SUCCESSFULLY LOGGED OUT");

    await browser.close();
  });
