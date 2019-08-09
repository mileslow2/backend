const Mailgun = require("mailgun-js");
const readFile = require('./readFile');
const newToken = require('./newToken');
const
{
    compile
} = require('handlebars')

async function makeLink(to)
{
    return (
        "http://Miless-MacBook-Pro.local:8081/emailVerify" +
        "?email=" + to + "&token=" + await newToken("1d")
    );
}

async function makeHTML(to)
{
    const html = readFile();
    let template = compile(html);
    const link = await makeLink(to);
    const replacements = {
        link
    }
    return template(replacements);
}

const mg = new Mailgun(
{
    apiKey: process.env.mailgunAPIKey,
    domain: process.env.mailgunDomain
});

module.exports = async to =>
{
    const data = {
        from: 'Excited User <me@samples.mailgun.org>',
        to,
        subject: 'Hello',
        html: await makeHTML(to)
    };

    mg.messages()
        .send(data, function(error, body)
        {
            if (error) throw (error);
        });
}