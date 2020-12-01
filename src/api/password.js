import { url81 } from "./backend-url.json";
import axios from "axios";

export const sendVerificationCode = async (payload) => {
  try {
    let url = `${url81}/forget-password`;
    let res = await axios.post(url, payload);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const updatePassword = async (ownerId, payload) => {
  try {
    let url = `${url81}/owner/${ownerId}/password`;
    let res = await axios.put(url, payload);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
