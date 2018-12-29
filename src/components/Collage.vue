<template>
    <div class="group">
        <div @dragover.prevent="dragFile" @dragleave.prevent="undragFile" @drop.prevent="uploadFiles" class="card">
            <div class="card-header">
                <div class="card-title h5">
                    <a @click.prevent="deleteCollage(collage.id)" class="float-right text-sm">
                        <i class="icon icon-cross"></i>
                    </a>
                    <span v-if="collage.title">{{ collage.title }}</span>
                </div>
                <div v-if="collage.description" class="card-subtitle text-gray">{{ collage.description }}</div>
            </div>
            <div class="card-image">
                <img @click.prevent="toggleModal(0)" class="img-responsive" :src="header" alt="" />
            </div>            
            <div class="collage">
                <img
                    v-for="(picture, index) in collagePictures"
                    :key="index" :src="picture"
                    @click.prevent="toggleModal(index+1)"
                    alt=""
                />
                <div v-if="dragHover" class="drag-placeholder">
                    <p v-if="!uploading"><i class="icon icon-plus icon-2x"></i></p>
                    <div v-else class="loading loading-lg"></div>
                </div>
            </div>                
        </div>

        <PictureModal
            :title="collage.title"
            :images="pictures"
            :selectedImage="selectedImage"
            :active="modalActive"
            @close-modal="toggleModal" />
    </div>
</template>

<script>
import PictureModal from './PictureModal.vue';
import { setTimeout } from 'timers';
import Database from '../Database';
import { mapGetters } from 'vuex';

export default {
    name: 'Collage',
    components: {
        PictureModal
    },
    props: {
        collage: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            pictures: this.collage.images,
            selected: 0,
            modalActive: false,
            dragHover: false,
            uploading: false,
            closeTimeout: null,
        }
    },
    computed: {
        ...mapGetters(['currentGallery']),
        header() {
            return this.pictures[0];
        },
        selectedImage() {
            return this.selected;
        },
        collagePictures() {
            return this.pictures.slice(1);
        },
        lastPicureIndex() {
            return this.pictures.length-1;
        }
    },
    methods: {
        deleteCollage(id) {
            const success = this.db.deleteCollage(id, this.galleryId);
            if (success) {
                this.$emit('deleted', id);
            }
        },
        toggleModal(id) {
            this.selected = id;
            this.modalActive = !this.modalActive;
        },
        dragFile(event) {
            window.clearTimeout(this.closeTimeout);
            this.dragHover = true;
        },
        undragFile(event) {
            window.clearTimeout(this.closeTimeout);
            this.closeTimeout = window.setTimeout(() => {
                this.dragHover = false;
            }, 500);
        },
        uploadFiles(event) {
            const files = event.dataTransfer.files;
            this.uploading = true;
            
            const allowedTypes = [
                'image/jpeg',
                'image/jpg',
                'image/png',
                'image/gif'
            ];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (allowedTypes.includes(file.type)) {
                    this.pictures.push('file://' + file.path);
                }
            }
            this.uploading = false;
            this.dragHover = false;
        }
    },
    mounted() {
    }
}
</script>

<style lang="scss">
@import '../css/variables.scss';

.group {
    margin-bottom: 1rem;

    img {
        cursor: pointer;
    }
}

.collage {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;

    img {
        width: 33.3333%;
        height: 125px;
    }
    .drag-placeholder {
        display: flex;
        width: 33.3333%;
        height: 125px;
        background: $dropcard-color;
        justify-content: center;
        align-items: center;
    }
}
</style>
