import config, {url82} from "./backend-url.json";
import axios from "axios";

const Users = async () => {


    try {
        let allUsersUrl = `${url82}/personnels`;

        let response = await axios.get(allUsersUrl);

        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export default Users;
