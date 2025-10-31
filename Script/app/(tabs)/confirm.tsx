import { ThemedImage } from '@/components/themed-image';
import { ThemedView } from '@/components/themed-view';
import { Header } from '@/components/ui/header';
import { ImageBoxConfirm } from '@/components/ui/image-box-confirm';
import { ScrollView } from 'react-native';

export default function InputScreen() {
    return (
        <ScrollView stickyHeaderIndices={[0]}>
            <Header title='Confirm'></Header>
            <ThemedView color='background'>
            
                {/* images */}
                <ImageBoxConfirm>
                       <ThemedImage/>
                </ImageBoxConfirm>
                <ImageBoxConfirm>
                    <ThemedImage/>
                </ImageBoxConfirm>

            </ThemedView>
        </ScrollView>
    )
}