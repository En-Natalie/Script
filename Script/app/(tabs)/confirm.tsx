import { ThemedImage } from '@/components/themed-image';
import { ThemedView } from '@/components/themed-view';
import { Header } from '@/components/ui/header';
import { ImageBoxConfirm } from '@/components/ui/image-box-confirm';
import { ImageBoxView } from '@/components/ui/image-box-view';
import { ScrollView } from 'react-native';
import {Fragment, useState} from "react";
import {useRouter} from "expo-router";
import {ImageBoxInput} from "@/components/ui/image-box-input";

type ImageCBuilder = {
    url: string;
    id: number;
    width: number;
    height: number;
    description: string;
}

export default function InputScreen() {
    const [images, setImages] = useState<ImageCBuilder[]>([
        {
            url: '@/assets/images/favicon.png',
            id: 0,
            width: 100,
            height: 100,
            description: "description 12"
        }
    ]);
    const [nextId, setNextId] = useState<number>(100); // TODO update num

    /**
     * Passed to remove buttons of ImageBoxInputs, remove image with a given id
     * @param id id of triggering ImageBoxInput, the one to be removed
     */
    const handleRemove = (id: number) => {
        const newImages = images.filter((ib => ib.id !== id));
        setImages(newImages);
    }

    const imageBoxes = images.map(ib =>
        <Fragment key={ib.id}>
            <ImageBoxConfirm
                id={ib.id}
                url={ib.url}
                width={ib.width}
                height={ib.height}
                onRemoveButtonPress={handleRemove}
                description={ib.description}>
            </ImageBoxConfirm>
        </Fragment>
    );

    return (
        <ScrollView stickyHeaderIndices={[0]}>
            <Header title='Confirm' backPath='/home'></Header>
            <ThemedView color='background'>
            
                {imageBoxes}

            </ThemedView>
        </ScrollView>
    )
}