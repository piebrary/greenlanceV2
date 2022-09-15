const randomId = require('./randomId.js')

test('id is random', async () => {

    expect(randomId() === randomId()).toBe(false)

})

test('typeof randomId = string', async () => {

    expect(typeof randomId()).toBe('string')

})

test('id length = 32', async () => {

    expect(randomId().length).toBe(32)

})

test('id length = 16', async () => {

    expect(randomId(16).length).toBe(16)

})
