import { Image } from 'react-native';

export type ThemedImageProps = {
  url: string;
};

export function ThemedImage() {
    return (
        <Image
        style={{
            borderWidth: 2,
            borderColor: '#000',
            borderRadius: 10,
        }}
        source={require('@/assets/images/partial-react-logo.png')}
        />
    );
}