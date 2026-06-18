import { FacilitiesTypes } from "@/models/facilities";
import { Facilities, updateFacilities } from "@/redux/reducers/facilitiesSlice";
import { AppDispatch } from "@/redux/store";
import { API_ENDPOINTS } from "@/server/apiConfig";
import { getItems, postItem } from "@/server/services/apiService";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useFacilitiesTypes = (skip: boolean = false) => {
    const [data, setData] = useState<FacilitiesTypes[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const getFacilitiesTypes = useCallback(async (endpointKey: keyof typeof API_ENDPOINTS) => {
        setLoading(true);
        return getItems<FacilitiesTypes[]>(endpointKey)
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
            getFacilitiesTypes("facilitiesTypes");
        }
    }, [skip])

    return { data, loading, error, getFacilitiesTypes };
}


export const useFacilitiesLocation = () => {
    const [data, setData] = useState<FacilitiesTypes[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const dispatch = useDispatch<AppDispatch>();

    const getFacilitiesLocation = useCallback(async (endpointKey: keyof typeof API_ENDPOINTS, data: any) => {
        setLoading(true);
        return postItem<Facilities[]>(endpointKey, data)
            .then((response) => {
                if (response.status === 200) {
                    dispatch(updateFacilities(response.data))
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

    return { data, loading, error, getFacilitiesLocation };
}

