import Vue from 'vue'
import Vuex from 'vuex'
import Database from './Database';
import ImageManager from './ImageManager';

Vue.use(Vuex)

const db = new Database();
const background = db.getBackground();
const galleries = db.getAllGalleries();
const currentGallery = Object.keys(galleries).length > 0 ? Object.keys(galleries)[0] : '';
const collages = currentGallery != '' ? galleries[currentGallery].collages : [];

export default new Vuex.Store({
    state: {
        background,
        currentGallery,
        galleries,
        collages,
    },
    getters: {
        background: state => state.background,
        currentGallery: state => state.currentGallery,
        galleries: state => state.galleries,
        collages: state => state.collages,
    },
    mutations: {
        changeBackground(state, path) {
            state.background = path;
        },
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
        changeBackground({ commit }, path) {
            db.saveBackground(path);
            commit('changeBackground', path);
        },
        addGallery({ commit }, gallery) {
            db.saveGallery(gallery);
            commit('updateGalleries', db.getAllGalleries());
        },
        changeGallery({ commit }, galleryId) {
            commit('changeGallery', galleryId);
            commit('changeCollages', db.getCollagesByGalleryId(galleryId));
        },
        saveCollage({ commit, state }, collage) {
            db.saveCollage(state.currentGallery, collage);
            commit('saveCollage', collage);
        },
        deleteCollage({ commit, state }, id) {
            db.deleteCollage(id, state.currentGallery);
            commit('changeCollages', db.getCollagesByGalleryId(state.currentGallery))
        },
        deleteGallery({ commit }, galleryId) {
            db.deleteGallery(galleryId);
            commit('updateGalleries', db.getAllGalleries());
        }
    }
});
