import { url82 } from "./backend-url.json";
import axios from "axios";

export const getAllPersonnels = async () => {
  try {
    let url = `${url82}/personnels`;
    let res = await axios.get(url);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
