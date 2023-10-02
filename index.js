import puppeteer from "puppeteer";
//  Ange Sökord
const SearchTermCli = process.argv.length >= 3 ? process.argv[2] : "";
const searchTermENV = process.env.SEARCHTXT ?? "Green day";

// Öppna Webbläsare fullscreen
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  const page = await browser.newPage();

  // Ange youtube i sökfält
  await page.goto("https://youtube.com/", { waitUntil: "domcontentloaded" });

  // Klicka förbi GOOGLE POLICYS
  await page.waitForSelector(
    "#content > div.body.style-scope.ytd-consent-bump-v2-lightbox > div.eom-buttons.style-scope.ytd-consent-bump-v2-lightbox > div:nth-child(1) > ytd-button-renderer:nth-child(2) > yt-button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill"
  );
  const buttonClick = await page.$(
    "#content > div.body.style-scope.ytd-consent-bump-v2-lightbox > div.eom-buttons.style-scope.ytd-consent-bump-v2-lightbox > div:nth-child(1) > ytd-button-renderer:nth-child(2) > yt-button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill"
  );
  await buttonClick.click();

  // YOUTUBE SEARCHBAR

  await page.waitForSelector("#search.gsfi.ytd-searchbox");
  const ytclick = await page.$("#search.gsfi.ytd-searchbox");
  await ytclick.click();

  await page.type("#search.gsfi.ytd-searchbox", SearchTermCli, { delay: 100 });

  await page.click(
    "#search-icon-legacy > yt-icon > yt-icon-shape > icon-shape"
  );

  await page.waitForNavigation({ waitUntil: "networkidle0" });

  //Close the browser
  // await browser.close();
})();
