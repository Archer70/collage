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
                <button @click.prevent="submit" class="btn btn-primary btn-lg">Submit</button>
            </div>
        </div>
        <Collage
            v-for="collage of collages"
            :key="collage.id"
            :title="collage.title"
            :description="collage.description"
            :images="collage.images"
        />
    </div>
</template>

<script>
import Collage from './Collage.vue';

export default {
    name: 'Gallery',
    components: {
        Collage
    },
    data() {
        return {
            fileHovering: false,
            closeTimeout: null,
            collages: [],
            newTitle: '',
            newDescription: '',
            newImages: [],
        }
    },
    methods: {
        lastCollage() {
            return this.collages[this.collages.length-1];
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
            const files = event.dataTransfer.files;            
            const allowedTypes = [
                'image/jpeg',
                'image/jpg',
                'image/png',
                'image/gif'
            ];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (allowedTypes.includes(file.type)) {
                    this.newImages.push('file://' + file.path);
                }
            }
            this.dragLeave();
        },
        submit() {
            this.collages.splice(0,0, {
                id: this.lastCollage.id+1,
                title: this.newTitle,
                description: this.newDescription,
                images: this.newImages
            });
            this.newImages = [];
            this.newTitle = '';
            this.newDescription = '';
        }
    },
    mounted() {
        this.collages.push({
            id: 0,
            title: 'Post Title',
            description: 'Optional description',
            images: [
                'file:///home/scotty/Pictures/wallpapers/arch1.png',
                'file:///home/scotty/Pictures/wallpapers/background2.jpg',
                'file:///home/scotty/Pictures/wallpapers/background3.jpg',
                'file:///home/scotty/Pictures/wallpapers/background4.jpg',
                'file:///home/scotty/Pictures/evh.png',
            ]
        });
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
