import puppeteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(30000); // default puppeteer timeout

describe("Credit Card Validator form", () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = "http://localhost:9000";

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on("error", reject);
      server.on("message", (message) => {
        if (message === "ok") {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      // headless: false, // show gui
      slowMo: 100,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test("Popover appears strictly above the button after resizing window", async () => {
    await page.goto(baseUrl);

    const form = await page.$("form");
    const button = await form.$("button");

    await button.click();

    await page.setViewport({ width: 1000, height: 1000 });

    const position_bool = await page.evaluate(() => {
      const buttonElement = document.querySelector("button");
      const popoverElement = document.querySelector(".popover");
      const { left } = document.querySelector("button").getBoundingClientRect();
      return (
        document.querySelector(".popover").style.left ===
        `${
          left + buttonElement.offsetWidth / 2 - popoverElement.offsetWidth / 2
        }px`
      );
    });

    await expect(position_bool).toBe(true);
    // await page.screenshot({ path: "./e2e/screen.png" });
  });
});
