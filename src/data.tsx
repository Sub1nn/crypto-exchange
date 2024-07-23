import axios from "axios";

const BASE_URL = "https://coinpaprika1.p.rapidapi.com/exchanges";
const API_KEY = "89ab79ab45msh68623eb778e3385p1d6711jsna19042969ca3";

const options = {
  headers: {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": "coinpaprika1.p.rapidapi.com",
  },
};

export const FetchDataFromApi = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}`, options);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
