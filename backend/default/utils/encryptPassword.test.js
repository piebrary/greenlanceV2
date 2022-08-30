const encryptPassword = require('./encryptPassword.js')

const testPassword = 'password1!'

test('encryptPassword encrypts password', async () => {

    expect(await encryptPassword(testPassword)).not.toBe(testPassword)

})

test('encryptPassword returns string', async () => {

    expect(typeof await encryptPassword(testPassword)).toBe('string')

})
