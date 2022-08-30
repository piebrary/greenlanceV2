import { applyStyles } from './applyStyles.js'

const styles = [
    {
        test_container:'style1_container',
        main:'style1_main',
        footer:'style1_footer'
    }, {
        test_main:'style2_main',
        test_footer:'style2_footer'
    }
]

test('testObject not equal to deepCopy(testObject)', () => {

    console.log(applyStyles(styles, 'test'))

    expect(false).not.toBe(true)

})
