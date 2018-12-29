import Vue from 'vue'
import Vuex from 'vuex'
import Database from './Database';

Vue.use(Vuex)

const db = new Database();
const galleries = db.getAllGalleries();
const currentGallery = Object.keys(galleries).length > 0 ? Object.keys(galleries)[0] : '';
const collages = currentGallery != '' ? galleries[currentGallery].collages : [];

export default new Vuex.Store({
    state: {
        currentGallery,
        galleries,
        collages,
    },
    getters: {
        currentGallery: state => state.currentGallery,
        galleries: state => state.galleries,
        collages: state => state.collages,
    },
    mutations: {
        changeGallery(state, id) {
            state.currentGallery = id;
        },
        changeCollages(state, collages) {
            state.collages = collages;
        },
        updateGalleries(state, galleries) {
            state.galleries = galleries;
        },
        saveCollage(state, collage) {
            state.collages.unshift(collage);
        }
    },
    actions: {
        addGallery({ commit }, gallery) {
            db.saveGallery(gallery);
            commit('updateGalleries', db.getAllGalleries());
        },
        changeGallery({ commit }, galleryId) {
            commit('changeGallery', galleryId);
            commit('changeCollages', db.getCollagesByGalleryId(galleryId));
        },
        saveCollage({ commit, state }, collage) {
            console.log(collage)
            db.saveCollage(state.currentGallery, collage);
            commit('saveCollage', collage);
        }
    }
});
