import axios from "axios";

const API_URL = "http://192.167.1.94:8000";


export const axiosInstance =  axios.create({
    baseURL : API_URL,
    headers : {
        "Content-Type" : "application/json"
    }
});

export const axiosPrivateInstance = axios.create({
    baseURL : API_URL,
    headers : {
        "Content-Type" : "application/json"
    }
})