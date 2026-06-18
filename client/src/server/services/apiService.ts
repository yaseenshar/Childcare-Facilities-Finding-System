// apiService.ts
import { apiInstanceWithAuth, apiInstanceWithoutAuth } from '../axiosConfig';
import { API_ENDPOINTS } from '../apiConfig';
import { AxiosResponse } from 'axios';

const getUrl = (key: keyof typeof API_ENDPOINTS, id?: string | null, pathParams?: Record<string, string | number> | null) => {
    let endpoint = API_ENDPOINTS[key];
    pathParams && Object.keys(pathParams).forEach(param => {
        endpoint = endpoint.replace(`{${param}}`, pathParams[param].toString());
    });
    return id ? `${endpoint}/${id}` : endpoint;
};

export const postWithoutAuthItem = async <T>(endpointKey: keyof typeof API_ENDPOINTS, item: any, pathParams?: Record<string, string | number> | null): Promise<AxiosResponse<T>> => {
    const url = pathParams ? getUrl(endpointKey, null, pathParams) : getUrl(endpointKey);
    return apiInstanceWithoutAuth.post<T>(url, item)
        .then(response => response)
        .catch(handleError);
};


export const getItems = async <T>(endpointKey: keyof typeof API_ENDPOINTS): Promise<AxiosResponse<T>> => {
    const url = getUrl(endpointKey);
    return apiInstanceWithAuth.get<T>(url)
        .then(response => response)
        .catch(handleError);
};

export const getItemById = async <T>(endpointKey: keyof typeof API_ENDPOINTS, id: string) => {
    const url = getUrl(endpointKey, id);
    return apiInstanceWithAuth.get<T>(url)
        .then(response => response)
        .catch(handleError);
};

export const postItem = async <T>(endpointKey: keyof typeof API_ENDPOINTS, item: any, pathParams?: Record<string, string | number> | null): Promise<AxiosResponse<T>> => {
    const url = pathParams ? getUrl(endpointKey, null, pathParams) : getUrl(endpointKey);
    return apiInstanceWithAuth.post<T>(url, item)
        .then(response => response)
        .catch(handleError);
};

export const putItem = async <T>(endpointKey: keyof typeof API_ENDPOINTS, id: string, item: any): Promise<AxiosResponse<T>> => {
    const url = getUrl(endpointKey, id);
    return apiInstanceWithAuth.put<T>(url, item)
        .then(response => response)
        .catch(handleError);
};

export const deleteItem = async<T>(endpointKey: keyof typeof API_ENDPOINTS, id: string | null, pathParams?: Record<string, string | number> | null): Promise<AxiosResponse<T>> => {
    const url = pathParams ? getUrl(endpointKey, id, pathParams) : getUrl(endpointKey, id);
    return apiInstanceWithAuth.delete<T>(url)
        .then(response => response)
        .catch(handleError);
};

function handleError(error: any): Promise<never> {
    console.error("API Call Failed:", error);
    if (error.response) {
        console.error("Response Status:", error.response.status);
        console.error("Response Data:", error.response.data);
        return Promise.reject(error.response);
    } else if (error.request) {
        return Promise.reject(error.request);
    } else {
        return Promise.reject(error.request);
    }
}