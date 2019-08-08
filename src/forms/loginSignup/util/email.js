const hbs = require('handlebars')
const nodemailer = require('nodemailer');
const newToken = require('./newToken');
const readFile = require('./readFile');
const to = process.env.emailUser;

async function makeLink()
{
    let url = "http://Miless-MacBook-Pro.local:8081/emailVerify";
    url += "?email=" + to + "&token=" + await newToken("1d");
    return url;
}

async function makeHTML()
{
    const html = readFile();
    let template = hbs.compile(html);
    const link = await makeLink();
    const replacements = {
        link
    }
    return template(replacements);
}

module.exports = async () =>
{

    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport(
    {
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth:
        {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass // generated ethereal password
        }
    });

    const mailOptions = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to, // list of receivers
        subject: "Your verification code", // Subject line,
        html: await makeHTML()
    }
    const info = await transporter.sendMail(mailOptions);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}