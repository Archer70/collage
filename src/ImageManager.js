import app from 'electron';
import fs from 'fs';
import path from 'path';
import md5 from 'md5';

class ImageManager {
    static checkFile(file) {
        const allowedTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/gif'
        ];

        return allowedTypes.includes(file.type);
    }

    static upload(files) {
        return new Promise((resolve, reject) => {
            const newImages = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (ImageManager.checkFile(file)) {
                    ImageManager.copyFile(file)
                        .then(path => newImages.push(path))
                        .catch(e => reject(e));
                }
            }
            resolve(newImages);
        });
    }
    
    static copyFile(file) {
        const imagesPath = path.join(app.remote.app.getPath('userData'), 'images');
        const filePath = file.path;
        const newFileName = md5(new Date().getTime() + file.path) + `.${file.type.split('/')[1]}`;
        const newFilePath = path.join(imagesPath, newFileName);

        return new Promise((resolve, reject) => {
            if (!fs.existsSync(filePath) || !fs.existsSync(imagesPath)) {
                reject('file path error');
            }
            
            fs.copyFileSync(file.path, newFilePath);
            resolve(newFilePath);
        });
    }
}

export default ImageManager;
