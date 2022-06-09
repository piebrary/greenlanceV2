module.exports = (() => {

    /* colors */
    /* https://www.schemecolor.com/red-white.php */
    const colorPrimary1 = 'rgb(17, 0, 169)'
    const colorPrimary2 = 'rgb(39, 29, 209)'
    const colorPrimary3 = 'rgb(56, 60, 229)'
    const colorPrimary4 = 'rgb(76, 100, 255)'
    const colorPrimary5 = 'rgb(96, 120, 225)'
    const colorPrimary6 = 'rgb(116, 140, 225)'
    const colorWhite = 'rgb(255, 255, 255)'
    const colorGreyLightest = 'rgb(245, 245, 245)'
    const colorGreyLighter = 'rgb(232, 232, 232)'
    const colorGreyLight = 'rgb(200, 200, 200)'
    const colorGreyNormal = 'rgb(160, 160, 160)'
    const colorGreyDark = 'rgb(100, 100, 100)'
    const colorGreyDarker = 'rgb(70, 70, 70)'
    const colorGreyDarkest = 'rgb(10, 10, 10)'
    const colorSuccessLight = 'rgb(154, 201, 145)'
    const colorSuccessNormal = 'rgb(78, 150, 63)'
    const colorSuccessDark = 'rgb(26, 94, 12)'
    const colorInfoLight = 'rgb(95, 177, 201)'
    const colorInfoNormal = 'rgb40, 131, 158)'
    const colorInfoDark = 'rgb(3, 77, 99)'
    const colorWarningLight = 'rgb(191, 148, 75)'
    const colorWarningNormal = 'rgb(191, 131, 29)'
    const colorWarningDark = 'rgb(135, 87, 5)'
    const colorDangerLight = 'rgb(219, 127, 127)'
    const colorDangerNormal = 'rgb(224, 65, 65)'
    const colorDangerDark = 'rgb(135, 5, 5)'

    /* layout */
    const layoutBreakpoint = '800px'
    const layoutMaxWidth = '1400px'
    const layoutMinWidth = '360px'
    const layoutBackground = colorGreyLighter
    const layoutContentSpacing = '10px'

    /* menu */
    const menuWidth = '250px'
    const menuHeight = '50px'
    const menuBackgroundColor = colorGreyDarkest
    const menuLogoWidth = '100px'
    const menuTitleColor = colorGreyDarkest
    const menuTitleBackgroundColor = colorWhite
    const menuTitleBorderRadius = '4px'
    const menuTitlePadding = '10px'
    const menuTitleSpacing = '28px'

    /* components */

    /* components.button */
    const componentButtonBorder = '0px'
    const componentButtonBorderRadius = '4px'
    const componentButtonPadding = '5px 10px'
    const componentButtonBackgroundColor = colorSuccessLight
    const componentButtonColor = colorWhite
    const componentButtonBackgroundColorHover = colorSuccessDark
    const componentButtonColorHover = colorWhite
    const componentButtonTransition = '0.3s ease-in-out'

    /* components.input */
    const componentInputTransition = '0.3s ease-in-out'

    /* components.checkbox */
    const componentCheckboxesMinWidth = '200px'
    const componentCheckboxTransition = '0.3s ease-in-out'
    const componentCheckboxContainerBorderRadius = '4px'
    const componentCheckboxContainerPadding = '10px'
    const componentCheckboxContainerBackgroundColor = colorGreyLighter
    const componentCheckboxPairMargin = '0px 10px'
    const componentCheckboxPairPadding = '8px'
    const componentCheckboxPairBorderRadius = '4px'
    const componentCheckboxPairBackgroundColorHover = colorGreyLightest
    const componentCheckboxBackgroundColor = colorWhite
    const componentCheckboxColor = colorGreyNormal
    const componentCheckboxWidth = '18px'
    const componentCheckboxHeight = '18px'
    const componentCheckboxBorder = '2px solid var(--colorGreyNormal)'
    const componentCheckboxBorderRadius = '20px'
    const componentCheckboxMarginRight = '4px'
    const componentCheckboxBorderHover = '2px solid var(--colorPrimary2)'
    const componentCheckboxCheckedBackgroundColor = colorPrimary6
    const componentCheckboxCheckedColor = colorGreyNormal
    const componentCheckboxDisabledBackgroundColor = colorGreyLighter
    const componentCheckboxDisabledColor = colorGreyNormal
    const componentCheckboxDisabledBorder = '2px solid var(--colorGreyLight)'

    /* components.card */
    const componentCardBorder = '0px'
    const componentCardBorderRadius = '4px'
    const componentCardTitlePadding = '10px 10px'
    const componentCardTitleBackgroundColor = colorPrimary3
    const componentCardTitleColor = colorWhite
    const componentCardDescriptionPadding = '10px 10px'
    const componentCardDescriptionBackgroundColor = colorWhite
    const componentCardDescriptionColor = colorGreyNormal
    const componentCardDescriptionFontStyle = 'italic'
    const componentCardBodyPadding = '10px 10px'
    const componentCardBodyBackgroundColor = colorWhite
    const componentCardBodyColor = colorGreyDark
    const componentCardTransition = '0.3s ease-in-out'
    const componentCardTitleBackgroundColorHover = colorPrimary3
    const componentCardTitleColorHover = colorWhite
    const componentCardBodyBackgroundColorHover = colorPrimary3
    const componentCardBodyColorHover = colorWhite

    /* component.calendar */
    const componentCalendarBorderRadius = '6px'
    const componentCalendarWidth = 'calc(100% / 7)'
    const componentCalendarFontSize = '10px'
    const componentCalendarBackgroundColor = colorWhite
    const componentCalendarHeaderPadding = '4px'
    const componentCalendarContentPadding = '10px'
    const componentCalendarControlBtnColor = colorGreyDark
    const componentCalendarControlBtnPadding = '6px 12px'
    const componentCalendarControlBtnMargin = '0px'
    const componentCalendarControlBtnFont = 'Montserrat'
    const componentCalendarControlBtnColorHover = colorWhite
    const componentCalendarControlBtnBackgroundColorHover = colorPrimary5
    const componentCalendarControlBtnActiveColor = colorGreyDark
    const componentCalendarControlBtnActiveBackgroundColor = colorGreyLighter
    const componentCalendarControlBtnActiveFontWeight = 'bold'
    const componentCalendarControlBtnSpacing = '4px'
    const componentCalendarTableHeadColor = colorGreyDark
    const componentCalendarTableHeadBackgroundColor = colorGreyLightest
    const componentCalendarTableHeadBorder = '3px solid var(--colorGreyLightest)'
    const componentCalendarTableCellTextAlign = 'center'
    const componentCalendarTableCellBackgroundColor = colorWhite
    const componentCalendarTableCellBorder = '2px solid var(--colorGreyLightest)'
    const componentCalendarTableCellHeight = '90px'
    const componentCalendarTableCellMinHeight = 'fit-content'
    const componentCalendarTableCellMinWidth = '90px'
    const componentCalendarTableCellVerticalAlign = 'top'
    const componentCalendarTableCellPadding = '5px 3px 5px 3px'
    const componentCalendarTableCellLowTransparencyOpacity = '0.2'
    const componentCalendarTableCellLowTransparencyBackgroundColor = colorGreyLighter
    const componentCalendarTableCellDateColor = colorGreyDarker
    const componentCalendarTableCellDateFontWeight = 'bold'
    const componentCalendarTableCellDateBorderRadius = '10px'
    const componentCalendarTableCellDatePadding = '3px 6px'
    const componentCalendarTableCellDateHeight = '24px'
    const componentCalendarTableCellDateMonthColor = colorGreyDarker
    const componentCalendarTableCellDateMonthFontWeight = 'normal'
    const componentCalendarTableCellDateMonthTextOverflow = 'ellipsis'
    const componentCalendarTableCellCurrentDayBackgroundColor = colorPrimary5
    const componentCalendarTableCellEventContainerBackgroundColor = colorGreyDarker
    const componentCalendarTableCellEventContainerBorderRadius = '10px'
    const componentCalendarTableCellEventContainerColor = colorWhite
    const componentCalendarTableCellEventContainerFontWeight = 'normal'
    const componentCalendarTableCellEventContainerPadding = '4px'
    const componentCalendarTableCellEventContainerDistance = '2px'
    const componentCalendarTableCellEventContainerColorHover = colorWhite
    const componentCalendarTableCellEventContainerBackgroundColorHover = colorPrimary3
    const componentCalendarTableCellCreateEventButtonColor = colorGreyDarker
    const componentCalendarCreateEventButtonColor = colorGreyDarker
    const componentCalendarListItemDistance = '10px'
    const componentCalendarListItemBorder = '1px solid var(--colorGreyLighter)'
    const componentCalendarListItemPadding = '10px'
    const componentCalendarListItemBorderRadius = '4px'
    const componentCalendarListItemTitleBorderBottom = '1px solid var(--colorGreyLighter)'

    /* component.confirm */
    const componentConfirmContainerPosition = 'absolute'
    const componentConfirmContainerTop = '0'
    const componentConfirmContainerLeft = '0'
    const componentConfirmContainerWidth = '100vw'
    const componentConfirmContainerHeight = '100vh'
    const componentConfirmContainerBackgroundColor = 'rgb(0, 0, 0, 0.8)'
    const componentConfirmCardContainerMinWidth = 'fit-content'
    const componentConfirmCardContainerMaxWidth = '80%'
    const componentConfirmCardContainerPosition = 'absolute'
    const componentConfirmCardContainerTop = '50%'
    const componentConfirmCardContainerLeft = '50%'
    const componentConfirmBodyFontSize = '22px'
    const componentConfirmBodyPadding = '20px'
    const componentConfirmButtonsGroupMarginTop = '50px'
    const componentConfirmOkBtnBackgroundColorHover = colorSuccessLight
    const componentConfirmOkBtnBackgroundColor = colorGreyDarkest
    const componentConfirmOkBtnPadding = '10px'
    const componentConfirmOkBtnFontSize = '20px'
    const componentConfirmCancelBtnBackgroundColorHover = colorDangerLight
    const componentConfirmCancelBtnBackgroundColor = colorGreyDarkest
    const componentConfirmCancelBtnPadding = '10px'
    const componentConfirmCancelBtnFontSize = '20px'

    /* component.datepicker */

    return {
        colorPrimary1,
        colorPrimary2,
        colorPrimary3,
        colorPrimary4,
        colorPrimary5,
        colorPrimary6,
        colorWhite,
        colorGreyLightest,
        colorGreyLighter,
        colorGreyLight,
        colorGreyNormal,
        colorGreyDark,
        colorGreyDarker,
        colorGreyDarkest,
        colorSuccessLight,
        colorSuccessNormal,
        colorSuccessDark,
        colorInfoLight,
        colorInfoNormal,
        colorInfoDark,
        colorWarningLight,
        colorWarningNormal,
        colorWarningDark,
        colorDangerLight,
        colorDangerNormal,
        colorDangerDark,
        layoutBreakpoint,
        layoutMaxWidth,
        layoutMinWidth,
        layoutBackground,
        layoutContentSpacing,
        menuWidth,
        menuHeight,
        menuBackgroundColor,
        menuLogoWidth,
        menuTitleColor,
        menuTitleBackgroundColor,
        menuTitleBorderRadius,
        menuTitlePadding,
        menuTitleSpacing,
        componentButtonBorder,
        componentButtonBorderRadius,
        componentButtonPadding,
        componentButtonBackgroundColor,
        componentButtonColor,
        componentButtonBackgroundColorHover,
        componentButtonColorHover,
        componentButtonTransition,
        componentInputTransition,
        componentCheckboxesMinWidth,
        componentCheckboxTransition,
        componentCheckboxContainerBorderRadius,
        componentCheckboxContainerPadding,
        componentCheckboxContainerBackgroundColor,
        componentCheckboxPairMargin,
        componentCheckboxPairPadding,
        componentCheckboxPairBorderRadius,
        componentCheckboxPairBackgroundColorHover,
        componentCheckboxBackgroundColor,
        componentCheckboxColor,
        componentCheckboxWidth,
        componentCheckboxHeight,
        componentCheckboxBorder,
        componentCheckboxBorderRadius,
        componentCheckboxMarginRight,
        componentCheckboxBorderHover,
        componentCheckboxCheckedBackgroundColor,
        componentCheckboxCheckedColor,
        componentCheckboxDisabledBackgroundColor,
        componentCheckboxDisabledColor,
        componentCheckboxDisabledBorder,
        componentCardBorder,
        componentCardBorderRadius,
        componentCardTitlePadding,
        componentCardTitleBackgroundColor,
        componentCardTitleColor,
        componentCardDescriptionPadding,
        componentCardDescriptionBackgroundColor,
        componentCardDescriptionFontStyle,
        componentCardBodyPadding,
        componentCardBodyBackgroundColor,
        componentCardBodyColor,
        componentCardTransition,
        componentCardTitleBackgroundColorHover,
        componentCardTitleColorHover,
        componentCardBodyBackgroundColorHover,
        componentCardBodyColorHover,
        componentCalendarFontSize,
        componentCalendarBorderRadius,
        componentCalendarWidth,
        componentCalendarFontSize,
        componentCalendarBackgroundColor,
        componentCalendarHeaderPadding,
        componentCalendarContentPadding,
        componentCalendarControlBtnColor,
        componentCalendarControlBtnPadding,
        componentCalendarControlBtnMargin,
        componentCalendarControlBtnFont,
        componentCalendarControlBtnColorHover,
        componentCalendarControlBtnBackgroundColorHover,
        componentCalendarControlBtnActiveColor,
        componentCalendarControlBtnActiveBackgroundColor,
        componentCalendarControlBtnSpacing,
        componentCalendarTableHeadColor,
        componentCalendarTableHeadBackgroundColor,
        componentCalendarTableHeadBorder,
        componentCalendarTableCellTextAlign,
        componentCalendarTableCellBackgroundColor,
        componentCalendarTableCellBorder,
        componentCalendarTableCellHeight,
        componentCalendarTableCellMinHeight,
        componentCalendarTableCellMinWidth,
        componentCalendarTableCellVerticalAlign,
        componentCalendarTableCellPadding,
        componentCalendarTableCellLowTransparencyOpacity,
        componentCalendarTableCellLowTransparencyBackgroundColor,
        componentCalendarTableCellDateColor,
        componentCalendarTableCellDateFontWeight,
        componentCalendarTableCellDateBorderRadius,
        componentCalendarTableCellDatePadding,
        componentCalendarTableCellDateHeight,
        componentCalendarTableCellDateMonthColor,
        componentCalendarTableCellDateMonthFontWeight,
        componentCalendarTableCellDateMonthTextOverflow,
        componentCalendarTableCellCurrentDayBackgroundColor,
        componentCalendarTableCellEventContainerBackgroundColor,
        componentCalendarTableCellEventContainerBorderRadius,
        componentCalendarTableCellEventContainerColor,
        componentCalendarTableCellEventContainerFontWeight,
        componentCalendarTableCellEventContainerPadding,
        componentCalendarTableCellEventContainerDistance,
        componentCalendarTableCellEventContainerColorHover,
        componentCalendarTableCellEventContainerBackgroundColorHover,
        componentCalendarTableCellCreateEventButtonColor,
        componentCalendarCreateEventButtonColor,
        componentCalendarListItemDistance,
        componentCalendarListItemBorder,
        componentCalendarListItemPadding,
        componentCalendarListItemBorderRadius,
        componentCalendarListItemTitleBorderBottom,
        componentConfirmContainerPosition,
        componentConfirmContainerTop,
        componentConfirmContainerLeft,
        componentConfirmContainerWidth,
        componentConfirmContainerHeight,
        componentConfirmContainerBackgroundColor,
        componentConfirmCardContainerMinWidth,
        componentConfirmCardContainerMaxWidth,
        componentConfirmCardContainerPosition,
        componentConfirmCardContainerTop,
        componentConfirmCardContainerLeft,
        componentConfirmBodyFontSize,
        componentConfirmBodyPadding,
        componentConfirmButtonsGroupMarginTop,
        componentConfirmOkBtnBackgroundColorHover,
        componentConfirmOkBtnBackgroundColor,
        componentConfirmOkBtnPadding,
        componentConfirmOkBtnFontSize,
        componentConfirmCancelBtnBackgroundColorHover,
        componentConfirmCancelBtnBackgroundColor,
        componentConfirmCancelBtnPadding,
        componentConfirmCancelBtnFontSize,
    }

})()
