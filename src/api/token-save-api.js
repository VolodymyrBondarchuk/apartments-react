import config, {url81} from "./backend-url.json";
import axios from "axios";

const TokenSaveApi = async (payload) => {

    try {
        let tokenSaveUrl = `${url81}/payment/token`;
        //debugger;
        let response = await axios.post(tokenSaveUrl, payload);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export default TokenSaveApi;
