import Axios from "axios";
import { baseUrl, headerOptions } from "../../constants";

function returnAxiosInstance() {
    return Axios.create();
}

export function Get(path) {
    const axios = returnAxiosInstance();
    return axios.get(`${baseUrl}/${path}`,  { withCredentials: true }, headerOptions);
}

export function Post(path, requestData) {
    const axios = returnAxiosInstance();
    return axios.post(`${baseUrl}/${path}`, requestData, { withCredentials: true }, headerOptions);
}

export function Update(path, updateData) {
    const axios = returnAxiosInstance();
    return axios.patch(`${baseUrl}/${path}`, updateData, { withCredentials: true }, headerOptions);
}

export function Delete(path, data) {
    const axios = returnAxiosInstance();
    return axios.delete(`${baseUrl}/${path}`, {data: {...data}}, { withCredentials: true }, headerOptions);
}
