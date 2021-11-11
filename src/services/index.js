import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.VUE_APP_API,
    headers: {
        'Access-Control-Allow-Origin': process.env.VUE_APP_API,
    },
});