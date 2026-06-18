import { UserInfo } from "@/models/user";
import { API_ENDPOINTS } from "@/server/apiConfig";
import { postWithoutAuthItem } from "@/server/services/apiService";
import { useCallback, useState } from "react";

export function useRegistration() {
    const [data, setData] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const userRegistration = useCallback(async (endpointKey: keyof typeof API_ENDPOINTS, item: UserInfo) => {
        setLoading(true);
        return postWithoutAuthItem<UserInfo>(endpointKey, item)
            .then((response) => {
                setData(response.data)
                return response;
            })
            .catch((err) => {
                setError(err)
                return err;
            })
            .finally(() => setLoading(false));
    }, []);

    return { data, loading, error, userRegistration };
}