import config, {url81} from "./backend-url.json";
import axios from "axios";

const PayByTokenApi = async (payload) => {

    try {
        let payByTokenUrl = `${url81}/payment/by/token`;
        //debugger;
        let response = await axios.post(payByTokenUrl, payload);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export default PayByTokenApi;
