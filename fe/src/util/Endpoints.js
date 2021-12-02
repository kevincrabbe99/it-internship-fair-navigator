import axios from 'axios';

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': true
}


// export async function test() {
//     const response = await axios.get(`${process.env.REACT_APP_ITIFN_API}/test`);
//     console.log(response.data);
//     return response.data;
// }

export async function getAvailableYears() {

    // const response = await axios.get(`${process.env.REACT_APP_ITIFN_API}/year`, {}, { headers });

    // console.log("GET YEARS INIT RESPONSE: ", response.data);
    // return response.data;

    return null
}

export async function addNewYear(sessionUUID, year) {

    headers['Authorization'] = sessionUUID;

    const response = await axios.put(`${process.env.REACT_APP_ITIFN_API}/year`, {
        year: year
    }, { headers });

    console.log("ADD YEAR RESPONSE: ", response);
    return response.data;

}

export async function loginEndpoint(username, password) {

    const response = await axios.post(`${process.env.REACT_APP_ITIFN_API}/login`, {
        username,
        password
    }, {
        headers
    });

    console.log("LOGIN RESLPONSE: ", response.data);
    return response.data;

}