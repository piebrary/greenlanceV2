import { deepCopy } from './deepCopy.js'

const testObject = {
    a:1,
    b:'b',
    c:undefined,
    d:null,
    e:false
}

test('testObject not equal to deepCopy(testObject)', () => {

    expect(deepCopy(testObject)).not.toBe(testObject)

})

test('deepCopy(testObject) has same keys as testObject', () => {

    expect(Object.keys(deepCopy(testObject))).toEqual(Object.keys(testObject))

})
