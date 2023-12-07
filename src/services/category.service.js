import axios from "axios";

let storedURL = import.meta.env.REACT_APP_SERVER_URL;

class CategoryService {
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
  // all category fields are needed in the requestbody
  createCategory = async (requestBody) => {
    return this.api.post("/categories", requestBody);
  };

  getCategoriesList = async () => {
    return this.api.get("/categories");
  };

  getCategory = async (categoryId) => {
    return this.api.get(`/categories/${categoryId}`);
  };

  editCategory = async (categoryId, requestBody) => {
    return this.api.put(`/categories/${categoryId}`, requestBody);
  };

  deleteCategory = async (categoryId) => {
    return this.api.delete(`/categories/${categoryId}`)
  }
}

const categoryService = new CategoryService();

export default categoryService;
