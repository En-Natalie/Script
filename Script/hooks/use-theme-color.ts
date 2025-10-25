/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useThemeColor (colorName: keyof typeof Colors.default) {
  const theme = 'default';
  return Colors[theme][colorName];
}