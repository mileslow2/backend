const
{
    Builder,
    By,
    until
} = require("selenium-webdriver");
const
{
    formatDescription
} = require('./formatItems');
const firefox = require("selenium-webdriver/firefox");
const restaurant_info = require('../../../../database/models/restaurant_info');
const screen = {
    width: 640,
    height: 480
};

async function getDescription(driver, elementSearched)
{
    await driver.wait(
        until.elementLocated(
            By.css(
                "div[class='" + elementSearched + "']"
            )
        ),
        5000,
        "not found"
    );
    span = await driver
        .findElement(By.css("div[class='" + elementSearched + "']"))
        .getAttribute("innerHTML");
    span = formatDescription(span);
    return span;
}

function addDescriptionToDB(google_maps_id, description)
{
    const selector = {
        where:
        {
            google_maps_id
        }
    };
    const valuesToSelect = {
        description
    }
    restaurant_info
        .update(valuesToSelect, selector)
        .catch((err) =>
        {
            throw (err);
        })
}

module.exports = async place =>
{
    var desc;
    let elementSearched = "section-editorial-quote section-editorial-divider";
    let driver = await new Builder()
        .forBrowser("firefox")
        .setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
        .build();
    try
    {
        await driver.get(place.url);
        desc = await getDescription(driver, elementSearched);
    }
    catch (err)
    {
        const message = err.message.substring(0, 9);
        if (message == "not found")
        {
            elementSearched = "section-editorial-quote";
            desc = await getDescription(driver, elementSearched)
        }
    }
    finally
    {
        await driver.quit();
    }
    await addDescriptionToDB(place.place_id, desc);
}