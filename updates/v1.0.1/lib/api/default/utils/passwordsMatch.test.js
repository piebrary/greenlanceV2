const encryptPassword = require('./encryptPassword.js')
const passwordsMatch = require('./passwordsMatch.js')

const testPassword = 'password1!'

test('passwords match', async () => {

    const testPasswordHash = await encryptPassword('password1!')

    expect(await passwordsMatch(testPassword, testPasswordHash)).toBe(true)

})

test('passwords not match', async () => {

    const testPasswordHash = await encryptPassword('password2!')

    expect(await passwordsMatch(testPassword, testPasswordHash)).toBe(false)

})

test('passwords not match', async () => {

    const testPasswordHash = await encryptPassword('password1!')

    expect(testPassword).not.toBe(testPasswordHash)

})
