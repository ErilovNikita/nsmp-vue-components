import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context'

export const blue: ThemeConfig = {
  components: {
    Button: {
      colorPrimary: '#7f96b9',
      colorPrimaryHover: '#556e95',
      colorPrimaryActive: '#3b4b63',
      colorPrimaryText: '#fff',
      colorPrimaryTextHover: '#fff',
      colorPrimaryTextActive: '#fff',
      fontSize: 13,
      borderRadius: 2,
    },

    Checkbox: {
      lineHeight: 1,
      colorPrimary: '#0063b0',
      colorPrimaryHover: '#0063b0',
    },

    Input: {
      colorBgContainer: '#fff',
      colorBgContainerDisabled: '#fafafa',
      colorText: '#323232',
      colorTextDisabled: '#999',
      borderRadius: 2,
    },

    Select: {
      colorBgContainer: '#fff',
      colorBgElevated: '#fff',
      colorText: '#323232',
      colorBorder: '#c0c0c0',
      controlHeight: 32,
      borderRadius: 2,
    },

    Table: {
      colorText: '#323232',
      colorBorderSecondary: '#d9d9d9',
    },
  },

  token: {
    // Primary
    colorPrimary: '#7f96b9',
    colorPrimaryHover: '#0063b0',
    colorPrimaryActive: '#3b4b63',
    colorPrimaryBg: '#E1E7EF',
    colorPrimaryBgHover: '#ecf3fb',
    colorPrimaryBorder: '#7F96B9',
    colorPrimaryBorderHover: '#7f96b9',
    colorPrimaryText: '#7f96b9',
    colorPrimaryTextHover: '#5f5f5f',
    colorPrimaryTextActive: '#7f96b9',

    // Success
    colorSuccess: '#94d1ad',
    colorSuccessHover: '#94d1ad',
    colorSuccessActive: '#94d1ad',
    colorSuccessBg: '#edf7f1',
    colorSuccessBgHover: '#edf7f1',
    colorSuccessBorder: '#94d1ad',
    colorSuccessBorderHover: '#94d1ad',
    colorSuccessText: '#94d1ad',
    colorSuccessTextHover: '#94d1ad',
    colorSuccessTextActive: '#94d1ad',

    // Warning
    colorWarning: '#d9bf8c',
    colorWarningHover: '#c69f53',
    colorWarningActive: '#c69f53',
    colorWarningBg: '#fff8e5',
    colorWarningBgHover: '#ebdfc2',
    colorWarningBorder: '#edd69a',
    colorWarningBorderHover: '#edd69a',
    colorWarningText: '#c69f53',
    colorWarningTextHover: '#c69f53',
    colorWarningTextActive: '#c69f53',

    // Error
    colorError: '#e08a85',
    colorErrorHover: '#e08a85',
    colorErrorActive: '#e08a85',
    colorErrorBg: '#faeceb',
    colorErrorBgHover: '#ffe4e4',
    colorErrorBorder: '#e08a85',
    colorErrorBorderHover: '#e08a85',
    colorErrorText: '#e08a85',
    colorErrorTextHover: '#e08a85',
    colorErrorTextActive: '#e08a85',

    // Text
    colorText: '#323232',
    colorTextSecondary: '#5f5f5f',
    colorTextTertiary: '#999',
    colorTextQuaternary: '#999',
    colorTextDisabled: '#999',
    colorTextHeading: '#323232',
    colorTextLabel: '#5f5f5f',
    colorTextDescription: '#5f5f5f',
    colorTextLightSolid: '#fff',
    colorTextPlaceholder: '#999',

    // Borders
    colorBorder: '#c0c0c0',
    colorBorderSecondary: '#d9d9d9',
    colorBorderBg: '#f4f4f4',
    colorSplit: '#f4f4f4',

    // Backgrounds
    colorBgContainer: '#fff',
    colorBgContainerDisabled: '#fafafa',
    colorBgLayout: '#eff3f8',
    colorBgElevated: '#fff',
    colorBgSpotlight: '#2a3f5a',

    // Fills
    colorFill: '#f4f4f4',
    colorFillSecondary: '#f2f2f2',
    colorFillTertiary: '#f4f4f4',
    colorFillQuaternary: '#f4f4f4',
    colorFillContent: '#f4f4f4',
    colorFillContentHover: '#ebebeb',
    colorFillAlter: '#f2f2f2',
    colorBgTextHover: '#ebebeb',
    colorBgTextActive: '#f4f4f4',

    // Controls
    controlOutline: '#0063b0',
    // controlItemBgHover: '#7f96b9',
    controlItemBgHover: '#f4f4f4',
    controlItemBgActive: '#f4f4f4',
    controlItemBgActiveHover: '#f4f4f4',
    controlItemBgActiveDisabled: '#fafafa',
    controlHeight: 32,
    controlHeightXS: 24,
    controlHeightSM: 24,
    controlPaddingHorizontal: 12,
    controlPaddingHorizontalSM: 12,

    // Geometry
    borderRadius: 2,
    borderRadiusXS: 2,
    borderRadiusSM: 2,
    borderRadiusLG: 2,
    borderRadiusOuter: 2,
    lineWidth: 1,
    lineWidthBold: 2,
    lineType: 'solid',

    // Typography
    fontFamily: "'Roboto', sans-serif",
    fontSize: 13,
    fontSizeSM: 13,
    fontWeightStrong: 700,

    // Shadows
    boxShadow: '0 4px 14px #899aa9',
    boxShadowSecondary: '0px 4px 16px rgba(95, 95, 95, 0.2)',
    boxShadowTertiary: '0 2px 8px rgba(129, 146, 161, 0.2)',

    // Motion and links
    motionDurationFast: '0.1s',
    motionDurationMid: '0.2s',
    motionDurationSlow: '0.3s',
    linkDecoration: 'none',
    linkHoverDecoration: 'none',
    linkFocusDecoration: 'none',
  },
}

export type NsmpTheme = ThemeConfig
