import config from '$lib/config.js';
import firerest from 'firerest';
import { browser } from '$app/env';

const api = firerest.create({
  baseURL: config.api.endpoint,
  debug: browser && process.env.NODE_ENV !== 'production',
});

export default api;
