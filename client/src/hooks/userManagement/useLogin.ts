import { useAuth } from "@/AuthenticationContext/authContext";
import { setLocalUserInfo } from "@/helpers/localstorage";
import { User, UserInfo } from "@/models/user";
import { API_ENDPOINTS } from "@/server/apiConfig";
import { postWithoutAuthItem } from "@/server/services/apiService";
import { useCallback, useState } from "react";

export function useLogin() {
    const [data, setData] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const auth = useAuth();

    const login = useCallback(async (endpointKey: keyof typeof API_ENDPOINTS, item: User) => {
        setLoading(true);
        return await postWithoutAuthItem<UserInfo>(endpointKey, item)
            .then((response) => {
                if (response.status === 200) {
                    auth.login(response.data);
                    setData(response.data)
                }
                return response;
            })
            .catch((err) => {
                setError(err)
                return err;
            })
            .finally(() => setLoading(false));
    }, []);

    return { data, loading, error, login };
}