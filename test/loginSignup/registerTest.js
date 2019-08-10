const expect = require("chai").expect;
const easyFetch = require("../../src/helpers/easyFetch");
const registerURL = "http://Miless-MacBook-Pro.local:8081/register";
const comparePasswords = require("../../src/helpers/comparePasswords");
const user = require("../../src/database/models/user");

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
        .catch((err) =>
        {
            console.log('====================================');
            console.log(err.message);
            console.log('====================================');
        });
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
    console.log('====================================');
    console.log(userCriteria);
    console.log('====================================');
    var userData;
    await user
        .findOne(userCriteria)
        .catch((err) =>
        {
            console.log('====================================');
            console.log(err);
            console.log('====================================');
        })
        .then(user =>
        {
            console.log('====================================');
            console.log(user);
            console.log('====================================');
            userData = user.toJSON()
        });
    return userData;
}

describe("register", function()
{
    // the commented section only works once I purchase a domain

    // it("should register a new user", async function()
    // {
    //     const newUser = {
    //         password: "123",
    //         email: "mileslow2@gmail.com",
    //         first_name: "Miles",
    //         last_name: "Low"
    //     };
    //     const response = await easyFetch(registerURL, newUser);
    //     expect(response).to.be.equal(true);
    //     const createdUser = await getUserFrom(newUser.email); //the problem
    //     const hashedPassword = createdUser.password;
    //     const actualPassword = newUser.password;
    //     const passwordsTheSame = await comparePasswords(
    //         actualPassword,
    //         hashedPassword
    //     );
    //     expect(passwordsTheSame).to.be.equal(true);
    //     expect(newUser.email).to.be.equal(createdUser.email);
    //     expect(newUser.fullName).to.be.equal(createdUser.full_name);
    //     await deleteUserFrom(newUser.email);
    // });

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
            foo: "miles",
            last_name: "low"
        };
        const response = await easyFetch(registerURL, newUser);
        expect(response).to.be.equal(false);
    });
});