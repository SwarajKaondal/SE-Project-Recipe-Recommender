import axios from "axios";

const server = axios.create({ baseURL: "https://se-project-recipe-recommender-production.up.railway.app/" });
//const server = axios.create({ baseURL: "http://localhost:5000/" });

export { server };
