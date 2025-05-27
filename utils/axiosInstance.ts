import axios from "axios";


const API = axios.create({
    baseURL: "https://pineleaflaravel.sunmence.com.ng"
})




export const fetchAllProperty = ()=>API.get(`/public/api/properties/search`)
export const loginUSer = (data:object)=> API.post(`/public/api/realtor/login`, data)
export const createUser = (data:object)=> API.post(`/public/api/realtor/register`, data)
export const createProperty = (data:object)=> API.post(`/public/api/properties/create`, data)


