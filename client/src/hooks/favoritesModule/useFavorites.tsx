import { getLocalUserInfo, setLocalUserInfo } from "@/helpers/localstorage";
import { UserInfo } from "@/models/user";
import { API_ENDPOINTS } from "@/server/apiConfig";
import { deleteItem, postItem } from "@/server/services/apiService";
import { useCallback, useState } from "react";

export const useMarkFavorites = () => {
    const [data, setData] = useState<UserInfo>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const userInfo = getLocalUserInfo();

    const markFavorites = useCallback(async (endpointKey: keyof typeof API_ENDPOINTS, data: any) => {
        setLoading(true);
        return postItem<UserInfo>(endpointKey, data, { userId: userInfo?.id })
            .then((response) => {
                if (response.status === 200) {
                    setLocalUserInfo(response.data as UserInfo);
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

    return { data, loading, error, markFavorites };
}

export const useUnMarkFavorites = () => {
    const [data, setData] = useState<UserInfo>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const unMarkFavorites = useCallback(async (endpointKey: keyof typeof API_ENDPOINTS, id: string) => {
        setLoading(true);
        return deleteItem<UserInfo>(endpointKey, null, { favId: id })
            .then((response) => {
                if (response.status === 200) {
                    setLocalUserInfo(response.data as UserInfo);
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

    return { data, loading, error, unMarkFavorites };
}
