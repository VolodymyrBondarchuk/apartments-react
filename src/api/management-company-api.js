import config, {url82} from "./backend-url.json";
import axios from "axios";

const ManagementCompanyApi = async () => {

    try {
        let listApartmentsUrl = `${url82}/managementCompanies`;
        let response = await axios.get(listApartmentsUrl);

        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export default ManagementCompanyApi;
