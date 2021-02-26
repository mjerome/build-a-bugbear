// Monster.js
// Implementations for all the calls for the Monster endpoints.
import Api from "../services/Api";

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
export const getMonsterByName = async(name) => {
    try {
      const response = await Api.get(`/monsters/${name}`);
      return response;
    } catch (error) {
      console.error(error);
    }
};