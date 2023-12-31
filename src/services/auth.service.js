import axios from "axios";

let storedURL = `${import.meta.env.VITE_SERVER_URL}/auth`;

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: storedURL || "http://localhost:5005",
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  login = (requestBody) => {
    return this.api.post("/login", requestBody);
  };

  signup = (requestBody) => {
    return this.api.post("/signup", requestBody);
  };

  verify = () => {
    return this.api.get("/verify");
  };
}

const authService = new AuthService();

export default authService;
