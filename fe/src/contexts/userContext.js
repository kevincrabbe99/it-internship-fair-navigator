import { createContext, useContext } from "react";
import { loginEndpoint } from "../util/Endpoints";

export const UserContext = createContext({})


export const loginUser = async (username, password) => {
    const response = await loginEndpoint(username, password)

    localStorage.setItem("adminToken", JSON.stringify(response) )

    return response

}