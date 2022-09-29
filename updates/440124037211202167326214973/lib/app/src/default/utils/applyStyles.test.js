import { applyStyles } from './applyStyles.js'

test('applyStyles result to equal', () => {

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

    expect(applyStyles(styles, 'test')).toEqual({
        container: [ 'style1_container' ],
        main: [ 'style2_main' ],
        footer: [ 'style2_footer' ]
      })

})

test('applyStyles result to equal', () => {

    const styles = [
        {
            test_container:'style1_container',
            main:'style1_main',
            footer:'style1_footer'
        }
    ]

    expect(applyStyles(styles, 'test')).toEqual({
        container: [ 'style1_container' ]
      })

})

test('applyStyles result to equal', () => {

    const styles = [
        {
            test_container:'style1_container',
            main:'style1_main',
            footer:'style1_footer'
        }
    ]

    expect(applyStyles(styles, 'main')).toEqual({})

})
