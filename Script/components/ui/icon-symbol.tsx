// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';
import { Colors } from '@/constants/theme';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

export type IconSymbolProps = {
  name: IconSymbolName;
  size?: number;
  color?: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': 'home', // home

  'arrow.left': 'arrow-left',
  'arrow.right': 'arrow-right',

  'sparkle': 'speaker', // generate ID
  'sparkles': 'speaker', // generate ID
  'doc.text.magnifyingglass': 'manage-history', // view history
  'star': 'star', // credits
  'star.fill': 'star', // credits

  'doc.on.clipboard': 'content-paste', // paste // TODO
  'paperclip': 'file-open', // open files // TODO
  'photo.fill.on.rectangle.fill': 'image', // gallery // TODO

  'hand.thumbsup.fill': 'thumb-up', // approve
  'trash.fill': 'star', // remove // TODO

  'repeat': 'repeat', // regenerate id
  'pencil.tip.crop.circle.badge.plus': 'edit', // edit id

  'square.and.arrow.down': 'save', // save image

  'exclamationmark.circle': 'star' // warning // TODO
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({ name, size = 24, color = Colors.default.text, style }: IconSymbolProps) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
