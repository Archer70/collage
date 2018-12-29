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
                <form @submit.prevent="addGallery(newGalleryInput); newGalleryInput=''">
                    <div class="input-group">
                        <input v-model="newGalleryInput" type="text" class="form-input mr-2" placeholder="Create Gallery">
                    </div>
                </form>
                <i class="icon icon-menu"></i>
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
        };
    },
    methods: {
        ...mapActions(['addGallery', 'changeGallery']),
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
