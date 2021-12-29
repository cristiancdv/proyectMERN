import axios from "axios";
import { apiConfig } from "./config";


export default axios.create({
    baseURL: `${apiConfig.host}`

})
// console.log('crear', apiConfig.host, apiConfig.port);