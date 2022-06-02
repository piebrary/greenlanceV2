const bcrypt = require('bcrypt')

module.exports = async newPassword => {

    // authentication will take approximately 0.54 seconds
    // https://pthree.org/wp-content/uploads/2016/06/bcrypt.png
    const hashCost = 10
    return await bcrypt.hash(newPassword, hashCost)

}
