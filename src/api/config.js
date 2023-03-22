import axios from "axios";


const instanceAxios = axios.create({
    baseURL: 'http://localhost:4000'
})

export default instanceAxios