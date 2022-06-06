module.exports = (() => {

    /* colors */
    /* https://www.schemecolor.com/red-white.php */
    const primary1 = 'rgb(169, 0, 17)'
    const primary2 = 'rgb(209, 29, 39)'
    const primary3 = 'rgb(229, 60, 56)'
    const primary4 = 'rgb(255, 100, 76)'
    const primary5 = 'rgb(255, 120, 96)'
    const primary6 = 'rgb(255, 140, 116)'
    const secondary1 = 'rgb(255, 250, 239)'
    const secondary2 = 'rgb(251, 235, 216)'
    const secondary3 = 'rgb(255, 255, 255)'
    const lightest = 'rgb(245, 245, 245)'
    const lighter = 'rgb(232, 232, 232)'
    const light = 'rgb(200, 200, 200)'
    const normal = 'rgb(160, 160, 160)'
    const dark = 'rgb(100, 100, 100)'
    const darker = 'rgb(70, 70, 70)'
    const darkest = 'rgb(10, 10, 10)'
    const success1 = 'rgb(43, 188, 8)'
    const success2 = 'rgb(10, 145, 38)'
    const info1 = 'dodgerblue'
    const info2 = 'blue'
    const warning1 = 'orange'
    const warning2 = 'darkorange'
    const danger1 = 'red'
    const danger2 = 'darkred'

    /* layout */
    const viewmodeBreakpoint = '800px'
    const maxContentWidth = '1400px'
    const minWidth = '360px'
    const contentSpacing = '10px'
    const background = lighter

    /* menu */
    const menuWidth = '250px'
    const menuHeight = '50px'
    const menuBackgroundColor = darkest
    const menuLogoWidth = '100px'
    const menuTitleColor = darkest
    const menuTitleBackgroundColor = secondary3
    const menuTitleBorderRadius = '4px'
    const menuTitlePadding = '10px'
    const menuTitleSpacing = '28px'

    /* components */

    /* components.button */
    const buttonBorder = '0px'
    const buttonBorderRadius = '4px'
    const buttonPadding = '5px 10px'
    const buttonBackgroundColor = success2
    const buttonColor = secondary3

    const buttonBackgroundColorHover = success1
    const buttonColorHover = secondary3

    const buttonTransition = '0.3s ease-in-out'

    /* components.input */
    const inputTransition = '0.3s ease-in-out'

    /* components.checkbox */
    const checkboxTransition = '0.3s ease-in-out'

    /* components.card */
    const cardBorder = '0px'
    const cardBorderRadius = '4px'
    const cardTitlePadding = '10px 10px'
    const cardTitleBackgroundColor = primary3
    const cardTitleColor = secondary3
    const cardDescriptionPadding = '10px 10px'
    const cardDescriptionBackgroundColor = secondary3
    const cardDescriptionColor = normal
    const cardDescriptionFontStyle = 'italic'
    const cardBodyPadding = '10px 10px'
    const cardBodyBackgroundColor = secondary3
    const cardBodyColor = dark

    const cardTransition = '0.3s ease-in-out'
    const cardTitleBackgroundColorHover = primary3
    const cardTitleColorHover = secondary3
    const cardBodyBackgroundColorHover = primary3
    const cardBodyColorHover = secondary3

    return {
        primary1,
        primary2,
        primary3,
        primary4,
        primary5,
        primary6,
        secondary1,
        secondary2,
        secondary3,
        lightest,
        lighter,
        light,
        normal,
        dark,
        darker,
        darkest,
        success1,
        success2,
        info1,
        info2,
        warning1,
        warning2,
        danger1,
        danger2,
        viewmodeBreakpoint,
        maxContentWidth,
        minWidth,
        contentSpacing,
        background,
        menuWidth,
        menuHeight,
        menuBackgroundColor,
        menuLogoWidth,
        menuTitleColor,
        menuTitleBackgroundColor,
        menuTitleBorderRadius,
        menuTitlePadding,
        menuTitleSpacing,
        buttonBorder,
        buttonBorderRadius,
        buttonPadding,
        buttonBackgroundColor,
        buttonColor,
        buttonBackgroundColorHover,
        buttonColorHover,
        buttonTransition,
        inputTransition,
        checkboxTransition,
        cardBorder,
        cardBorderRadius,
        cardTitlePadding,
        cardTitleBackgroundColor,
        cardTitleColor,
        cardDescriptionPadding,
        cardDescriptionBackgroundColor,
        cardDescriptionFontStyle,
        cardBodyPadding,
        cardBodyBackgroundColor,
        cardBodyColor,
        cardTransition,
        cardTitleBackgroundColorHover,
        cardTitleColorHover,
        cardBodyBackgroundColorHover,
        cardBodyColorHover,
    }

})()
