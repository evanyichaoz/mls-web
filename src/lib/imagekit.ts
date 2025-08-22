import ImageKit from 'imagekit';

// 检查环境变量是否已定义
const hasImageKitConfig = process.env.IMAGEKIT_PUBLIC_KEY && 
                         process.env.IMAGEKIT_PRIVATE_KEY && 
                         process.env.IMAGEKIT_URL_ENDPOINT;

let imagekit: ImageKit | null = null;

if (hasImageKitConfig) {
    imagekit = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!
    });
} else {
    console.warn('ImageKit environment variables are not set. Image upload features will not work.');
}

export default imagekit;