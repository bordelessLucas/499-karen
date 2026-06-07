import { Image, View, type ImageStyle, type StyleProp } from 'react-native'
import { summusLogoImage } from '@/constants/summus-brand'

type SummusLogoProps = {
  compact?: boolean
  variant?: 'full' | 'icon'
  style?: StyleProp<ImageStyle>
}

const sizeByVariant = {
  full: { compact: { width: 128, height: 128 }, default: { width: 160, height: 160 } },
  icon: { compact: { width: 36, height: 36 }, default: { width: 44, height: 44 } },
} as const

export function SummusLogo({ compact = false, variant = 'full', style }: SummusLogoProps) {
  const dimensions = sizeByVariant[variant][compact ? 'compact' : 'default']

  return (
    <View className="items-start justify-center">
      <Image
        source={summusLogoImage}
        accessibilityLabel="Summus Edge"
        resizeMode="contain"
        style={[{ width: dimensions.width, height: dimensions.height }, style]}
      />
    </View>
  )
}
