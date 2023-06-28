import axios from "axios";

const BACKEND_URL = "http://localhost:4000";
const requester = axios.create({
    baseURL:BACKEND_URL,
    withCredentials:true
})

export const signUp = async (payload)=>{
    const response = await requester.post("/signup", payload);
    return response.data;
}
export const login = async (payload)=>{
    const response = await requester.post("/login", payload);
    return response.data;
}
export const homepage = async (payload)=>{
    const response = await requester.post("/homepage", payload);
    return response.data;
}