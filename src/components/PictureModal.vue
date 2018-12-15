<template>
    <div :class="'modal' + (modalActive ? ' active' : '')" id="modal-id">
        <a @click.prevent="closeModal" class="modal-overlay" aria-label="Close"></a>
        <div class="modal-container">
            <div class="modal-header">
                <a @click.prevent="closeModal" class="btn btn-clear float-right" aria-label="Close"></a>
                <div class="modal-title h5">{{ title }}</div>
            </div>
            <div class="modal-body">
                <img class="img-responsive" :src="currentPicture" />
            </div>
            <div class="modal-footer">
                <div class="container">
                    <div class="columns">
                        <div class="column col-6 text-left">
                            <a class="c-hand" @click.prevent="previousPicture">Previous</a>
                        </div>
                        <div class="column col-6">
                            <a class="c-hand" @click.prevent="nextPicture">Next</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'PictureModal',
    props: {
        title: {
            type: String,
            required: true,
        },
        images: {
            type: Array,
            required: true,
        },
        active: {
            type: Boolean,
            default: false,
        },
        selectedImage: {
            type: Number,
            default: 0,
            required: true,
        }
    },
    data() {
        return {
            pictures: this.images,
            current: this.selectedImage,
        }
    },
    watch: {
        selectedImage(imageId) {
            this.current = imageId;
        }
    },
    computed: {
        lastPicureIndex() {
            return this.pictures.length-1;
        },
        modalActive() {
            return this.active;
        },
        currentPicture() {
            return this.pictures[this.current];
        }
    },
    methods: {
        closeModal() {
            this.$emit('close-modal');
        },
        nextPicture() {
            if (this.current == this.lastPicureIndex) {
                this.current = 0;
            } else {
                this.current++;
            }
        },
        previousPicture() {
            if (this.current == 0) {
                this.current = this.lastPicureIndex;
            } else {
                this.current--;
            }
        }
    },
    mounted() {

    }
}
</script>

<style lang="scss">
@import '../css/variables.scss';
</style>
