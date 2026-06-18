import { UserInfo } from "@/models/user";

export const checkIsPowerUser = (user:UserInfo) => {
    const powerUser = user.roles?.filter(x => x === "POWER_USER");
    const isPowerUser = powerUser ? powerUser.length > 0 : false;
    return isPowerUser;
}