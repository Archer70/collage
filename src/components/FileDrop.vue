<template>
    <div @dragover.prevent="dragOver" @dragleave.prevent="dragLeave" @drop.prevent="drop">
        <div class="drop-body">
            
            <div :class="'drop-card' + (fileHovering ? ' hover' : '')">
                <span v-if="!fileHovering">Drop files here.</span>
                <i v-else class="icon icon-plus"></i>
            </div>
        </div>
    </div>
</template>

<script>
import ImageManager from '../ImageManager';

export default {
    name: 'FileDrop',
    data() {
        return {
            fileHovering: false,
            closeTimeout: null,
            newImages: [],
        }
    },
    methods: {
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
                    this.$emit('dropped', this.newImages);
                })
                .catch(e => console.log(e));
            // Clear, so we don't have old images in the queue when more are dropped.
            this.newImages = [];
        },
    }
}
</script>

<style lang="scss">
@import '../css/variables.scss';

.drop-card {
    display: inline-block;
    text-align: center;
    line-height: 100px;
    width: 100%;
    margin: 1rem 0;
    font-size: 1rem;
    background: $dropcard-color;
}

</style>
