const fs = require('fs')


module.exports = () => {
    const path = "./src/forms/loginSignup/util/views/index.hbs";
    return fs.readFileSync(path,
        {
            encoding: 'utf-8'
        });
}