import { Colors, Constants } from '@/constants/theme';
import { Image, ImageProps } from 'react-native';

export type ThemedImageProps = {
    uri: string;
    width: number;
    height: number;
};

export function ThemedImage({uri, width, height, style}: ThemedImageProps & ImageProps) {
    const aspectRatio = width / height;

    return (
        <Image
        style={[{
            borderWidth: Constants.default.outlineWidth,
            borderColor: Colors.default.border,
            borderRadius: Constants.default.borderRadius,
            flex: 1,
            resizeMode: 'cover',
            width: '100%',
            aspectRatio: aspectRatio,
        }, style]}
        // source={require('@/assets/images/favicon.png')} // alternate method,
        source={{ uri: uri }}
        />
    );
}