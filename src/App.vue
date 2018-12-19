<template>
    <div id="main-content">
        <header class="navbar">
            <section class="navbar-section">
                <a class="navbar-brand mr-2">Collage</a>
                <a class="btn btn-link" v-for="(gallery, id) in galleries" :key="id" @click.prevent="selectedGallery = id">
                    {{ gallery.name }}
                </a>
            </section>
            <section class="navbar-section">
                <form @submit.prevent="addGallery">
                    <div class="input-group">
                        <input v-model="newGalleryInput" type="text" class="form-input mr-2" placeholder="Create Gallery">
                    </div>
                </form>
                <i class="icon icon-menu"></i>
            </section>
        </header>
        <Gallery v-if="selectedGallery" :gallery-id="selectedGallery" />
        <div v-if="!selectedGallery" class="empty">
            <div class="empty-icon">
                <i class="icon icon-photo"></i>
            </div>
            <p class="empty-title h5">No gallery selected.</p>
            <p class="empty-subtitle">Select on from the top menu, or you can create one using the "Create Gallery" field at the top-right.</p>
        </div>
    </div>
</template>

<script>
import path from 'path';
import app from 'electron';
import Database from './Database';

import Gallery from './components/Gallery.vue';

export default {
    components: {
        Gallery
    },
    data() {
        return {
            db: null,
            selectedGallery: null,
            galleries: [],
            newGalleryInput: '',
        };
    },
    methods: {
        addGallery() {
            this.db.saveGallery(this.newGalleryInput);
            this.galleries = this.db.getAllGalleries();
            this.newGalleryInput = '';
        }
    },
    mounted() {
        this.db = new Database();
        this.galleries = this.db.getAllGalleries();
        
        const galleryIds = Object.keys(this.galleries);
        if (galleryIds.length > 0) {
            this.selectedGallery = galleryIds[0];
        }
    }
}
</script>

<style lang="scss">
@import './css/main.scss';
@import './css/variables.scss';

body {
    background-repeat: repeat;
}

#main-content {
    margin: 1rem 1rem 0 1rem;
}

.empty {
    background: none;

    .icon {
        font-size: 32px;
    }
}
</style>
