const tokens = require('../../database/models/tokens');

function checkIfValidation(err) {
    const errorStart = err.message.substr(0, 6);
    return errorStart === "Valida";
}

function updateToken(token) {
    const selector = {
        where:
            {
                user_id: token.user_id
            }
    }
    const valuesToUpdate = {
        iat: token.iat
    }
    tokens
        .update(valuesToUpdate, selector)
        .catch(err => {
            throw err;
        })
}

module.exports = token => {
    const dbToken = {
        user_id: token.user_id,
        iat: token.iat
    }
    tokens
        .create(dbToken)
        .catch(err => {
            const isValErr = checkIfValidation(err);
            if (isValErr)
                updateToken(dbToken);
            else throw err;
        })
}