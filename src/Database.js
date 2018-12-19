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
        this.config.galleries[md5(name)] = {
            name,
            collages: [],
        };
        this.saveConfig();
    }

    getAllGalleries() {
        return this.config.galleries;
    }

    getCollagesByGalleryId(id) {
        if (!(id in this.config.galleries)) {
            return [];
        }
        const gallery = this.config.galleries[id];
        
        return 'collages' in gallery ? gallery.collages : [];
    }

    createCollage(galleryId, title, description, images) {
        const collage = {
            id: md5(new Date().getTime() + title + description + images),
            title,
            description,
            images,
        };

        // Prepend and save.
        this.config.galleries[galleryId].collages.splice(0, 0, collage);
        this.saveConfig();
        
        return collage;
    }
}

export default Database;
