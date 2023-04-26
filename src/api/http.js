import axios from "axios";

const $http = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $auth = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = (config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem("accessToken")}`
    return config;
}

$auth.interceptors.request.use(authInterceptor)

export {
    $http,
    $auth
}