const bcrypt = require('bcrypt')

module.exports = async (password1, password2) => {

    return await bcrypt.compare(password1, password2)

}
