import { url81 } from "./backend-url.json";
import axios from "axios";

const getApartmentsByInvitationCode = async (invitationCode, method) => {
  try {
    let invitaionCodeUrl = `${url81}/owner/invitation?invitation-code=${invitationCode}`;
    let response = await axios.get(invitaionCodeUrl);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export default getApartmentsByInvitationCode;
