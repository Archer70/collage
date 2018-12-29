<template>
    <div class="gallery-container">
        <div @dragover.prevent="dragOver" @dragleave.prevent="dragLeave" @drop.prevent="drop" class="card new-post">
            <div class="card-header">
                <div class="card-title h5">New Post</div>
                <div class="card-subtitle text-gray">Drag images here to get started. Title and description are optional.</div>
            </div>
            <div class="card-body">
                <div class="input-group">
                    <input v-model="newTitle" class="form-input input-lg" type="text" placeholder="Title">
                    <input v-model="newDescription" class="form-input input-lg" type="text" placeholder="description">
                </div>
                <div v-if="fileHovering" id="drop-card">
                    <i class="icon icon-plus"></i>
                </div>
                <div id="new-images">
                    <img v-for="(image, key) in newImages" :key="key" :src="image" alt="" />
                </div>
            </div>
            <div class="card-footer text-right">
                <button :disabled="this.newImages.length < 1" @click.prevent="submit" class="btn btn-primary btn-lg">Submit</button>
            </div>
        </div>
        <Collage
            v-for="collage of collages"
            :key="collage.id"
            :collage="collage"
            @deleted="removeCollage"
        />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import md5 from 'md5';
import Collage from './Collage.vue';
import ImageManager from '../ImageManager';

export default {
    name: 'Gallery',
    components: {
        Collage
    },
    data() {
        return {
            fileHovering: false,
            closeTimeout: null,
            newTitle: '',
            newDescription: '',
            newImages: [],
        }
    },
    computed: {
        ...mapGetters(['collages']),
    },
    methods: {
        ...mapActions(['changeCollages', 'saveCollage']),
        removeCollage(collageId) {
            for (let index in this.collages) {
                const collage = this.collages[index];
                if (collageId == collage.id) {
                    this.collages.splice(index, 1)
                }
            }
        },
        dragOver() {
            window.clearTimeout(this.closeTimeout);
            this.fileHovering = true;
        },
        dragLeave(e) {
            window.clearTimeout(this.closeTimeout);
            this.closeTimeout = window.setTimeout(() => {
                this.fileHovering = false;
            }, 500);
        },
        drop(event) {
            this.dragLeave();         
            ImageManager.upload(event.dataTransfer.files)
                .then(images => {
                    for (let i=0; i < images.length; i++) {
                        const image = images[i];
                        this.newImages.push(`file://${image}`);
                    }
                })
                .catch(e => console.log(e));
        },
        submit() {
            this.saveCollage({
                title: this.newTitle,
                description: this.newDescription,
                images: this.newImages
            });
            this.newImages = [];
            this.newTitle = '';
            this.newDescription = '';
        }
    }
}
</script>

<style lang="scss">
@import '../css/variables.scss';

.gallery-container {
    margin: 0 auto;
    width: 500px;
    min-height: 100px;

    .new-post {
        margin-bottom: 1rem;

        #drop-card {
            display: inline-block;
            text-align: center;
            line-height: 100px;
            width: 100%;
            margin: 1rem 0;
            font-size: 32px;
            background: $dropcard-color;
        }

        #new-images {
            margin-top: 1rem;

            img {
                display: block;
                max-width: 33.333%;
                float: left;
            }
        }
    }
}
</style>
