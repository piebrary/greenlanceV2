import { createStyle } from './createStyle.js'

test('function returns style', () => {

    const styles = [{
        container:'container_className',
        main:'main_className'
    }]

    expect(createStyle(styles, ['container'])).toEqual('container_className')

})
