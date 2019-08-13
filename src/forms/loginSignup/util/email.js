const Mailgun = require("mailgun-js");
const readFile = require('./readFile');
const newToken = require('./newToken');
const
{
    compile
} = require('handlebars')

async function makeLink(to, path)
{
    let url = "http://Miless-MacBook-Pro.local:8081/"
    if (path == "register")
        url += "emailVerify?email=" + to + "&token=" + await newToken("1d", path);
    else
        url += "passwordResetVerify?email=" + to + "&token=" + await newToken("1d", path);
    return url;
}

async function makeHTML(to, path)
{
    const html = readFile();
    let template = compile(html);
    const link = await makeLink(to, path);
    let buttonText = "Verify your account";
    let body = "Thank you for signing up! Please click the button below to verify your account and get started using Gluten Maps!";
    if (path != "register")
    {
        buttonText = "Reset your password";
        body = "Thank you for using Gluten Maps! Please click the button below to reset your password and continue using Gluten Maps!";
    }
    const replacements = {
        link,
        buttonText,
        body
    }
    return template(replacements);
}

const mg = new Mailgun(
{
    apiKey: process.env.mailgunAPIKey,
    domain: process.env.mailgunDomain
});

module.exports = async (to, path) =>
{
    const data = {
        from: 'Excited User <me@samples.mailgun.org>',
        to,
        subject: 'Hello',
        html: await makeHTML(to, path)
    };

    mg.messages()
        .send(data, function(error, body)
        {
            if (error) throw (error);
        });
}