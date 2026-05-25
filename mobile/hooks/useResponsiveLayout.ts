import { Platform, useWindowDimensions } from 'react-native'

const DESKTOP_BREAKPOINT = 1024
const TABLET_BREAKPOINT = 768

export function useResponsiveLayout() {
  const { width, height } = useWindowDimensions()
  const isWeb = Platform.OS === 'web'
  const isWebDesktop = isWeb && width >= DESKTOP_BREAKPOINT
  const isWebTablet = isWeb && width >= TABLET_BREAKPOINT && width < DESKTOP_BREAKPOINT
  const isWebMobile = isWeb && width < TABLET_BREAKPOINT

  return {
    width,
    height,
    isWeb,
    isWebDesktop,
    isWebTablet,
    isWebMobile,
  }
}
