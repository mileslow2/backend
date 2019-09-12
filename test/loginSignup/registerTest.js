const expect = require("chai").expect;
const easyFetch = require("../../src/helpers/easyFetch");
const registerURL = "http://Miless-MacBook-Pro.local:8081/register";
const comparePasswords = require("../../src/helpers/comparePasswords");
const user = require("../../src/database/models/user");

function deleteUserFrom(email) {
    user
        .destroy(
            {
                where:
                    {
                        email
                    }
            })
        .catch((err) => {
            throw err;
        });
}

async function getUserFrom(email) {
    const userCriteria = {
        where:
            {
                email
            },
        attributes: ["first_name", "email", "password", "last_name"]
    };
    return await user
        .findOne(userCriteria)
        .catch((err) => {
            throw err;
        })
        .then(user => {
            return user.toJSON()
        });
}

describe("register", function () {
    it("should register a new user", async function () {
        const newUser = {
            password: "123",
            email: "mileslow2@gmail.com",
            first_name: "Miles",
            last_name: "Low"
        };
        await deleteUserFrom(newUser.email);
        const response = await easyFetch(registerURL, newUser);
        expect(response).to.be.equal(true);
        //email works
    });
    it('user should exist in db', async function () {
        const newUser = {
            password: "123",
            email: "mileslow2@gmail.com",
            first_name: "Miles",
            last_name: "Low"
        };
        const createdUser = await getUserFrom(newUser.email);
        const hashedPassword = createdUser.password;
        const actualPassword = newUser.password;
        const passwordsTheSame = await comparePasswords(
            actualPassword,
            hashedPassword
        );
        expect(passwordsTheSame).to.be.equal(true);
        expect(newUser.email).to.be.equal(createdUser.email);
        expect(newUser.fullName).to.be.equal(createdUser.full_name);
    })
    it("should not register because of weird name", async function () {
        const newUser = {
            password: "123",
            email: "mileslow2@gmail.com",
            first_name: "Miles",
            last_name: "Low"
        };
        const response = await easyFetch(registerURL, newUser);
        expect(response).to.be.equal(false);
    });
    it("should not register because email already exists", async function () {
        const newUser = {
            password: "123",
            email: "mileslow2@gmail.com",
            first_name: "Miles",
            last_name: "Low"
        };
        const response = await easyFetch(registerURL, newUser);
        expect(response).to.be.equal(false);
    });
    it("should not register because of bad user object", async function () {
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