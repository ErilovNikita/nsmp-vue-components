import type { NsmpThemeProperties } from '@/utils'
import { compact, fontWeightToNumber, pxToNumber } from './tokenUtils'

export const createComponentTokens = (theme?: NsmpThemeProperties) => ({
  Button: compact({
    colorPrimary: theme?.buttonBackground,
    colorPrimaryHover: theme?.buttonHoverBackground,
    colorPrimaryActive: theme?.buttonActiveBackground,
    colorPrimaryText: theme?.buttonTextColor,
    colorPrimaryTextHover: theme?.buttonHoverTextColor,
    colorPrimaryTextActive: theme?.buttonActiveTextColor,
    defaultColor: theme?.advlistButtonTextColor,
    defaultBg: theme?.advlistButtonBackground,
    defaultHoverColor: theme?.advlistButtonHoverTextColor,
    defaultHoverBg: theme?.advlistButtonHoverBackground,
    defaultActiveColor: theme?.advlistButtonActiveTextColor,
    defaultActiveBg: theme?.advlistButtonActiveBackground,
    fontSize: pxToNumber(theme?.buttonFontSize),
    fontWeight: fontWeightToNumber(theme?.buttonFontWeight),
    borderRadius: pxToNumber(theme?.inputRadius),
  }),

  Input: compact({
    colorBgContainer: theme?.inputBackground,
    colorBgContainerDisabled: theme?.inputDisabledBackground,
    colorText: theme?.inputTextColor,
    colorTextDisabled: theme?.disabledTextColor,
    activeBorderColor: theme?.inputFocusBorderColor,
    hoverBorderColor: theme?.inputFocusBorderColor,
    controlHeight: pxToNumber(theme?.inputHeight),
    paddingInline: pxToNumber(theme?.inputPaddingLeft),
    borderRadius: pxToNumber(theme?.inputRadius),
  }),

  InputNumber: compact({
    colorBgContainer: theme?.inputBackground,
    colorBgContainerDisabled: theme?.inputDisabledBackground,
    colorText: theme?.inputTextColor,
    colorTextDisabled: theme?.disabledTextColor,
    activeBorderColor: theme?.inputFocusBorderColor,
    hoverBorderColor: theme?.inputFocusBorderColor,
    controlHeight: pxToNumber(theme?.inputHeight),
    borderRadius: pxToNumber(theme?.inputRadius),
  }),

  DatePicker: compact({
    colorBgContainer: theme?.inputBackground,
    colorBgContainerDisabled: theme?.inputDisabledBackground,
    colorText: theme?.inputTextColor,
    colorTextDisabled: theme?.disabledTextColor,
    activeBorderColor: theme?.inputFocusBorderColor,
    hoverBorderColor: theme?.inputFocusBorderColor,
    controlHeight: pxToNumber(theme?.inputHeight),
    borderRadius: pxToNumber(theme?.inputRadius),
  }),

  Select: compact({
    colorBgContainer: theme?.inputBackground,
    colorBgElevated: theme?.menuPopupBackground,
    colorText: theme?.inputTextColor,
    colorBorder: theme?.borderColor,
    optionSelectedBg: theme?.itemSelectedBackground,
    optionActiveBg: theme?.popupSelectItemHoverBackground,
    controlHeight: pxToNumber(theme?.inputHeight),
    borderRadius: pxToNumber(theme?.inputRadius),
  }),

  Table: compact({
    colorText: theme?.tableTextColor,
    colorBorderSecondary: theme?.rowBorderColor,
    headerColor: theme?.tableHeaderColor,
    headerBg: theme?.panelBackground,
    rowHoverBg: theme?.tableRowBackgroundHover,
    rowSelectedBg: theme?.tableRowSelectedBackground,
    rowSelectedHoverBg: theme?.tableRowSelectedBackground,
    borderColor: theme?.rowBorderColor,
    fontSize: pxToNumber(theme?.tableHeaderFontSize),
  }),

  Tabs: compact({
    itemColor: theme?.tabLinkColor,
    itemSelectedColor: theme?.activeTabColor,
    itemHoverColor: theme?.tabActionLinkHoverColor,
    itemActiveColor: theme?.activeTabColor,
    inkBarColor: theme?.accentColor,
  }),

  Menu: compact({
    itemColor: theme?.leftMenuItemTextColor,
    itemBg: theme?.leftMenuBackground,
    itemHoverColor: theme?.leftMenuItemTextColor,
    itemHoverBg: theme?.defaultHoverBackground,
    itemSelectedColor: theme?.accentColor,
    itemSelectedBg: theme?.itemSelectedBackground,
    popupBg: theme?.menuPopupBackground,
  }),
})
