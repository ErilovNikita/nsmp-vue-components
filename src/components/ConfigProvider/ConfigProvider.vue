<script setup lang="ts">
import { computed } from 'vue'
import { ConfigProvider as AntConfigProvider } from 'ant-design-vue'
import { blue } from '@/tokens'
import type { ConfigProviderProps } from './types'

defineOptions({ name: 'LibraryConfigProvider' })

const props = defineProps<ConfigProviderProps>()

type TokenRecord = Record<string, unknown>

const pxToNumber = (value?: string): number | undefined => {
  if (!value) {
    return undefined
  }

  const parsed = Number.parseFloat(value)

  return Number.isFinite(parsed) ? parsed : undefined
}

const fontWeightToNumber = (value?: string): number | undefined => {
  if (!value) {
    return undefined
  }

  const normalizedWeights: Record<string, number> = {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  }

  return normalizedWeights[value.toLowerCase()] ?? pxToNumber(value)
}

const compact = <T extends TokenRecord>(tokens: T): Partial<T> =>
  Object.fromEntries(
    Object.entries(tokens).filter(([, value]) => value !== undefined),
  ) as Partial<T>

const providerProps = computed(() => {
  const { nsmpTheme, theme, ...rest } = props

  const nsmpTokens = compact({
    // Primary
    colorPrimary: nsmpTheme?.accentColor,
    colorPrimaryHover: nsmpTheme?.topMenuButtonHoverBackground,
    colorPrimaryActive: nsmpTheme?.buttonActiveBackground,
    colorPrimaryBg: nsmpTheme?.autoInsertValueColor,
    colorPrimaryBgHover: nsmpTheme?.metaClassHoverBackground,
    colorPrimaryBorder: nsmpTheme?.autoInsertBorderColor,
    colorPrimaryBorderHover: nsmpTheme?.accentColor,
    colorPrimaryText: nsmpTheme?.accentColor,
    colorPrimaryTextHover: nsmpTheme?.contentHeaderActionLinkHoverColor,
    colorPrimaryTextActive: nsmpTheme?.workflowSelectedStateColor,

    // Success
    colorSuccess: nsmpTheme?.messageActionSuccessColor,
    colorSuccessHover: nsmpTheme?.messageActionSuccessColor,
    colorSuccessActive: nsmpTheme?.messageActionSuccessColor,
    colorSuccessBg: nsmpTheme?.messageActionSuccessBackground,
    colorSuccessBgHover: nsmpTheme?.messageActionSuccessBackground,
    colorSuccessBorder: nsmpTheme?.messageActionSuccessColor,
    colorSuccessBorderHover: nsmpTheme?.messageActionSuccessColor,
    colorSuccessText: nsmpTheme?.messageActionSuccessColor,
    colorSuccessTextHover: nsmpTheme?.messageActionSuccessColor,
    colorSuccessTextActive: nsmpTheme?.messageActionSuccessColor,

    // Warning
    colorWarning: nsmpTheme?.messageWarningColor,
    colorWarningHover: nsmpTheme?.messageWarningButtonColor,
    colorWarningActive: nsmpTheme?.messageWarningButtonColor,
    colorWarningBg: nsmpTheme?.messageWarningBackground,
    colorWarningBgHover: nsmpTheme?.systemNotificationBackgroundColorHover,
    colorWarningBorder: nsmpTheme?.systemNotificationBorderColor,
    colorWarningBorderHover: nsmpTheme?.pushNotificationBorderColor,
    colorWarningText: nsmpTheme?.messageWarningButtonColor,
    colorWarningTextHover: nsmpTheme?.messageWarningButtonColor,
    colorWarningTextActive: nsmpTheme?.messageWarningButtonColor,

    // Error
    colorError: nsmpTheme?.messageErrorColor,
    colorErrorHover: nsmpTheme?.messageErrorColor,
    colorErrorActive: nsmpTheme?.messageErrorColor,
    colorErrorBg: nsmpTheme?.messageErrorBackground,
    colorErrorBgHover: nsmpTheme?.transitionMatrixErrorCellBackground,
    colorErrorBorder: nsmpTheme?.messageErrorColor,
    colorErrorBorderHover: nsmpTheme?.messageErrorColor,
    colorErrorText: nsmpTheme?.messageErrorColor,
    colorErrorTextHover: nsmpTheme?.messageErrorColor,
    colorErrorTextActive: nsmpTheme?.messageErrorColor,

    // Text
    colorText: nsmpTheme?.textColor,
    colorTextSecondary: nsmpTheme?.secondaryTextColor,
    colorTextTertiary: nsmpTheme?.environmentObjectColor,
    colorTextQuaternary: nsmpTheme?.disabledTextColor,
    colorTextDisabled: nsmpTheme?.disabledTextColor,
    colorTextHeading: nsmpTheme?.blockTitleColor,
    colorTextLabel: nsmpTheme?.attrTitleColor,
    colorTextDescription: nsmpTheme?.infoPanelTextColor,
    colorTextLightSolid: nsmpTheme?.buttonTextColor,
    colorTextPlaceholder: nsmpTheme?.environmentObjectColor,

    // Borders
    colorBorder: nsmpTheme?.borderColor,
    colorBorderSecondary: nsmpTheme?.rowBorderColor,
    colorBorderBg: nsmpTheme?.rowBorderColorLight,
    colorSplit: nsmpTheme?.rowBorderColorLight,

    // Backgrounds
    colorBgContainer: nsmpTheme?.contentBackground,
    colorBgContainerDisabled: nsmpTheme?.inputDisabledBackground,
    colorBgLayout: nsmpTheme?.baseBackground,
    colorBgElevated: nsmpTheme?.menuPopupBackground,
    colorBgSpotlight: nsmpTheme?.popupHeaderBackgroundColor,

    // Fills
    colorFill: nsmpTheme?.itemSelectedBackground,
    colorFillSecondary: nsmpTheme?.panelBackground,
    colorFillTertiary: nsmpTheme?.infoPanelBackground,
    colorFillQuaternary: nsmpTheme?.rowBorderColorLight,
    colorFillContent: nsmpTheme?.itemSelectedBackground,
    colorFillContentHover: nsmpTheme?.defaultHoverBackground,
    colorFillAlter: nsmpTheme?.panelBackground,

    // Interactive controls
    colorBgTextHover: nsmpTheme?.defaultHoverBackground,
    colorBgTextActive: nsmpTheme?.itemSelectedBackground,
    controlOutline: nsmpTheme?.inputFocusBorderColor,
    // controlItemBgHover: nsmpTheme?.selectItemHoverBackground,
    controlItemBgActive: nsmpTheme?.itemSelectedBackground,
    controlItemBgActiveHover: nsmpTheme?.tableRowSelectedBackground,
    controlItemBgActiveDisabled: nsmpTheme?.inputDisabledBackground,

    // Geometry
    borderRadius: pxToNumber(nsmpTheme?.inputRadius),
    borderRadiusXS: pxToNumber(nsmpTheme?.inputRadius),
    borderRadiusSM: pxToNumber(nsmpTheme?.inputRadius),
    borderRadiusLG: pxToNumber(nsmpTheme?.inputRadius),
    borderRadiusOuter: pxToNumber(nsmpTheme?.inputRadius),

    lineWidth: 1,
    lineWidthBold: 2,
    lineType: 'solid',

    // controlHeight: pxToNumber(nsmpTheme?.inputHeight),
    // controlHeightXS: pxToNumber(nsmpTheme?.buttonHeight),
    // controlHeightSM: pxToNumber(nsmpTheme?.buttonHeight),

    // Typography
    fontSize: pxToNumber(nsmpTheme?.buttonFontSize),
    fontSizeSM: pxToNumber(nsmpTheme?.buttonFontSize),
    fontFamily: nsmpTheme?.baseFont,
    fontWeightStrong: fontWeightToNumber(nsmpTheme?.buttonFontWeight),

    // Spacing
    controlPaddingHorizontal: pxToNumber(nsmpTheme?.inputPaddingLeft),
    controlPaddingHorizontalSM: pxToNumber(nsmpTheme?.inputPaddingLeft),

    // Shadows
    boxShadow: nsmpTheme?.darkShadow,
    boxShadowSecondary: nsmpTheme?.lightShadow,
    boxShadowTertiary: nsmpTheme?.lightShortShadow,

    // Motion
    motionDurationFast: '0.1s',
    motionDurationMid: '0.2s',
    motionDurationSlow: '0.3s',

    // Links
    linkDecoration: 'none',
    linkHoverDecoration: 'none',
    linkFocusDecoration: 'none',
  })

  const nsmpComponents = {
    Button: compact({
      colorPrimary: nsmpTheme?.buttonBackground,
      colorPrimaryHover: nsmpTheme?.buttonHoverBackground,
      colorPrimaryActive: nsmpTheme?.buttonActiveBackground,

      colorPrimaryText: nsmpTheme?.buttonTextColor,
      colorPrimaryTextHover: nsmpTheme?.buttonHoverTextColor,
      colorPrimaryTextActive: nsmpTheme?.buttonActiveTextColor,

      defaultColor: nsmpTheme?.advlistButtonTextColor,
      defaultBg: nsmpTheme?.advlistButtonBackground,
      defaultHoverColor: nsmpTheme?.advlistButtonHoverTextColor,
      defaultHoverBg: nsmpTheme?.advlistButtonHoverBackground,
      defaultActiveColor: nsmpTheme?.advlistButtonActiveTextColor,
      defaultActiveBg: nsmpTheme?.advlistButtonActiveBackground,

      // controlHeight: pxToNumber(nsmpTheme?.buttonHeight),
      fontSize: pxToNumber(nsmpTheme?.buttonFontSize),
      fontWeight: fontWeightToNumber(nsmpTheme?.buttonFontWeight),
      borderRadius: pxToNumber(nsmpTheme?.inputRadius),
    }),

    Input: compact({
      colorBgContainer: nsmpTheme?.inputBackground,
      colorBgContainerDisabled: nsmpTheme?.inputDisabledBackground,
      colorText: nsmpTheme?.inputTextColor,
      colorTextDisabled: nsmpTheme?.disabledTextColor,
      activeBorderColor: nsmpTheme?.inputFocusBorderColor,
      hoverBorderColor: nsmpTheme?.inputFocusBorderColor,
      controlHeight: pxToNumber(nsmpTheme?.inputHeight),
      paddingInline: pxToNumber(nsmpTheme?.inputPaddingLeft),
      borderRadius: pxToNumber(nsmpTheme?.inputRadius),
    }),

    Select: compact({
      colorBgContainer: nsmpTheme?.inputBackground,
      colorBgElevated: nsmpTheme?.menuPopupBackground,
      colorText: nsmpTheme?.inputTextColor,
      colorBorder: nsmpTheme?.borderColor,
      optionSelectedBg: nsmpTheme?.itemSelectedBackground,
      optionActiveBg: nsmpTheme?.popupSelectItemHoverBackground,
      controlHeight: pxToNumber(nsmpTheme?.inputHeight),
      borderRadius: pxToNumber(nsmpTheme?.inputRadius),
    }),

    Table: compact({
      colorText: nsmpTheme?.tableTextColor,
      colorBorderSecondary: nsmpTheme?.rowBorderColor,
      headerColor: nsmpTheme?.tableHeaderColor,
      headerBg: nsmpTheme?.panelBackground,
      rowHoverBg: nsmpTheme?.tableRowBackgroundHover,
      rowSelectedBg: nsmpTheme?.tableRowSelectedBackground,
      rowSelectedHoverBg: nsmpTheme?.tableRowSelectedBackground,
      borderColor: nsmpTheme?.rowBorderColor,
      fontSize: pxToNumber(nsmpTheme?.tableHeaderFontSize),
    }),

    Tabs: compact({
      itemColor: nsmpTheme?.tabLinkColor,
      itemSelectedColor: nsmpTheme?.activeTabColor,
      itemHoverColor: nsmpTheme?.tabActionLinkHoverColor,
      itemActiveColor: nsmpTheme?.activeTabColor,
      inkBarColor: nsmpTheme?.accentColor,
    }),

    Menu: compact({
      itemColor: nsmpTheme?.leftMenuItemTextColor,
      itemBg: nsmpTheme?.leftMenuBackground,
      itemHoverColor: nsmpTheme?.leftMenuItemTextColor,
      itemHoverBg: nsmpTheme?.defaultHoverBackground,
      itemSelectedColor: nsmpTheme?.accentColor,
      itemSelectedBg: nsmpTheme?.itemSelectedBackground,
      popupBg: nsmpTheme?.menuPopupBackground,
    }),
  }

  type ComponentName = keyof typeof nsmpComponents

  const mergeComponent = (componentName: ComponentName) => ({
    ...(blue.components?.[componentName] as TokenRecord | undefined),
    ...nsmpComponents[componentName],
    ...(theme?.components?.[componentName] as TokenRecord | undefined),
  })

  return {
    ...rest,

    theme: {
      ...blue,
      ...theme,

      token: {
        ...blue.token,
        ...nsmpTokens,
        ...theme?.token,
      },

      components: {
        ...blue.components,
        ...theme?.components,

        Button: mergeComponent('Button'),
        Input: mergeComponent('Input'),
      },
    },
  }
})
</script>

<template>
  <AntConfigProvider v-bind="providerProps">
    <slot />
  </AntConfigProvider>
</template>
