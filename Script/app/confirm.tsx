import { currentUsername } from "@/app/index";
import { globalImages } from "@/app/input";
import { ThemedView } from '@/components/themed-view';
import { Header } from '@/components/ui/header';
import { ImageBoxConfirm } from '@/components/ui/image-box-confirm';
import { Colors } from "@/constants/theme";
import { storeImage } from "@/functionality/data-storage";
// Use the legacy FileSystem API to avoid deprecation warnings and support readAsStringAsync
import * as FileSystem from 'expo-file-system/legacy';
import { useRouter } from "expo-router";
import { Fragment, useEffect, useState } from "react";
import { ScrollView } from 'react-native';

/**
 * The information necessary to show an image on the confirm screen.
 */
export type ImageCBuilder = {
    uri: string;
    id: number;
    width: number;
    height: number;
    description: string;
}

export let acceptedImages: ImageCBuilder[] = [];
export function resetAcceptedImages(): void {
    acceptedImages = [];
}

export default function ConfirmScreen() {
    const CLOUD_NAME = 'script-cs';
    const UPLOAD_PRESET = 'default_upload';

    const uploadToCloudinary = async (uri: string, description: string) => {
        console.log('uploading to cloudinary (direct unsigned REST API)...');
        try {
            // prepare file as data URI
            let fileDataUri = uri;
            if (uri.startsWith('file://')) {
                const b64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
                // assume jpeg if not specified; Cloudinary can detect format
                fileDataUri = `data:image/jpeg;base64,${b64}`;
            }

            const fd: any = new FormData();
            fd.append('file', fileDataUri);
            fd.append('upload_preset', UPLOAD_PRESET);
            // attach simple context metadata
            fd.append('context', `username=${currentUsername}|description=${description}`);

            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
                method: 'POST',
                body: fd,
            });
            const json = await res.json();
            console.log('cloudinary upload response:', json);
            if (json.error) {
                console.error('Cloudinary upload error:', json.error);
                return;
            }
            // store result in local DB
            storeImage(currentUsername, json.public_id, description, json.width, json.height);
        } catch (err) {
            console.error('uploadToCloudinary failed:', err);
        }
    }

    const router = useRouter();

    const [images, setImages] = useState<ImageCBuilder[]>([{ // a temp loading image
        uri: '@/assets/images/favicon.png',
        id: 0,
        width: 100,
        height: 50,
        description: "Loading..."
    }]);

    /**
     *
     */
    useEffect(() => {
        (async () => {
            // If no images, navigate back as before
            if (globalImages.length === 0) {
                router.back();
                router.replace('/results' as any);
                return;
            }

            // Images now have pre-populated descriptions from input.tsx
            // Convert to ImageCBuilder format for display
            const converted: ImageCBuilder[] = globalImages.map(i => ({
                uri: i.uri,
                id: i.id,
                width: i.width,
                height: i.height,
                description: i.description ?? 'No description'
            }));

            console.log(converted);
            setImages(converted);
        })();

        // converted is scoped inside the async IIFE above; early navigation is handled there.
    }, [setImages]);

    const handleAccept = (id: number, updatedDescription: string) => {
        const acceptedImage = images.find(i => i.id === id);
        if (acceptedImage) {
            console.log("accepted image found!");
            acceptedImage.description = updatedDescription;
            acceptedImages.push(acceptedImage);
            uploadToCloudinary(acceptedImage.uri, updatedDescription);
        }
        else {
            console.log("accepted image NOT found :(");
        }
        handleRemove(id);
    }

    /**
     * Passed to remove buttons of ImageBoxInputs, remove image with a given id
     * @param id id of triggering ImageBoxInput, the one to be removed
     */
    const handleRemove = (id: number) => {
        const newImages = images.filter((ib => ib.id !== id));
        setImages(newImages);
        if (newImages.length === 0) { // images is not updated at this time (state updating called as queue), must use newImages
            router.back();
            router.replace('/results' as unknown as any);
        }
    }

    /**
     * ImageBoxConfirms to be displayed on the confirm screen.
     */
    const imageBoxes = images.map(ib =>
        <Fragment key={ib.id}>
            <ImageBoxConfirm
                id={ib.id}
                uri={ib.uri}
                width={ib.width}
                height={ib.height}
                onAcceptButtonPress={handleAccept}
                onRemoveButtonPress={handleRemove}
                description={ib.description}>
            </ImageBoxConfirm>
        </Fragment>
    );

    return (
        <ScrollView stickyHeaderIndices={[0]} automaticallyAdjustKeyboardInsets={true} style={{backgroundColor: Colors.default.background}}>
            <Header title='Confirm' backPath='/home'></Header>
            <ThemedView color='background'>

                {imageBoxes}

            </ThemedView>
        </ScrollView>
    )
}