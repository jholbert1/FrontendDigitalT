import { api } from '../../services';

const state = {};

const getters = {};

const mutations = {};

const actions = {
    async GET_USERS(_, payload) {
        try {
            const response = await api.get(`/api/users?page=${payload.page}&per_page=${payload.per_page}`);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    async ACTIVE_USER(_, payload) {
        try {
            const response = await api.post(`/api/users/active`, payload);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    async REGISTER(_, payload) {
        try {
            const response = await api.post(`/api/users`, payload);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    async UPDATE(_, payload) {
        try {
            const response = await api.put(`/api/users/${payload.id}`, payload.data);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    async DELETE(_, payload) {
        try {
            const response = await api.post(`/api/users/delete`, payload);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },
};
// exportar propiedades
export const users = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
