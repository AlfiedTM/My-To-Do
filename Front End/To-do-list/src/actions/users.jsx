import { signIn } from "../api";
import { setAuthToken } from "../api";

export const LogIn = async  (payload) => {
    try {
        const {data} = await signIn(payload);
        // onSuccess();
        (data.statusCode==200 && setAuthToken(data))
          
        return data;
    } catch (error) {
        // onError();
    }
}
