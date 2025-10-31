import { Image, ImageProps } from 'react-native';

export type ThemedImageProps = {
  url?: string;
};

export function ThemedImage({url = '@/assets/images/favicon.png', style}: ThemedImageProps & ImageProps) {
    return (
        <Image
        style={[{
            borderWidth: 2,
            borderColor: '#000',
            borderRadius: 10,
            flex: 1,
            resizeMode: 'cover',
            width: '100%',
        }, style]}
        source={require('@/assets/images/favicon.png')} // TODO 
        />
    );
}