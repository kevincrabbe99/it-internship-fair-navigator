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

export async function sendFeedback(email, message) {

    const response = await axios.put(`${process.env.REACT_APP_ITIFN_API}/feedback`, {
        email,
        message
    }, {
        headers
    });

    console.log("FEEDBACK RESPONSE: ", response.data);
    return response.data;

}

export async function getAvailableYears() {

    const response = await axios.get(`${process.env.REACT_APP_ITIFN_API}/years`, {}, { headers });

    console.log("GET YEARS INIT RESPONSE: ", response.data);
    return response.data;

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

export async function logoutEndpoint(sessionUUID) {

    headers['Authorization'] = sessionUUID;

    const response = await axios.delete(`${process.env.REACT_APP_ITIFN_API}/logout`, {
        sessionUUID
    }, {
        headers
    });

    console.log("LOGOUT RESPONSE: ", response.data);

}

export async function createTableEndpoint(tableId, x, y, cName, numReps, website, notes, year){
    const response = await axios.post(`${process.env.REACT_APP_ITIFN_API}/table`,
    {
        _id: tableId, 
        _x_coord: x, 
        _y_coord: y, 
        _company: {
                name: cName, 
                _number_of_reps: numReps,
                _website: website, 
                _other_info: notes
        }, 
        _year: year
    }
    
    );
}
