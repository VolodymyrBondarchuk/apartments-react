import config, {url81} from "./backend-url.json";
import axios from "axios";

const RefundApi = async (payload) => {

    try {
        let refundUrl = `${url81}/payment/refund`;
        //debugger;
        let response = await axios.post(refundUrl, payload);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export default RefundApi;
