import { writable } from 'svelte/store';

let itemValue = {};

export const monster = writable(itemValue);