import { createContext } from "react";
import { loginEndpoint } from "../util/Endpoints";

export const UserContext = createContext(null)


export const loginUser = async (username, password) => {
    const response = await loginEndpoint(username, password)

    if (response && response.sessionuuid) {
        return response.sessionToken
    }

    return null

}