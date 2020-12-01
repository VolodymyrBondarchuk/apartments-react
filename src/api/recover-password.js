import { url81 } from "./backend-url.json";
import axios from "axios";
export const SendVerificationCodeForPassRecovery = async (payload) => {
  try {
    let url = `${url81}/forget-password`;
    let res = await axios.post(url, payload);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const resetPassword = async (owner_id, payload) => {
  try {
    let updatePasswordUrl = `${url81}/owner/${owner_id}/password`;
    let res = await axios.put(updatePasswordUrl, payload);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
