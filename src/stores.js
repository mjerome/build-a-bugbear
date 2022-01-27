import { writable } from "svelte/store";

let itemValue = {};

export const searchError = writable(false);
export const monster = writable(itemValue);
export const STORAGE_ID = "local-monster-data";
export const localMonsterList = writable({ monsters: [] });
export const edit = writable(false);
export const newMonster = {
  actions: "",
  armor_class: "",
  charisma: "",
  challenge_rating: "",
  constitution: "",
  dexterity: "",
  hit_points: "",
  intelligence: "",
  languages: "",
  name: "",
  senses: "",
  size: "-- ",
  skills: "",
  special_abilities: "",
  speed: "",
  strength: "",
  subtype: "--",
  type: "--",
  wisdom: "",
};

function createMonsterStore() {
  let storeData;

  const defaultData = {
    monsters: [],
  };

  const localStorageData = localStorage.getItem(STORAGE_ID);

  console.log({ localStorageData });

  if (localStorageData) {
    storeData = JSON.parse(localStorageData);
  } else {
    storeData = defaultData;
  }

  const { subscribe, set, update } = writable(storeData);

  return {
    subscribe,
    set,
    addMonster: (monster) =>
      update((data) => {
        /// check if that monster already exist in the array (has same name)
        const monsterName = monster.name;
        const monsterIndex = data.monsters.findIndex(
          (item) => item.name === monsterName
        );
        /// if not, add it
        if (monsterIndex < 0) {
          data.monsters.push(monster);
        } else {
          /// if yes, update its contents, or just replace it with new monster
          data.monsters[monsterIndex] = monster;
        }

        // set resulting new data to local storage
        localStorage.setItem(STORAGE_ID, JSON.stringify(data));
        return data;
      }),
  };
}

export const monsterStore = createMonsterStore();

// How do I want it to work:
//pull all the monsters and store them in local storage once?
//Just look at local storage when looking up a monster?
//Save to local storage. Write a new monster if name is change.
//add Reset button to pull monster from api
// Have marker if monster has been edited.

// Get the value out of storage on load.

// const stored = localStorage.content;
// // or localStorage.getItem('content')

// // Set the stored value or a sane default.
// export const content = writable(stored || "Hello, World!");

// // Anytime the store changes, update the local storage value.
// content.subscribe((value) => (localStorage.content = value));
// // or localStorage.setItem('content', value)

// //Parse JSON
// export const enabled =
//   writable < User > JSON.parse(localStorage.getItem("user"));
