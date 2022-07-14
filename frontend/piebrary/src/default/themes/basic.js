export default function basic(){

    /* colors */
    /* https://www.schemecolor.com/red-white.php */
    const colorPrimary1 = 'rgb(245, 245, 245)'
    const colorPrimary2 = 'rgb(232, 232, 232)'
    const colorPrimary3 = 'rgb(200, 200, 200)'
    const colorPrimary4 = 'rgb(160, 160, 160)'
    const colorPrimary5 = 'rgb(100, 100, 100)'
    const colorPrimary6 = 'rgb(70, 70, 70)'
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
    const menuLogoutBtnMargin = '30px 0px 10px 0px'
    const menuLogoutBtnAColor = colorWhite
    const menuLogoutBtnAMargin = '20px 0px'
    const menuLogoutBtnAColorHover = colorPrimary3
    const menuControlsMargin = '0px 10px 0px auto'
    const menuControlsPadding = '0px 10px'
    const menuControlsMarginOnlyChild = '0px auto 0px 0px'
    const menuGroupMaxWidth = '100vw'
    const menuGroupMargin = '15px 0px'
    const menuGroupMarginTop = '40px'
    const menuGroupPaddingLeft = '20px'
    const menuGroupMarginTopFirstChild = '30px'
    const menuLabelColor = colorPrimary3
    const menuLabelMargin = '30px 20px 0px 0px'
    const menuItemColor = colorWhite
    const menuItemMargin = '10px 8px 0px 0px'
    const menuItemBackgroundColor = colorGreyDarker
    const menuItemBorderRadius = '4px'
    const menuItemPadding = '10px'
    const menuItemColorHover = colorPrimary3
    const menuItemIconHeight = '20px'
    const menuItemTextPaddingTop = '1px'
    const menuTitleColorMobile = colorWhite
    const menuTitlePaddingMobile = '5px'
    const menuTitleMargin = '1px inherit inherit inherit'
    const menuToggleLineHeight = '10px'
    const menuToggleColor = colorWhite
    const menuTogglePadding = '5px'
    const menuHeaderMarginTop = '10px'

    /* logo */
    const logoContainerPadding = '10px 5px'
    const logoContainerJustifyContent = 'space-around'
    const logoContainerAlignItems = 'center'
    const logoContainerBackgroundColor = colorPrimary3
    const logoContainerColor = colorGreyDarkest
    const logoContainerFontSize = '22px'
    const logoContainerFontWeight = '600'


    /* components */

    /* components.button */
    const componentButtonBorder = '0px'
    const componentButtonBorderRadius = '4px'
    const componentButtonPadding = '5px 10px'
    const componentButtonBackgroundColor = colorSuccessLight
    const componentButtonColor = colorWhite
    const componentButtonBackgroundColorHover = colorSuccessDark
    const componentButtonColorHover = colorWhite
    const componentButtonTransition = '0.2s ease-in-out'

    /* components.input */
    const componentInputTransition = '0.2s ease-in-out'
    const componentInputContainerBackgroundColor = colorGreyLighter
    const componentInputContainerBorderRadius = '4px'
    const componentInputContainerPadding = '10px'
    const componentInputInputContainerMarginLeft = '10px'
    const componentInputInputContainerMaxWidth = '300px'
    const componentInputInputContainerLargeMaxWidth = '600px'
    const componentInputInputFieldAlignItems = 'center'
    const componentInputInputFieldBorderRadius = '4px'
    const componentInputInputFieldBackgroundColor = colorWhite
    const componentInputInputFieldBoxShadowFocus = '0 -4px 1px -2px ' + colorPrimary3 + ' inset'
    const componentInputInputFieldBorderBottomLeftRadius = '0px'
    const componentInputInputFieldBorderBottomRightRadius = '0px'
    const componentInputInputColor = colorGreyDark
    const componentInputInputBorder = '0px'
    const componentInputInputPadding = '10px'
    const componentInputInputFontSize = '16px'
    const componentInputInputTextAlign = 'center'
    const componentInputInputBackgroundColor = 'rgba(0,0,0,0)'
    const componentInputInputHeight = '40px'
    const componentInputInputBorderFocus = 'none'
    const componentInputInputBackgroundColorReadOnly = colorGreyLightest
    const componentInputInputColorReadOnly = colorGreyNormal
    const componentInputInputBoxShadowReadOnly = 'none'
    const componentInputInputBorderRadiusReadOnly = '4px'
    const componentInputInputBackgroundColorReadOnlyHideToggle = colorGreyLighter
    const componentInputHideToggleTransition = componentInputTransition
    const componentInputHideTogglePadding = '8px'
    const componentInputHideToggleColorHover = colorPrimary2
    const componentInputErrorMessageColor = colorPrimary3
    const componentInputErrorMessageFontSize = '13px'
    const componentInputErrorMessageTextAlign = 'center'
    const componentInputErrorMessageMarginTop = '10px'

    /* components.checkbox */
    const componentCheckboxesMinWidth = '200px'
    const componentCheckboxTransition = '0.2s ease-in-out'
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
    const componentCheckboxBorderRadius = '5px'
    const componentCheckboxMarginRight = '4px'
    const componentCheckboxBorderHover = '2px solid var(--colorPrimary2)'
    const componentCheckboxCheckedBackgroundColor = colorPrimary6
    const componentCheckboxCheckedColor = colorGreyNormal
    const componentCheckboxDisabledBackgroundColor = colorGreyLighter
    const componentCheckboxDisabledColor = colorGreyNormal
    const componentCheckboxDisabledBorder = '2px solid var(--colorGreyLight)'

    /* components.checkbox */
    const componentRadiosMinWidth = '200px'
    const componentRadioTransition = '0.2s ease-in-out'
    const componentRadioContainerBorderRadius = '4px'
    const componentRadioContainerPadding = '10px'
    const componentRadioContainerBackgroundColor = colorGreyLighter
    const componentRadioPairMargin = '0px 10px'
    const componentRadioPairPadding = '8px'
    const componentRadioPairBorderRadius = '4px'
    const componentRadioPairBackgroundColorHover = colorGreyLightest
    const componentRadioBackgroundColor = colorWhite
    const componentRadioColor = colorGreyNormal
    const componentRadioWidth = '18px'
    const componentRadioHeight = '18px'
    const componentRadioBorder = '2px solid var(--colorGreyNormal)'
    const componentRadioBorderRadius = '5px'
    const componentRadioMarginRight = '4px'
    const componentRadioBorderHover = '2px solid var(--colorPrimary2)'
    const componentRadioCheckedBackgroundColor = colorPrimary6
    const componentRadioCheckedColor = colorGreyNormal
    const componentRadioDisabledBackgroundColor = colorGreyLighter
    const componentRadioDisabledColor = colorGreyNormal
    const componentRadioDisabledBorder = '2px solid var(--colorGreyLight)'

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
    const componentCardTransition = '0.2s ease-in-out'
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
    const componentCalendarControlBtnBackgroundColor = colorWhite
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
    const componentCalendarTableCellCurrentDayBackgroundColor = colorPrimary2
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
    const componentDatePickerContainerBackgroundColor = colorGreyLighter
    const componentDatePickerContainerBorderRadius = '4px'
    const componentDatePickerContainerPadding = '10px'
    const componentDatePickerDateContainerMarginLeft = '10px'
    const componentDatePickerDateContainerMaxWidth = '300px'
    const componentDatePickerDateContainerWidth = '300px'
    const componentDatePickerSelectedDateColor = colorGreyDark
    const componentDatePickerSelectedDateBackgroundColor = colorWhite
    const componentDatePickerSelectedDateBorderRadius = '4px'
    const componentDatePickerSelectedDateBorder = '0px'
    const componentDatePickerSelectedDatePadding = '10px'
    const componentDatePickerSelectedDateFontSize = '16px'
    const componentDatePickerSelectedDateColorHover = colorWhite
    const componentDatePickerSelectedDateBackgroundColorHover = colorPrimary3
    const componentDatePickerSelectedDateTransitionHover = '0.2s ease-in-out'
    const componentDatePickerDatePickerColor = colorGreyDark
    const componentDatePickerDatePickerBorder = '0px'
    const componentDatePickerDatePickerPadding = '10px'
    const componentDatePickerDatePickerFontSize = '16px'
    const componentDatePickerDatePickerBorderRadius = '4px'
    const componentDatePickerDatePickerBackgroundColor = colorWhite
    const componentDatePickerDatePickerMarginTop = '4px'
    const componentDatePickerBoundariesColor = colorGreyDark
    const componentDatePickerBoundariesPaddingRight = '10px'
    const componentDatePickerBoundariesMarginTop = '10px'
    const componentDatePickerBoundariesFontSize = '13px'
    const componentDatePickerDaysGridGap = '2px'
    const componentDatePickerDaysGridAutoRows = '40px'
    const componentDatePickerMonthsGridGap = '2px'
    const componentDatePickerMonthsGridAutoRows = '40px'
    const componentDatePickerYearsGridGap = '2px'
    const componentDatePickerYearsGridAutoRows = '40px'
    const componentDatePickerPeriodPadding = '10px'
    const componentDatePickerPeriodBorderRadius = '4px'
    const componentDatePickerPeriodSelectableColor = colorWhite
    const componentDatePickerPeriodSelectableBackgroundColor = colorPrimary3
    const componentDatePickerPeriodSelectableTransition = '0.2s ease-in-out'
    const componentDatePickerDayOfCurMonColor = colorGreyDark
    const componentDatePickerDayOfOtherMonColor = colorGreyLighter
    const componentDatePickerDaySelectedColor = colorWhite
    const componentDatePickerDaySelectedBackgroundColor = colorPrimary6
    const componentDatePickerOutOfBoundsColor = colorGreyLighter
    const componentDatePickerCancelBtnColor = colorGreyDark
    const componentDatePickerCancelBtnBackgroundColor = 'rgba(0,0,0,0)'
    const componentDatePickerCancelBtnColorHover = colorWhite
    const componentDatePickerCancelBtnBackgroundColorHover = colorPrimary3
    const componentDatePickerPreviousBtnColor = colorGreyDark
    const componentDatePickerPreviousBtnBackgroundColor = 'rgba(0,0,0,0)'
    const componentDatePickerPreviousBtnColorHover = colorWhite
    const componentDatePickerPreviousBtnBackgroundColorHover = colorPrimary3
    const componentDatePickerNextBtnColor = colorGreyDark
    const componentDatePickerNextBtnBackgroundColor = 'rgba(0,0,0,0)'
    const componentDatePickerNextBtnColorHover = colorWhite
    const componentDatePickerNextBtnBackgroundColorHover = colorPrimary3

    /* component.form */
    const componentFormItemsMarginBottom = '5px'

    /* component.grid */
    const componentGridTemplateColumns = 'repeat(3, 1fr)'
    const componentGridTemplateGap = '10px'
    const componentGridTemplateAutoRows = 'minmax(100px, auto)'
    const componentGridItemBackgroundColor = colorPrimary3
    const componentGridItemBorderRadius = '4px'

    /* component.imageUploader */
    const componentImageUploaderContainerBackgroundColor = colorGreyLighter
    const componentImageUploaderContainerBorderRadius = '4px'
    const componentImageUploaderContainerPadding = '10px'
    const componentImageUploaderContainerMarginTop = '10px'
    const componentImageUploaderPictureBackgroundPadding = '20px'
    const componentImageUploaderPictureBackgroundBackgroundColor = colorWhite
    const componentImageUploaderPictureBackgroundBorderRadius = '4px'
    const componentImageUploaderSelectedPictureBorderRadius = '4px'

    /* component.list */
    const componentListContainerTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))'
    const componentListContainerTemplateRows = 'repeat(auto-fill, 1fr)'
    const componentListContainerGap = '10px'
    const componentListItemBackgroundColor = colorGreyLightest
    const componentListItemBorderRadius = '4px'
    const componentListItemPadding = '10px'
    const componentListBulletMarginLeft = '2px'
    const componentListBulletMarginRight = '10px'
    const componentListBulletFontWeight = 'bold'
    const componentListIconMarginLeft = '2px'
    const componentListIconMarginRight = '10px'
    const componentListIconColor = colorPrimary4
    const componentListClickableBackgroundColorHover = colorPrimary5
    const componentListClickableColorHover = colorWhite
    const componentListClickableIconColorHover = colorWhite
    const componentListClickableBullerColorHover = colorWhite

    /* component.container */
    const componentSelectContainerBackgroundColor = colorGreyLighter
    const componentSelectContainerBorderRadius = '4px'
    const componentSelectContainerPadding = '10px'
    const componentSelectSelectBorder = '0px'
    const componentSelectSelectBorderRadius = '4px'
    const componentSelectSelectFontSize = '14px'
    const componentSelectSelectPadding = '4px'
    const componentSelectSelectColor = colorGreyDark
    const componentSelectSelectOutline = 'none'

    /* component.table */
    const componentTableTableBorderRadius = '5px'
    const componentTableTableBorderSpacing = '0px 3px'
    const componentTableTHeadBackgroundColor = colorPrimary3
    const componentTableTHeadColor = colorWhite
    const componentTableTHeadThFirstChildBorderTopLeftRadius = '4px'
    const componentTableTHeadThFirstChildBorderBottomLeftRadius = '4px'
    const componentTableTHeadThLastChildBorderTopRightRadius = '4px'
    const componentTableTHeadThLastChildBorderBottomRightRadius = '4px'
    const componentTableTHeadThBackgroundColorHover = colorPrimary5
    const componentTableTrBorderBottomLastChild = '0px'
    const componentTableTrBackgroundColorNthChild = colorGreyLighter
    const componentTableThTdMargin = '0px'
    const componentTableThTdPadding = '0.5rem'
    const componentTableThTdTextAlign = 'center'
    const componentTableTdMaxWidth = '300px'
    const componentTableTBodyTrColorHover = colorPrimary5
    const componentTableTBodyTrBackgroundColorHover = colorGreyDarkest
    const componentTableThTdBorderRightLastChild = '0px'
    const componentTableTdFirstChildBorderTopLeftRadius = '4px'
    const componentTableTdFirstChildBorderBottomLeftRadius = '4px'
    const componentTableTdLastChildBorderTopRightRadius = '4px'
    const componentTableTdLastChildBorderBottomRightRadius = '4px'

    /* component.timePicker */
    const componentTimePickerContainerBackgroundColor = colorGreyLighter
    const componentTimePickerContainerBorderRadius = '4px'
    const componentTimePickerContainerPadding = '10px'
    const componentTimePickerTimeContainerMarginLeft = '10px'
    const componentTimePickerTimeContainerMaxWidth = '300px'
    const componentTimePickerTimeContainerWidth = '300px'
    const componentTimePickerSelectedTimeColor = colorGreyDark
    const componentTimePickerSelectedTimeBorderRadius = '4px'
    const componentTimePickerSelectedTimeOutline = 'none'
    const componentTimePickerSelectedTimeTextAlign = 'center'
    const componentTimePickerSelectedTimeBorder = '0px'
    const componentTimePickerSelectedTimePadding = '10px'
    const componentTimePickerSelectedTimeFontSize = '16px'
    const componentTimePickerSelectedTimeBackgroundColor = colorWhite
    const componentTimePickerSelectedTimeColorHover = colorWhite
    const componentTimePickerSelectedTimeBackgroundColorHover = colorPrimary3
    const componentTimePickerSelectedTimeTransitionHover = '0.2s ease-in-out'
    const componentTimePickerTimePickerColor = colorGreyDark
    const componentTimePickerTimePickerBorder = '0px'
    const componentTimePickerTimePickerPadding = '10px'
    const componentTimePickerTimePickerFontSize = '16px'
    const componentTimePickerTimePickerOutline = 'none'
    const componentTimePickerTimePickerBorderRadius = '4px'
    const componentTimePickerTimePickerBackgroundColor = colorWhite
    const componentTimePickerTimePickerMarginTop = '4px'
    const componentTimePickerBoundariesInfoColor = colorGreyDark
    const componentTimePickerBoundariesInfoJustifyContent = 'right'
    const componentTimePickerBoundariesInfoPaddingRight = '10px'
    const componentTimePickerBoundariesInfoMarginTop = '10px'
    const componentTimePickerBoundariesInfoFontSize = '13px'
    const componentTimePickerHoursGrid24TemplateColumns = 'repeat(6, 1fr)'
    const componentTimePickerHoursGrid24Gap = '2px'
    const componentTimePickerHoursGrid24AutoRows = '40px'
    const componentTimePickerHoursGrid24MarginTop = '8px'
    const componentTimePickerHoursGridAMPMTemplateColumns = 'repeat(6, 1fr)'
    const componentTimePickerHoursGridAMPMGap = '2px'
    const componentTimePickerHoursGridAMPMAutoRows = '40px'
    const componentTimePickerHoursGridAMPMMarginTop = '8px'
    const componentTimePickerMinutesGridTemplateColumns = 'repeat(6, 1fr)'
    const componentTimePickerMinutesGridGap = '2px'
    const componentTimePickerMinutesGridAutoRows = '40px'
    const componentTimePickerMinutesGridMarginTop = '8px'
    const componentTimePickerIsSelectablePadding = '10px'
    const componentTimePickerIsSelectableBorderRadius = '4px'
    const componentTimePickerIsSelectableColor = colorGreyDark
    const componentTimePickerIsSelectableColorHover = colorWhite
    const componentTimePickerIsSelectableBackgroundColorHover = colorPrimary3
    const componentTimePickerIsSelectableTransitionHover = '0.2s ease-in-out'
    const componentTimePickerIsNotSelectableColor = colorGreyLighter
    const componentTimePickerDaySelectedColor = colorWhite
    const componentTimePickerDaySelectedBackgroundColor = colorPrimary6
    const componentTimePickerOutOfBoundsColor = colorGreyLighter
    const componentTimePickerCancelBtnBackgroundColor = 'rgba(0,0,0,0)'
    const componentTimePickerCancelBtnColor = colorGreyDark
    const componentTimePickerCancelBtnBackgroundColorHover = colorPrimary3
    const componentTimePickerCancelBtnColorHover = colorWhite
    const componentTimePickerPreviousBtnBackgroundColor = 'rgba(0,0,0,0)'
    const componentTimePickerPreviousBtnColor = colorGreyDark
    const componentTimePickerPreviousBtnBackgroundColorHover = colorPrimary3
    const componentTimePickerPreviousBtnColorHover = colorWhite
    const componentTimePickerNextBtnBackgroundColor = 'rgba(0,0,0,0)'
    const componentTimePickerNextBtnColor = colorGreyDark
    const componentTimePickerNextBtnBackgroundColorHover = colorPrimary3
    const componentTimePickerNextBtnColorHover = colorWhite

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
        menuLogoutBtnMargin,
        menuLogoutBtnAColor,
        menuLogoutBtnAMargin,
        menuLogoutBtnAColorHover,
        menuControlsMargin,
        menuControlsPadding,
        menuControlsMarginOnlyChild,
        menuGroupMaxWidth,
        menuGroupMargin,
        menuGroupMarginTop,
        menuGroupPaddingLeft,
        menuGroupMarginTopFirstChild,
        menuLabelColor,
        menuLabelMargin,
        menuItemColor,
        menuItemMargin,
        menuItemBackgroundColor,
        menuItemBorderRadius,
        menuItemPadding,
        menuItemColorHover,
        menuItemIconHeight,
        menuItemTextPaddingTop,
        menuTitleColorMobile,
        menuTitlePaddingMobile,
        menuTitleMargin,
        menuToggleLineHeight,
        menuToggleColor,
        menuTogglePadding,
        menuHeaderMarginTop,
        logoContainerPadding,
        logoContainerJustifyContent,
        logoContainerAlignItems,
        logoContainerBackgroundColor,
        logoContainerColor,
        logoContainerFontSize,
        logoContainerFontWeight,
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
        componentRadiosMinWidth,
        componentRadioTransition,
        componentRadioContainerBorderRadius,
        componentRadioContainerPadding,
        componentRadioContainerBackgroundColor,
        componentRadioPairMargin,
        componentRadioPairPadding,
        componentRadioPairBorderRadius,
        componentRadioPairBackgroundColorHover,
        componentRadioBackgroundColor,
        componentRadioColor,
        componentRadioWidth,
        componentRadioHeight,
        componentRadioBorder,
        componentRadioBorderRadius,
        componentRadioMarginRight,
        componentRadioBorderHover,
        componentRadioCheckedBackgroundColor,
        componentRadioCheckedColor,
        componentRadioDisabledBackgroundColor,
        componentRadioDisabledColor,
        componentRadioDisabledBorder,
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
        componentCalendarControlBtnBackgroundColor,
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
        componentDatePickerContainerBackgroundColor,
        componentDatePickerContainerBorderRadius,
        componentDatePickerContainerPadding,
        componentDatePickerDateContainerMarginLeft,
        componentDatePickerDateContainerMaxWidth,
        componentDatePickerDateContainerWidth,
        componentDatePickerSelectedDateColor,
        componentDatePickerSelectedDateBackgroundColor,
        componentDatePickerSelectedDateBorderRadius,
        componentDatePickerSelectedDateBorder,
        componentDatePickerSelectedDatePadding,
        componentDatePickerSelectedDateFontSize,
        componentDatePickerSelectedDateColorHover,
        componentDatePickerSelectedDateBackgroundColorHover,
        componentDatePickerSelectedDateTransitionHover,
        componentDatePickerDatePickerColor,
        componentDatePickerDatePickerBorder,
        componentDatePickerDatePickerPadding,
        componentDatePickerDatePickerFontSize,
        componentDatePickerDatePickerBorderRadius,
        componentDatePickerDatePickerBackgroundColor,
        componentDatePickerDatePickerMarginTop,
        componentDatePickerBoundariesColor,
        componentDatePickerBoundariesPaddingRight,
        componentDatePickerBoundariesMarginTop,
        componentDatePickerBoundariesFontSize,
        componentDatePickerDaysGridGap,
        componentDatePickerDaysGridAutoRows,
        componentDatePickerMonthsGridGap,
        componentDatePickerMonthsGridAutoRows,
        componentDatePickerYearsGridGap,
        componentDatePickerYearsGridAutoRows,
        componentDatePickerPeriodPadding,
        componentDatePickerPeriodBorderRadius,
        componentDatePickerPeriodSelectableColor,
        componentDatePickerPeriodSelectableBackgroundColor,
        componentDatePickerPeriodSelectableTransition,
        componentDatePickerDayOfCurMonColor,
        componentDatePickerDayOfOtherMonColor,
        componentDatePickerDaySelectedColor,
        componentDatePickerDaySelectedBackgroundColor,
        componentDatePickerOutOfBoundsColor,
        componentDatePickerCancelBtnColor,
        componentDatePickerCancelBtnBackgroundColor,
        componentDatePickerCancelBtnColorHover,
        componentDatePickerCancelBtnBackgroundColorHover,
        componentDatePickerPreviousBtnColor,
        componentDatePickerPreviousBtnBackgroundColor,
        componentDatePickerPreviousBtnColorHover,
        componentDatePickerPreviousBtnBackgroundColorHover,
        componentDatePickerNextBtnColor,
        componentDatePickerNextBtnBackgroundColor,
        componentDatePickerNextBtnColorHover,
        componentDatePickerNextBtnBackgroundColorHover,
        componentFormItemsMarginBottom,
        componentGridTemplateColumns,
        componentGridTemplateGap,
        componentGridTemplateAutoRows,
        componentGridItemBackgroundColor,
        componentGridItemBorderRadius,
        componentImageUploaderContainerBackgroundColor,
        componentImageUploaderContainerBorderRadius,
        componentImageUploaderContainerPadding,
        componentImageUploaderContainerMarginTop,
        componentImageUploaderPictureBackgroundPadding,
        componentImageUploaderPictureBackgroundBackgroundColor,
        componentImageUploaderPictureBackgroundBorderRadius,
        componentImageUploaderSelectedPictureBorderRadius,
        componentInputContainerBackgroundColor,
        componentInputContainerBorderRadius,
        componentInputContainerPadding,
        componentInputInputContainerMarginLeft,
        componentInputInputContainerMaxWidth,
        componentInputInputContainerLargeMaxWidth,
        componentInputInputFieldAlignItems,
        componentInputInputFieldBorderRadius,
        componentInputInputFieldBackgroundColor,
        componentInputInputFieldBoxShadowFocus,
        componentInputInputFieldBorderBottomLeftRadius,
        componentInputInputFieldBorderBottomRightRadius,
        componentInputInputColor,
        componentInputInputBorder,
        componentInputInputPadding,
        componentInputInputFontSize,
        componentInputInputTextAlign,
        componentInputInputBackgroundColor,
        componentInputInputHeight,
        componentInputInputBorderFocus,
        componentInputInputBackgroundColorReadOnly,
        componentInputInputColorReadOnly,
        componentInputInputBoxShadowReadOnly,
        componentInputInputBorderRadiusReadOnly,
        componentInputInputBackgroundColorReadOnlyHideToggle,
        componentInputHideToggleTransition,
        componentInputHideTogglePadding,
        componentInputHideToggleColorHover,
        componentInputErrorMessageColor,
        componentInputErrorMessageFontSize,
        componentInputErrorMessageTextAlign,
        componentInputErrorMessageMarginTop,
        componentListContainerTemplateColumns,
        componentListContainerTemplateRows,
        componentListContainerGap,
        componentListItemBackgroundColor,
        componentListItemBorderRadius,
        componentListItemPadding,
        componentListBulletMarginLeft,
        componentListBulletMarginRight,
        componentListBulletFontWeight,
        componentListIconMarginLeft,
        componentListIconMarginRight,
        componentListIconColor,
        componentListClickableBackgroundColorHover,
        componentListClickableColorHover,
        componentListClickableIconColorHover,
        componentListClickableBullerColorHover,
        componentSelectContainerBackgroundColor,
        componentSelectContainerBorderRadius,
        componentSelectContainerPadding,
        componentSelectSelectBorder,
        componentSelectSelectBorderRadius,
        componentSelectSelectFontSize,
        componentSelectSelectPadding,
        componentSelectSelectColor,
        componentSelectSelectOutline,
        componentTableTableBorderRadius,
        componentTableTableBorderSpacing,
        componentTableTHeadBackgroundColor,
        componentTableTHeadColor,
        componentTableTHeadThFirstChildBorderTopLeftRadius,
        componentTableTHeadThFirstChildBorderBottomLeftRadius,
        componentTableTHeadThLastChildBorderTopRightRadius,
        componentTableTHeadThLastChildBorderBottomRightRadius,
        componentTableTHeadThBackgroundColorHover,
        componentTableTrBorderBottomLastChild,
        componentTableTrBackgroundColorNthChild,
        componentTableThTdMargin,
        componentTableThTdPadding,
        componentTableThTdTextAlign,
        componentTableTdMaxWidth,
        componentTableTBodyTrColorHover,
        componentTableTBodyTrBackgroundColorHover,
        componentTableThTdBorderRightLastChild,
        componentTableTdFirstChildBorderTopLeftRadius,
        componentTableTdFirstChildBorderBottomLeftRadius,
        componentTableTdLastChildBorderTopRightRadius,
        componentTableTdLastChildBorderBottomRightRadius,
        componentTimePickerContainerBackgroundColor,
        componentTimePickerContainerBorderRadius,
        componentTimePickerContainerPadding,
        componentTimePickerTimeContainerMarginLeft,
        componentTimePickerTimeContainerMaxWidth,
        componentTimePickerTimeContainerWidth,
        componentTimePickerSelectedTimeColor,
        componentTimePickerSelectedTimeBorderRadius,
        componentTimePickerSelectedTimeOutline,
        componentTimePickerSelectedTimeTextAlign,
        componentTimePickerSelectedTimeBorder,
        componentTimePickerSelectedTimePadding,
        componentTimePickerSelectedTimeFontSize,
        componentTimePickerSelectedTimeBackgroundColor,
        componentTimePickerSelectedTimeColorHover,
        componentTimePickerSelectedTimeBackgroundColorHover,
        componentTimePickerSelectedTimeTransitionHover,
        componentTimePickerTimePickerColor,
        componentTimePickerTimePickerBorder,
        componentTimePickerTimePickerPadding,
        componentTimePickerTimePickerFontSize,
        componentTimePickerTimePickerOutline,
        componentTimePickerTimePickerBorderRadius,
        componentTimePickerTimePickerBackgroundColor,
        componentTimePickerTimePickerMarginTop,
        componentTimePickerBoundariesInfoColor,
        componentTimePickerBoundariesInfoJustifyContent,
        componentTimePickerBoundariesInfoPaddingRight,
        componentTimePickerBoundariesInfoMarginTop,
        componentTimePickerBoundariesInfoFontSize,
        componentTimePickerHoursGrid24TemplateColumns,
        componentTimePickerHoursGrid24Gap,
        componentTimePickerHoursGrid24AutoRows,
        componentTimePickerHoursGrid24MarginTop,
        componentTimePickerHoursGridAMPMTemplateColumns,
        componentTimePickerHoursGridAMPMGap,
        componentTimePickerHoursGridAMPMAutoRows,
        componentTimePickerHoursGridAMPMMarginTop,
        componentTimePickerMinutesGridTemplateColumns,
        componentTimePickerMinutesGridGap,
        componentTimePickerMinutesGridAutoRows,
        componentTimePickerMinutesGridMarginTop,
        componentTimePickerIsSelectablePadding,
        componentTimePickerIsSelectableBorderRadius,
        componentTimePickerIsSelectableColor,
        componentTimePickerIsSelectableColorHover,
        componentTimePickerIsSelectableBackgroundColorHover,
        componentTimePickerIsSelectableTransitionHover,
        componentTimePickerIsNotSelectableColor,
        componentTimePickerDaySelectedColor,
        componentTimePickerDaySelectedBackgroundColor,
        componentTimePickerOutOfBoundsColor,
        componentTimePickerCancelBtnBackgroundColor,
        componentTimePickerCancelBtnColor,
        componentTimePickerCancelBtnBackgroundColorHover,
        componentTimePickerCancelBtnColorHover,
        componentTimePickerPreviousBtnBackgroundColor,
        componentTimePickerPreviousBtnColor,
        componentTimePickerPreviousBtnBackgroundColorHover,
        componentTimePickerPreviousBtnColorHover,
        componentTimePickerNextBtnBackgroundColor,
        componentTimePickerNextBtnColor,
        componentTimePickerNextBtnBackgroundColorHover,
        componentTimePickerNextBtnColorHover,
    }

}
