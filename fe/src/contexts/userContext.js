import { createContext, useContext } from "react";
import { loginEndpoint, logoutEndpoint } from "../util/Endpoints";

export const UserContext = createContext({})


export const loginUser = async (username, password) => {
    const response = await loginEndpoint(username, password)

    localStorage.setItem("adminToken", JSON.stringify(response) )

    return response

}

export const logoutUser = async (sessionUUID) => {

    const res = await logoutEndpoint(sessionUUID)

    return res

}

export const isAdmin = () => {
    // check local storage
    const token = localStorage.getItem("adminToken")
    if (token !== null) {
        return true
    } 

    // TODO: check if admin endpoint

    return false
}