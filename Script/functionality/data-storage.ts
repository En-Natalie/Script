export type ImageStorageEntry = {
    publicID: string,
    description: string,
    width: number,
    height: number,
}

const dataMapping :Map<string, ImageStorageEntry[]> = new Map();

export function storeImage(username: string, publicID: string, description: string, width: number, height: number) {
    const arr = dataMapping.get(username);

    const entry = {
        publicID: publicID,
        description: description,
        width: width,
        height: height,
    };

    if (arr) {
        arr.push(entry);
    }
    else {
        dataMapping.set(username, [entry]);
    }
}

export function getImagesOfUsername(username: string): ImageStorageEntry[] {
    const arr = dataMapping.get(username);
    if (arr) {
        return arr;
    }
    else {
        console.log("Username's images are undefined, uh oh");
        return [];
    }
}