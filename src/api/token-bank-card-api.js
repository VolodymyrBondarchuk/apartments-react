import config, {url81} from "./backend-url.json";
import axios from "axios";

const GetCardByUserApi = async (userId) => {

    try {
        let tokenAndCardUrl = `${url81}/payment/token?user-id=`+userId;
        let response = await axios.get(tokenAndCardUrl);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export default GetCardByUserApi;
