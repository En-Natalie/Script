import { SymbolView, SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { StyleProp, ViewStyle } from 'react-native';
import { Colors } from '@/constants/theme';

export type IconSymbolProps = {
  name: string;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}

export function IconSymbol({ name, size = 24, color = Colors.default.text, style, weight = 'regular' }: IconSymbolProps) {

  const sanFranciscoName = name as SymbolViewProps['name'];

  return (
    <SymbolView
      weight={weight}
      tintColor={color}
      resizeMode="scaleAspectFit"
      name={sanFranciscoName}
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
    />
  );
}
