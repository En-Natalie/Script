import { Colors, Constants } from '@/constants/theme';
import { Image, ImageProps } from 'react-native';

export type ThemedImageProps = {
  url?: string;
};

export function ThemedImage({url = '@/assets/images/favicon.png', style}: ThemedImageProps & ImageProps) {
    return (
        <Image
        style={[{
            borderWidth: Constants.default.outlineWidth,
            borderColor: Colors.default.border,
            borderRadius: Constants.default.borderRadius,
            flex: 1,
            resizeMode: 'cover',
            width: '100%',
        }, style]}
        source={require('@/assets/images/favicon.png')} // TODO 
        />
    );
}