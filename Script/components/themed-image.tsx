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
            width: '100%',
            height: 200, // TODO this is bad lmao
        }}
        source={require('@/assets/images/favicon.png')}
        />
    );
}