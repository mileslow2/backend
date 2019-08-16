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
        6000,
        "not found"
    );
    span = await driver
        .findElement(By.css("div[class='" + elementSearched + "']"))
        .getAttribute("innerHTML");
    span = formatDescription(span);
    return span;
}

async function addDescriptionToDB(google_maps_id, description)
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
    await restaurant_info
        .update(valuesToSelect, selector)
        .catch((err) =>
        {
            throw (err);
        })
}

function makeURLList(placeList)
{
    let urlList = [];
    for (let i = 0, len = placeList.length; i < len; i++)
        urlList.push(placeList[i].url);
    return urlList;
}

module.exports = async placeList =>
{
    const urlList = makeURLList(placeList);
    let desc;
    const driver = await new Builder()
        .forBrowser("firefox")
        .setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
        .build();
    for (let i = 0, len = urlList.length; i < len; i++)
    {
        try
        {
            await driver.get(urlList[i]);
            desc = await getDescription(driver, "section-editorial-quote section-editorial-divider");
            await addDescriptionToDB(placeList[i].googleMapsID, desc);
        }
        catch (err)
        {
            const message = err.message.substring(0, 9);
            if (message == "not found")
            {
                try
                {
                    desc = await getDescription(driver, "section-editorial-quote");
                    await addDescriptionToDB(placeList[i].googleMapsID, desc);
                }
                catch (err)
                {
                    const message = err.message.substring(0, 9);
                    if (message == "not found")
                        await addDescriptionToDB(placeList[i].googleMapsID, null);

                }

            }
            else throw (err);
        }
    }
    await driver.quit();
}