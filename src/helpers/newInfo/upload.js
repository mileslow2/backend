const
{
    Storage
} = require('@google-cloud/storage');

const http = require('http');

const
{
    createWriteStream
} = require("fs");

const gc = new Storage(
{
    keyFilename: 'src/helpers/newInfo/My First Project-4dc0cd679d4e.json',
    projectId: 'utility-liberty-237101'
});

const bucket = gc.bucket('gluten-images');

const file = bucket.file("2.jpg");

const stream = file.createWriteStream(
{
    metadata:
    {
        contentType: "image/jpg"
    },
    resumable: false
});

const request = http.get("http://vignette.wikia.nocookie.net/strangerthings8338/images/3/3c/Steve_Harrington_portrait.jpg", function(response)
{
    response.pipe(stream);
});

stream.on('error', (err) =>
{
    console.log(err.message);
});