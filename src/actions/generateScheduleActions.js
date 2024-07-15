import axios from "axios";
import { BASE_URL } from "./baseUrl";

export const getAllAssests = async (plantId = "") => {
  try {
    const response = await axios.get(`${BASE_URL}/api/assets/${plantId}`);
    return response.data;
  } catch (error) {
    console.error("An error occurred:", error);
    return error;
  }
};
