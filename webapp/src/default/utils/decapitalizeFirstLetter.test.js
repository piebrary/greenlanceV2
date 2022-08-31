import { decapitalizeFirstLetter } from './decapitalizeFirstLetter.js'

test('first letter is lowercase', () => {

    expect(decapitalizeFirstLetter('TesT')).toEqual('tesT')

})

test('return undefined on typeof !== string', () => {

    expect(decapitalizeFirstLetter(1)).toEqual(undefined)

})

test('return undefined on typeof !== string', () => {

    expect(decapitalizeFirstLetter(NaN)).toEqual(undefined)

})
