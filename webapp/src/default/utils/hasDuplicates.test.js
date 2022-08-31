import { hasDuplicates } from './hasDuplicates.js'

test('array has duplicates', () => {

    expect(hasDuplicates([ 'a', 'b', 'c', 'a'])).toEqual(true)

})

test('array has no duplicates', () => {

    expect(hasDuplicates(['a', 'b', 'c'])).toEqual(false)

})

test('array has no duplicates', () => {

    expect(hasDuplicates([])).toEqual(false)

})
