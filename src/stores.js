import { writable } from 'svelte/store';

let itemValue = {};

export const searchError = writable(false);
export const monster = writable(itemValue);