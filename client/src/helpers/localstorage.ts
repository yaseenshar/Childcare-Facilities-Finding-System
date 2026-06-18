import { AppContants } from "@/contants/appContants"
import { UserInfo } from "@/models/user";

export const setLocalAuthToken = (token: string) => {
    localStorage.setItem(AppContants.AUTH_TOKEN, token);
}

export const removeLocalAuthToken = () => {
    localStorage.removeItem(AppContants.AUTH_TOKEN);
}

export const setLocalUserInfo = (userInfo: UserInfo) => {
    const userInfoStr = JSON.stringify(userInfo);
    localStorage.setItem(AppContants.USER_INFO, userInfoStr);
}

export const getLocalAuthToken = () => {
    return localStorage.getItem(AppContants.USER_INFO);
}

// USER INFO LOCALSTORAGE METHODS
export const removeLocalUserInfo = () => {
    localStorage.removeItem(AppContants.USER_INFO);
}

export const getLocalUserInfo = (): UserInfo => {
    const localUserData = localStorage.getItem(AppContants.USER_INFO);
    return localUserData ? JSON.parse(localUserData) : {} as UserInfo;
}


