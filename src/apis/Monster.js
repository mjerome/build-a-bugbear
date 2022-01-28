// Monster.js
// Implementations for all the calls for the Monster endpoints.
import Api from "../services/Api";
import { searchError, STORAGE_ID, localMonster } from "../stores";

export const editMonster = (editedResponse) => {
  // console.log('editMonster called', editedResponse);
  for (const [key, value] of Object.entries(editedResponse)) {
    // console.log('response ', editedResponse[key], typeof editedResponse[key]);
    if (
      typeof editedResponse[key] === "object" &&
      editedResponse[key] != null
    ) {
      // console.log('objects ', editedResponse[key]);
      Object.keys(editedResponse[key]).forEach((item) => {
        if (!editedResponse[key][item].desc) {
          editedResponse[key][item] = {
            desc: editedResponse[key][item],
            name: Object.keys(editedResponse[key]).find(
              (lock) => editedResponse[key][lock] === editedResponse[key][item]
            ),
          };
        }
        return editedResponse;
      });
    }
    // console.log('monster block manipulated', response);
  }
};

// Method to get a list of all Monster
export const getMonsterList = async () => {
  try {
    const response = await Api.get("/monsters");
    return response.results;
  } catch (error) {
    console.error(error);
  }
};

// Get a Monster details by name
export const getMonsterByName = async (name) => {
  try {
    let storeData = localStorage.getItem(STORAGE_ID);
    let localMonster;
    let response;
    if (storeData) {
      storeData = JSON.parse(storeData);
      console.log({ storeData });
      localMonster = storeData.monsters.find(
        (item) => item.name.replaceAll(" ", "-").toLowerCase() === name
      );
    }
    console.log(search);
    console.log(localMonster);
    response = localMonster ? localMonster : await Api.get(`/monsters/${name}`);
    searchError.set(false);
    let editedResponse = response;
    editMonster(editedResponse);

    return editedResponse;
  } catch (error) {
    console.error(error);
    searchError.set(true);
  }
};
