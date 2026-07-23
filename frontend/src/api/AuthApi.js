import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api/auth",
    headers: {
        "Content-Type": "application/json",
    },
});

export const registerUser = (userData) => {
    return API.post("/register", userData);
};