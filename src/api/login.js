import config, {url81} from "./backend-url.json";
import axios from "axios";
import Cookies from 'universal-cookie';

const Login = async (payload, method) => {


    try {
        let loginUrl = `${url81}/login`;
        console.log(method);

        let response = await axios.post(loginUrl, payload);

        //save into cookie
        let userData = response.data.data;
        let user = {
            "id": userData.id,
            "name": userData.name,
            "agreement_code": userData.agreement_code,
            "phone_number": userData.phone_number,
            "bin": userData.bin,
            "iin": userData.lin,
            "invitation_code": userData.invitation_code,
            "is_active": userData.is_active,
            "is_management": userData.is_management
        };

        //debugger;
        const cookies = new Cookies();
        cookies.set('user', JSON.stringify(user), { path: '/' });


        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export default Login;
