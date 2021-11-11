import { api } from '../../services';

const state = {};

const getters = {};

const mutations = {};

const actions = {
    async GET_ALL(_, payload) {
        try {
            const response = await api.get(`/api/vehicles?page=${payload.page}&per_page=${payload.per_page}`);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    async REGISTER(_, payload) {
        try {
            const response = await api.post(`/api/vehicles`, payload);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    async UPDATE(_, payload) {
        try {
            const response = await api.put(`/api/vehicles/${payload.id}`, payload.data);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    async DELETE(_, payload) {
        try {
            const response = await api.post(`/api/vehicles/delete`, payload);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    async STATUS() {
        try {
            const response = await api.get(`/api/vehicles/status/get`);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    async STATUS_UPDATE(_, payload) {
        try {
            const response = await api.post(`/api/vehicles/status`, payload);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },
};
// exportar propiedades
export const vehicles = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
