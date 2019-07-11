const expect = require("chai").expect;
const easyFetch = require("../helpers/easyFetch");
const registerURL = "http://Miless-MacBook-Pro.local:8081/register";
const comparePasswords = require("../helpers/comparePasswords");
const user = require("../database/models/user");

const errorHandler = err =>
{
    if (err) throw err;
};

async function deleteUserFrom(email)
{
    await user
        .destroy(
        {
            where:
            {
                email
            }
        })
        .catch(errorHandler);
}

async function getUserFrom(email)
{
    const userCriteria = {
        where:
        {
            email
        },
        attributes: ["first_name", "email", "password", "last_name"]
    };
    var userData;
    await user
        .findOne(userCriteria)
        .catch(errorHandler)
        .then(user => (userData = user.toJSON()));
    return userData;
}

describe("register", function()
{
    it("should register a new user", async function()
    {
        const newUser = {
            password: "123",
            email: "mileslow2@greemail.com",
            first_name: "Miles",
            last_name: "Low"
        };
        const response = await easyFetch(registerURL, newUser);
        const createdUser = await getUserFrom(newUser.email); //the problem
        const hashedPassword = createdUser.password;
        const actualPassword = newUser.password;

        const passwordsTheSame = await comparePasswords(
            actualPassword,
            hashedPassword
        );
        expect(response).to.be.equal(true);
        expect(passwordsTheSame).to.be.equal(true);
        expect(newUser.email).to.be.equal(createdUser.email);
        expect(newUser.fullName).to.be.equal(createdUser.full_name);
        await deleteUserFrom(newUser.email);
    });

    it("should not register because of weird name", async function()
    {
        const newUser = {
            password: "123",
            email: "mileslow2@greemail.com",
            first_name: "Miles",
            foo: "Low"
        };
        const response = await easyFetch(registerURL, newUser);
        expect(response).to.be.equal(false);
        // await deleteUserFrom(newUser.email);
    });
    it("should not register because email already exists", async function()
    {
        const newUser = {
            password: "123",
            email: "mileslow2@gmail.com",
            first_name: "Miles",
            last_name: "Low"
        };
        const response = await easyFetch(registerURL, newUser);
        expect(response).to.be.equal(false);
    });
    it("should not register because of bad user object", async function()
    {
        const newUser = {
            password: "123",
            email: "mileslow2@gmail.com",
            foo: "Miles",
            last_name: "Low"
        };
        const response = await easyFetch(registerURL, newUser);
        expect(response).to.be.equal(false);
    });
    it("should not register because of bad request", async function()
    {
        const newUser = "123";
        const response = await easyFetch(registerURL, newUser);
        expect(response).to.be.equal(false);
    });
});