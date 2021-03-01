import { writable } from 'svelte/store';

let itemValue = {};

export const lowerName = writable('');
export const monster = writable(itemValue);