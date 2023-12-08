import axios from "axios";

let storedURL = import.meta.env.REACT_APP_SERVER_URL;

class GameService {
  constructor() {
    this.api = axios.create({
      baseURL: storedURL || "http://localhost:5005/api",
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }
  // all game fields are needed in the requestbody
  createGame = async (requestBody) => {
    return this.api.post("/games", requestBody);
  };

  getGamesList = async () => {
    return this.api.get("/games");
  };

  getGame = async (gameId) => {
    return this.api.get(`/games/${gameId}`);
  };

  getGameAndCategories = async (gameId) => {
    return this.api.get(`/games/${gameId}/categories`);
  };

  editGame = async (gameId, requestBody) => {
    return this.api.put(`/games/${gameId}`, requestBody);
  };

  deleteGame = async (gameId) => {
    return this.api.delete(`/games/${gameId}`)
  }
}

const gameService = new GameService();

export default gameService;
