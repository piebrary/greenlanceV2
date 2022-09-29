import { containsNumber } from './containsNumber.js'

test('contains number', () => {

    expect(containsNumber('314')).toEqual(true)

})

test('contains number', () => {

    expect(containsNumber(314)).toEqual(true)

})

test('return false on not contains number', () => {

    expect(containsNumber('dit is een test')).toEqual(false)

})

test('return false on not contains number', () => {

    expect(containsNumber(NaN)).toEqual(false)

})
