import axios from "axios";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = import.meta.env.VITE_OW_KEY;

const getByCity = async (city) => {
    const request = axios.get(`${baseUrl}q=${city}&units=metric&appid=${apiKey}`);
    // console.log(`${baseUrl}q=${city}&units=metric&appid=${apiKey}`);
    const response = await request;
    return response.data;
}

export default {
    getByCity: getByCity,
}