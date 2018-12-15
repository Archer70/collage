<template>
    <div id="main-content">
        <header class="navbar">
            <section class="navbar-section">
                <a class="navbar-brand mr-2">Collage</a>
                <div class="input-group">
                    <select class="form-select">
                        <option v-for="(gallery, id) of galleries" :key="gallery + '_' + id">
                            {{ gallery }}
                        </option>
                    </select>
                </div>
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
        <Gallery />
    </div>
</template>

<script>
import Db from './database';
import Gallery from './components/Gallery.vue';

export default {
    components: {
        Gallery
    },
    data() {
        return {
            galleries: [],
            newGalleryInput: '',
            db: null,
        };
    },
    methods: {
        addGallery() {
            this.db.saveGallery(this.newGalleryInput)
                .then(result => {
                    this.galleries.push(result.name);
                })
                .catch(error => alert('Failed to save gallery.'));
            this.newGalleryInput = '';
        }
    },
    mounted() {
        this.db = new Db();
        this.db.getAllGalleries()
            .then(result => this.galleries = result)
            .catch(error => window.alert('Problem loading galleries.'));
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
</style>
