import app from 'electron';
import fs from 'fs';
import path from 'path';
import md5 from 'md5';

class Database {
    configPath;
    imagesPath;

    constructor() {
        this.configPath = path.join(app.remote.app.getPath('userData'), 'collage-config.json');
        this.imagesPath = path.join(app.remote.app.getPath('userData'), 'images');
        this.createAndInit();
    }

    createAndInit() {
        if (!fs.existsSync(this.imagesPath)) {
            fs.mkdirSync(this.imagesPath);
        }
        if (!fs.existsSync(this.configPath)) {
            fs.writeFileSync(this.configPath, JSON.stringify({
                galleries: {},
            }));
        }

        this.config = JSON.parse(fs.readFileSync(this.configPath));
    }

    // Async, cause we probably don't care enough to wait for it.
    saveConfig() {
        fs.writeFile(this.configPath, JSON.stringify(this.config), e => {});
    }

    saveGallery(name) {
        if (name in this.config.galleries) {
            return;
        }
        
        const id = md5(name);
        this.config.galleries[id] = {
            id,
            name,
            collages: [],
        };
        this.saveConfig();
    }

    getAllGalleries() {
        // Vue wants to bind to the actual config object, and it causes problems.
        const copy = {};
        Object.assign(copy, this.config.galleries);
        return copy;
    }

    deleteGallery(galleryId) {
        if (!(galleryId in this.config.galleries)) {
            return;
        }

        delete this.config.galleries[galleryId];
        
        this.saveConfig();
    }

    getCollagesByGalleryId(id) {
        if (!(id in this.config.galleries)) {
            return [];
        }
        const gallery = this.config.galleries[id];
        
        return 'collages' in gallery ? gallery.collages : [];
    }

    saveCollage(galleryId, collage) {
        const collageInfo = {
            id: md5(new Date().getTime() + collage.title + collage.description + collage.images),
            title: collage.title,
            description: collage.description,
            images: collage.images,
        };

        // Prepend and save.
        this.config.galleries[galleryId].collages.splice(0, 0, collageInfo);
        this.saveConfig();
        
        return collageInfo;
    }

    deleteCollage(id, galleryId) {
        if (!(galleryId in this.config.galleries))  {
            return false;
        }

        const collages = this.config.galleries[galleryId].collages;
        for (let index in collages) {
            const collage = collages[index];
            if (collage.id == id) {
                this.config.galleries[galleryId].collages.splice(index, 1);
                this.saveConfig();
                break;
            }
        }

        return true;
    }
}

export default Database;
