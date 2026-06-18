import { useAuth } from "@/AuthenticationContext/authContext";
import { getLocalUserInfo } from "@/helpers/localstorage";
import { Profile } from "@/models/profile";
import { UserInfo } from "@/models/user";
import { API_ENDPOINTS } from "@/server/apiConfig";
import { deleteItem, getItemById, getItems, putItem } from "@/server/services/apiService";
import { useCallback, useEffect, useState } from "react";

export function useGetProfile(skip: boolean = false) {
    const [data, setData] = useState<Profile>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const user = getLocalUserInfo();

    const getProfileById = useCallback(async (endpointKey: keyof typeof API_ENDPOINTS, id: string) => {
        setLoading(true);
        return getItemById<Profile>(endpointKey, id)
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

    useEffect(() => {
        if (!skip) {
            console.log("called")
            getProfileById("profile", user?.id);
        }
    }, [skip])

    return { data, loading, error, getProfileById };
}

export function useUpdateProfile() {
    const [data, setData] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const userInfo = getLocalUserInfo();

    const updateProfile = useCallback(async (endpointKey: keyof typeof API_ENDPOINTS, item: Profile) => {
        setLoading(true);
        return await putItem<Profile>(endpointKey, userInfo?.id, item)
            .then((response) => {
                if (response.status === 200) {
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

    return { data, loading, error, updateProfile };
}

export function useDeleteProfile() {
    const [data, setData] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const userInfo = getLocalUserInfo();
    const auth = useAuth();

    const deleteProfile = useCallback(async (endpointKey: keyof typeof API_ENDPOINTS) => {
        setLoading(true);
        return await deleteItem<Profile>(endpointKey, userInfo?.id)
            .then((response) => {
                if (response.status === 200) {
                    auth.logout();
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

    return { data, loading, error, deleteProfile };
}

export function useGetActiveUsers(isSkip?: boolean) {
    const [data, setData] = useState<UserInfo[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const getActiveUsers = useCallback(async (endpointKey: keyof typeof API_ENDPOINTS) => {
        setLoading(true);
        return await getItems<UserInfo[]>(endpointKey)
            .then((response) => {
                debugger
                if (response.status === 200) {
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

    useEffect(() => {
        if (!isSkip) {
            getActiveUsers("usersActive")
        }
    }, [isSkip])

    return { data, loading, error, getActiveUsers };
}


export function useGetInActiveUsers(isSkip?: boolean) {
    const [data, setData] = useState<UserInfo[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const getInActiveUsers = useCallback(async (endpointKey: keyof typeof API_ENDPOINTS) => {
        setLoading(true);
        return await getItems<UserInfo[]>(endpointKey)
            .then((response) => {
                if (response.status === 200) {
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

    useEffect(() => {
        if (!isSkip) {
            getInActiveUsers("usersInActive")
        }
    }, [isSkip])

    return { data, loading, error, getInActiveUsers };
}