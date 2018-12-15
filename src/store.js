import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        connected: false,
        server: '',
        nick: '',
        currentChannel: '',
        channelMessages: [],
    },
    getters: {
        connected: state => state.connected,
        server: state => state.server,
        currentChannel: state => state.currentChannel,
        nick: state => state.nick,
    },
    mutations: {
        connectToServer: (state, server) => {
            state.connected = true;
            state.server = server;
        },
        changeNick: (state, nick) => {
            state.nick = nick;
        },
        changeChannel: (state, channel) => {
            state.currentChannel = channel;
        }
    },
    actions: {

    }
})
