const
{
    Storage
} = require('@google-cloud/storage');

const https = require('https');

const
{
    createWriteStream
} = require("fs");

const gc = new Storage(
{
    keyFilename: 'src/forms/place/util/missingInfo/My First Project-4dc0cd679d4e.json',
    projectId: 'utility-liberty-237101'
});

const bucket = gc.bucket('gluten-images');

function makeURL(photoRef)
{
    return (
        "https://maps.googleapis.com/maps/api/place/photo" +
        "?maxwidth=100&photoreference=" +
        photoRef + "&key=" + process.env.googleMapsAPIKey
    )
}

module.exports = (photoRef, placeid) =>
{
    const fileName = placeid + ".png";
    const file = bucket.file(fileName);
    const url = makeURL(photoRef);
    https.get(url, function(res)
    {
        const contentType = res.headers["content-type"];
        const stream = file.createWriteStream(
        {
            metadata:
            {
                contentType
            },
            resumable: false
        });
        res.pipe(stream);
        stream.on('error', (err) =>
        {
            console.log('====================================');
            console.log(err.message);
            console.log('====================================');
        });
    });
}