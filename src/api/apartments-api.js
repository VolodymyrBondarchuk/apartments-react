import config, {url82} from "./backend-url.json";
import axios from "axios";

const ApartmentsListApi = async () => {

    try {
        let listApartmentsUrl = `${url82}/apartments`;
        let response = await axios.get(listApartmentsUrl);

        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export default ApartmentsListApi;
