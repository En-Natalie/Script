/**
 * Information needed to store images for the history screen.
 * Not a good way to do this, should be based on proper backend
 * that makes calls to Cloudinary's Admin API.
 */
export type ImageStorageEntry = {
    publicID: string,
    description: string,
    width: number,
    height: number,
}

/**
 * Maps usernames to lists of image storage entries
 */
const dataMapping :Map<string, ImageStorageEntry[]> = new Map();

/**
 * Add an image to the data mapping
 * @param username currently logged-in user
 * @param publicID cloudinary public id of image
 * @param description image description
 * @param width width of image
 * @param height height of image
 */
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

/**
 * Returns array containing image storage entries mapped to given username
 * @param username username to get image storage entries of
 */
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