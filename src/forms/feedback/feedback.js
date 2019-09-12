const Mailgun = require("mailgun-js");
const usedDefense = require("../../security");
const mg = new Mailgun(
    {
        apiKey: process.env.mailgunAPIKey,
        domain: process.env.mailgunDomain
    });
const to = "mileslow2@gmail.com";

function sendFeedbackEmail(body) {
    const data = {
        from: 'feedback bot <me@samples.mailgun.org>',
        to,
        subject: body.subject,
        html: body.body + "\n\n" + body.email
    };
    mg.messages().send(data, err => {
        if (err) throw err;
    });
}

module.exports = async app => {
    app.post('/feedback', async (req, res) => {
        const keys = ["subject", "email", "body"];

        if (await usedDefense(req, res, keys)) return;
        sendFeedbackEmail(req.body);
        res.status(200).send("feedback email sent");
    })
}