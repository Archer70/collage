import app from 'electron';
import fs from 'fs';
import path from 'path';

import Datastore from 'nedb';

class Db {
    databaseNames;

    galleries;
    collages;
    pictures;

    constructor() {
        this.databaseNames = [
            'galleries', 'collages', 'pictures'
        ];
        this.createIfNotExists();
        this.loadDatabases();
    }

    createIfNotExists() {
        for (const database of this.databaseNames) {
            const dbPath = path.join(app.remote.app.getPath('userData'), database);
            if (!fs.existsSync(dbPath)) {
                console.log('overwriting');
                fs.writeFileSync(dbPath, '');
            }
        }
    }

    loadDatabases() {
        for (const database of this.databaseNames) {
            this[database] = new Datastore({
                filename: this.dbPath,
                autoload: true,
            });
        }
    }

    saveGallery(name) {
        return new Promise((resolve, reject) => {
            this.galleries.insert({name}, (error, gallery) => {
                if (error) {
                    reject(error);
                } else {
                    this.galleries.find({}, (e, g) => console.log(g));
                    resolve(gallery);
                }
            });
        });
    }

    getAllGalleries() {
        return new Promise((resolve, reject) => {
            this.galleries.find({}, (error, galleries) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(galleries);
                }
            });
        });
    }
}

export default Db;
