import { api } from '../../services';

const state = {
    token: null,
    user: null
};

const getters = {
    AUTHENTICATED: (state) => state.token != null ? true : false,
    GET_USER: (state) => state.user
};

const mutations = {
    ADD_TOKEN: (state, payload) => {
        state.token = payload;
        localStorage.setItem("token", payload);
        api.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${payload}`;
    },

    ADD_USER: (state, payload) => state.user = payload,

    CLEAR_DATA: (state) => {
        state.token = null;
        state.user = null;
        localStorage.clear();
    },
};

const actions = {
    async LOGIN({ commit }, payload) {
        try {
            const response = await api.post(
                `/api/auth/login`,
                payload
            );
            commit('ADD_TOKEN', response.data.data.access_token.token);
            commit('ADD_USER', response.data.data.user);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    async GET_AUTH_USER({ commit, state, getters }) {
        try {
            if (state.user == null) {
                const response = await api.get(`/api/auth/user`)
                commit("ADD_USER", response.data.data);
                return response.data.data;
            } else {
                return getters.GET_USER;
            }
        } catch (error) {
            return Promise.reject(error);
        }
    },

    async TRY_AUTO_LOGIN({ commit, dispatch }) {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                commit('ADD_TOKEN', token);
                dispatch("GET_AUTH_USER");
                return;
            } else {
                return false;
            }
        } catch (error) {
            return Promise.reject(error);
        }
    },

    async LOGOUT({ commit }) {
        try {
            const response = await api.get(`api/auth/logout`);
            commit("CLEAR_DATA");
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },
};


// exportar propiedades
export const auth = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
