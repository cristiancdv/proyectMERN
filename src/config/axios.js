import axios from "axios";
import { apiConfig } from "./config";


export default axios.create({
    baseURL: `${apiConfig.host}:${apiConfig.port}`
})