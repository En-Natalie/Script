import { ThemedView } from '@/components/themed-view';
import { Header } from '@/components/ui/header';
import { Fragment, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { AdvancedImage } from "cloudinary-react-native";
import { Cloudinary } from "@cloudinary/url-gen";
import { Colors, Constants } from "@/constants/theme";
import { getImagesOfUsername, ImageStorageEntry } from "@/functionality/data-storage";
import { currentUsername } from "@/app/index";
import ImageBoxHistory from "@/components/ui/image-box-history";

export default function HistoryScreen() {
    const cloudinary = new Cloudinary({
        cloud: {
            cloudName: "script-cs",
        },
        url: {
            secure: true
        }
    });

    type ImageHBuilder = {
        id: number;
        publicID: string;
        description: string;
        width: number;
        height: number;
    }

    const [images, setImages] = useState<ImageHBuilder[]>([]);

    useEffect(() => {
        const newImages: ImageHBuilder[] = [];
        const entries: ImageStorageEntry[] = getImagesOfUsername(currentUsername);

        let i = 0;
        entries.forEach(entry => {
            newImages.push({
                id: i,
                publicID: entry.publicID,
                description: entry.description,
                width: entry.width,
                height: entry.height,
            })
            i++;
        })

        setImages(newImages);

    }, [setImages]);

    const imageBoxes = images.map(ib =>
        <Fragment key={ib.id}>
            <ImageBoxHistory description={ib.description}>
                <AdvancedImage
                    cldImg={cloudinary.image(ib.publicID)}
                    style={{
                        borderWidth: Constants.default.outlineWidth,
                        borderColor: Colors.default.border,
                        borderRadius: Constants.default.borderRadius,
                        flex: 1,
                        resizeMode: 'cover',
                        width: '100%',
                        aspectRatio: ib.width / ib.height,
                    }} />
            </ImageBoxHistory>
        </Fragment>
    );

    return (
        <View style={{flex: 1}}>

            <ScrollView stickyHeaderIndices={[0]} style={{backgroundColor: Colors.default.background}}>
                <Header title='History' backPath='/home'></Header>
                <ThemedView color='background'>
                    {imageBoxes}
                </ThemedView>
            </ScrollView>

        </View>
    )
}