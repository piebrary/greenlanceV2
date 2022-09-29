import { capitalizeFirstLetter } from './capitalizeFirstLetter.js'

test('first letter is uppercase', () => {

    expect(capitalizeFirstLetter('test')).toEqual('Test')

})

test('return undefined on typeof !== string', () => {

    expect(capitalizeFirstLetter(1)).toEqual(undefined)

})

test('return undefined on typeof !== string', () => {

    expect(capitalizeFirstLetter(NaN)).toEqual(undefined)

})
