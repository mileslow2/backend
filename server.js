const { Builder, By, Key, until } = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");
const url =
  "https://www.google.com/maps/place/Gjusta/@33.9861504,-118.468608,15z/data=!4m5!3m4!1s0x80c2bac5f945be21:0x98feb3acb7938077!8m2!3d33.9952743!4d-118.4745347";
var elementSearched = "section-editorial-quote section-editorial-divider";
const screen = {
  width: 640,
  height: 480
};
function removeHTML(span) {
  var endIndex;
  span = span.replace("</span>", "");
  for (var i = 0; i < span.length; i++)
    if (span[i] == "<") {
      endIndex = span.search(">");
      span = span.substring(endIndex + 1, span.length);
    }
  return span;
}
async function getDescription(driver) {
  await driver.wait(
    until.elementLocated(By.css("div[class='" + elementSearched + "']")),
    5000,
    "not found"
  );
  span = await driver
    .findElement(By.css("div[class='" + elementSearched + "']"))
    .getAttribute("innerHTML");
  span = removeHTML(span);
  return span;
}
(async function example() {
  let driver = await new Builder()
    .forBrowser("firefox")
    .setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
    .build();
  try {
    await driver.get(url);
    console.log(await getDescription(driver));
  } catch (err) {
    const message = err.message.substring(0, 9);
    if (message == "not found") {
      elementSearched = "section-editorial-quote";
      console.log(await getDescription(driver));
    }
  } finally {
    await driver.quit();
  }
})();
