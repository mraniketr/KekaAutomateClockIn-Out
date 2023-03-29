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
    try {
      while (
        await page.waitForSelector(
          "home-attendance-clockin-widget  .btn-danger"
        )
      ) {
        await new Promise((r) => setTimeout(r, 1000));
        await page.click("home-attendance-clockin-widget  .btn-danger");
      }
    } catch (E) {
      console.log("Clock out done");
    }

    console.log("SUCCESSFULLY LOGGED OUT");

    await browser.close();
  })
  .catch((err) => console.log(err));
