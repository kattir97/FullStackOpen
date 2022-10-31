import axios from "axios";

const baseUrl = "https://restcountries.com/v3.1/all";

export const getCountry = () => axios.get(`${baseUrl}`);
