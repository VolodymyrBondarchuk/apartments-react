import config, {url81} from "./backend-url.json";
import axios from "axios";

const PayByCardApi = async (payload) => {

    try {
        let payByCardUrl = `${url81}/payment/by/card`;
        //debugger;
        let response = await axios.post(payByCardUrl, payload);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export default PayByCardApi;
