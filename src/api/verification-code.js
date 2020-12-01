import { url81 } from "./backend-url.json";
import axios from "axios";

export const sendVerificationCode = async (payload) => {
  try {
    let sendVerificatonCodeUrl = `${url81}/send/verification`;
    let res = await axios.post(sendVerificatonCodeUrl, payload);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const confirmCode = async (payload) => {
  try {
    let verifyCodeUrl = `${url81}/verification/verify`;
    let res = await axios.post(verifyCodeUrl, payload);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
