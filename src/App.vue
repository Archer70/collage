<template>
    <div id="main-content">
        <header class="navbar">
            <section class="navbar-section">
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
                <i class="head-icon icon icon-photo"></i>
            </div>
            <p class="empty-title h5">No gallery selected.</p>
            <p class="empty-subtitle">
                Select on from the top menu, or you can create one from the settings panel
                ( <i class="icon icon-menu"></i> ) located at the top-right of the page.
            </p>
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
                            <file-drop @dropped="f => changeBackground(f[0])" />
                            <div class="btn-group">
                                <input @click.prevent="changeBackground('')" class="btn btn-error" type="button" value="Clear">
                            </div>
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
import { mapActions, mapGetters } from 'vuex';

import Gallery from './components/Gallery.vue';
import FileDrop from './components/FileDrop.vue';

export default {
    components: {
        Gallery,
        FileDrop,
    },
    computed: {
        ...mapGetters(['currentGallery', 'galleries', 'background']),
    },
    data() {
        return {
            newGalleryInput: '',
            settingsOpen: false,
            settingsBackgroundOpen: true,
            settingsGalleriesOpen: false,
        };
    },
    watch: {
        background(url) {
            this.loadBackground(url)
        }
    },
    methods: {
        ...mapActions([
            'addGallery',
            'changeGallery',
            'deleteGallery',
            'changeBackground'
        ]),
        loadBackground(url) {
            document.body.style.backgroundImage = `url(${url})`;
        }
    },
    mounted() {
        // Apply background from initial state.
        this.loadBackground(this.background);
    }
}
</script>

<style lang="scss">
@import './css/main.scss';
@import './css/variables.scss';

html, body {
    background-repeat: none;
    margin: 0;
    padding: 0;
}

#main-content {
    .navbar {
        background: $background;
        padding: $spacing $double-spacing;
        border-bottom: 1px solid $light-border;
    }
}

.empty {
    margin: 0 auto;
    width: 600px;
    min-height: 100px;
    background: $background;
    padding: $double-spacing 50px;
    border-left: 1px solid $light-border;
    border-right: 1px solid $light-border;
    border-bottom: 1px solid $light-border;

    .head-icon {
        font-size: 32px;
    }
}
</style>
