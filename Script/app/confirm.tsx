import { ThemedView } from '@/components/themed-view';
import { Header } from '@/components/ui/header';
import { ImageBoxConfirm } from '@/components/ui/image-box-confirm';
import { ScrollView} from 'react-native';
import { Fragment, useEffect, useState} from "react";
import { useRouter} from "expo-router";
import { globalImages } from "@/app/input";
import { upload, UploadApiOptions} from 'cloudinary-react-native';
import { Cloudinary } from '@cloudinary/url-gen';
import {Colors} from "@/constants/theme";

export type ImageCBuilder = {
    url: string;
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
    const cloudinary = new Cloudinary({
        cloud: {
            cloudName: "script-cs",
        },
        url: {
            secure: true
        }
    });

    const options: UploadApiOptions = {
        upload_preset: 'default_upload',
        unsigned: true,
        // image_metadata: true,
        metadata: {
            'username': 'high',
            'description': 'hello world' // TODO this isn't working properly
        },
    }

    const uploadToCloudinary = async (uri: string, description: string) => {
        console.log("uploading to cloudainary...");

        await upload(cloudinary, {
            file: uri ,
            options: options,
            callback: (error: any, response: any) => {
                console.log("error: " + error);
                console.log("response: " + response);
            }
        })

        console.log('done uploading!');

        upload(cloudinary,{ file: uri, options: options, callback: (error: any, response: any) => {
                on_success: "current_asset.update({ metadata: { rating: 'high', usage_types: ['web', 'print', 'social'] } })"
            }
        });
    }

    const router = useRouter();

    const [images, setImages] = useState<ImageCBuilder[]>([{ // a temp loading image
        url: '@/assets/images/favicon.png',
        id: 0,
        width: 100,
        height: 50,
        description: "Loading..."
    }]);

    useEffect(() => {
        const converted: ImageCBuilder[] = [];

        globalImages.forEach(i => converted.push({
            url: i.url,
            id: i.id,
            width: i.width,
            height: i.height,
            description: 'Insert image description here'})); // TODO call ai

        console.log(converted);
        setImages(converted);

        if (converted.length === 0) {
            router.navigate('/results')
        }
    }, [setImages]);

    const handleAccept = (id: number, updatedDescription: string) => {
        const acceptedImage = images.find(i => i.id === id);
        if (acceptedImage) {
            console.log("accepted image found!");
            acceptedImage.description = updatedDescription;
            acceptedImages.push(acceptedImage);
            uploadToCloudinary(acceptedImage.url, updatedDescription);
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
            router.navigate('/results');
        }
    }

    const imageBoxes = images.map(ib =>
        <Fragment key={ib.id}>
            <ImageBoxConfirm
                id={ib.id}
                url={ib.url}
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