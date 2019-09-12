const user = require('../../../database/models/user');


module.exports = email => {
    const query = {
        where:
            {
                email
            },
        attributes: ["user_id"]
    }
    return user
        .findOne(query)
        .catch(err => {
            throw (err);
        })
        .then(res => {
            console.log('====================================');
            console.log(res);
            console.log('====================================');
            return res.results;
        })
}