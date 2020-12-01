import config, {url82} from "./backend-url.json";
import axios from "axios";

const InvoiceServicesApi = async () => {

    try {
        let listMonthsBillsUrl = `${url82}/invoice/services`;
        let response = await axios.get(listMonthsBillsUrl);

        //debugger
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export default InvoiceServicesApi;
