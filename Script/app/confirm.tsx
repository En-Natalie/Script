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
import {currentUsername} from "@/app/index";
import {storeImage} from "@/functionality/data-storage";

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
        metadata: 'username=rahh|description=green'
    }

    const uploadToCloudinary = async (uri: string, description: string) => {
        console.log("uploading to cloudainary...");

        options.metadata = 'username=' + currentUsername + '|description=' + description;

        await upload(cloudinary, {
            file: uri,
            options: options,
            callback: (error: any, response: any) => {
                console.log("error: " + error);
                console.log("response: " + response);
                console.log("response stringify " + JSON.stringify(response))
                console.log("response PUBLIC ID: " + response.public_id)
                storeImage(currentUsername, response.public_id, description, response.width, response.height);

                /* the response:
                "asset_id":"d43b1cdd929839490ed83ef4d77b6e11",
                "public_id":"yzx9ixx3cwwwwjb0mr2t",
                "version":1763329669,
                "version_id":"b2202cc1c90fe288bd6513aa6db49cdc",
                "signature":"4d680c8086d7385801cd172f983fb334db8e9aa1",
                "width":640,
                "height":1136
                ,"format":"png",
                "resource_type":"image",
                "created_at":"2025-11-16T21:47:49Z","tags":[],
                "bytes":65593,"type":"upload",
                "etag":"d2bc8e7384e4db354ffeb7b078796531",
                "placeholder":false,
                "url":"http://res.cloudinary.com/script-cs/image/upload/v1763329669/yzx9ixx3cwwwwjb0mr2t.png",
                "secure_url":"https://res.cloudinary.com/script-cs/image/upload/v1763329669/yzx9ixx3cwwwwjb0mr2t.png",
                "asset_folder":"",
                "display_name":"file",
                "metadata":{"description":"Insert image description here","username":"A"},
                "original_filename":"file"}
                 */
            }
        })

        console.log('done uploading!');
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
            router.back();
            router.replace('/results')
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
            router.back();
            router.replace('/results');
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