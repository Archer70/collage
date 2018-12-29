<template>
    <div id="main-content">
        <header class="navbar">
            <section class="navbar-section">
                <a class="navbar-brand mr-2">
                    <img id="nav-icon" src="./assets/64x64.png" alt="">
                </a>
                <a class="btn btn-link" v-for="(gallery, id) in galleries" :key="id" @click.prevent="changeGallery(id)">
                    {{ gallery.name }}
                </a>
            </section>
            <section class="navbar-section">
                <i @click.prevent="settingsOpen = true;" class="icon icon-menu"></i>
            </section>
        </header>

        <Gallery v-if="currentGallery" />

        <div v-if="!currentGallery" class="empty">
            <div class="empty-icon">
                <i class="icon icon-photo"></i>
            </div>
            <p class="empty-title h5">No gallery selected.</p>
            <p class="empty-subtitle">Select on from the top menu, or you can create one using the "Create Gallery" field at the top-right.</p>
        </div>

        <div v-if="settingsOpen" class="modal active" id="modal-id">
            <a @click.prevent="settingsOpen = false;" href="#close" class="modal-overlay" aria-label="Close"></a>
            <div class="modal-container">
                <div class="modal-header">
                    <a @click.prevent="settingsOpen = false;" href="#close" class="btn btn-clear float-right" aria-label="Close"></a>
                    <div class="modal-title h5">Settings</div>
                </div>
                <div class="modal-body">
                    <div class="content">
                        <ul class="tab tab-block mb-2">
                            <li :class="'tab-item' + (settingsBackgroundOpen ? ' active': '')">
                                <a @click.prevent="settingsGalleriesOpen = false; settingsBackgroundOpen = true;" href="#">Background</a>
                            </li>
                            <li :class="'tab-item' + (settingsGalleriesOpen ? ' active': '')">
                                <a @click.prevent="settingsGalleriesOpen = true; settingsBackgroundOpen = false;" href="#">Galleries</a>
                            </li>
                        </ul>

                        <div v-if="settingsBackgroundOpen">
                            <form @submit.prevent="changeBackground">
                                <div class="form-group">
                                    <input class="form-input" type="file" placeholder="Background Image">
                                </div>
                                <div class="btn-group btn-group-block">
                                    <input class="btn btn-error" type="button" value="Reset Default">
                                    <input class="btn btn-primary" type="submit" value="Upload">
                                </div>
                            </form>
                        </div>

                        <div v-if="settingsGalleriesOpen">
                            <form @submit.prevent="addGallery(newGalleryInput); newGalleryInput=''" newGalleryInput=''>
                                <div class="input-group">
                                    <input v-model="newGalleryInput" class="form-input" type="input" placeholder="Gallery Name">
                                    <input class="btn btn-primary input-group-btn" type="submit" value="Create">
                                </div>
                            </form>
                            <div class="divider"></div>
                            <p v-for="gallery in galleries" :key="gallery.id">
                                <button @click.prevent="deleteGallery(gallery.id)" class="btn btn-error btn-sm s-circle mr-2">
                                    <i class="icon icon-delete"></i>
                                </button>
                                {{ gallery.name }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import path from 'path';
import app from 'electron';
import { mapActions, mapGetters, mapMutations } from 'vuex';

import Gallery from './components/Gallery.vue';

export default {
    components: {
        Gallery
    },
    computed: {
        ...mapGetters(['currentGallery', 'galleries']),
    },
    data() {
        return {
            newGalleryInput: '',
            settingsOpen: false,
            settingsBackgroundOpen: true,
            settingsGalleriesOpen: false,
        };
    },
    methods: {
        ...mapActions(['addGallery', 'changeGallery', 'deleteGallery']),
    },
}
</script>

<style lang="scss">
@import './css/main.scss';
@import './css/variables.scss';

body {
    background-repeat: repeat;
}

#nav-icon {
    max-width: 48px;
}

.tab-item {
    outline: none;
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
