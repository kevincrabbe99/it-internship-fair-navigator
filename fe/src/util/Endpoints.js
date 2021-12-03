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

export async function createTableEndpoint(sessionUUID, x, y, cName, numReps, website, notes, year){
    headers['Authorization'] = sessionUUID;
    console.log('endpoint');
    const response = await axios.put(`${process.env.REACT_APP_ITIFN_API}/table`, {
        'x_coord': x,
        'y_coord': y,
        company:
        {'name': cName,
        'number_of_reps': numReps,
        //'website': website,
        'other_info': notes},
        'year': year
    }, { headers });

    console.log("ADD YEAR RESPONSE: ", response);
    return response.data;
}

export async function updateTableEndpoint(sessionUUID, id, x, y, cName, numReps, website, notes, year){
    headers['Authorization'] = sessionUUID;

    const response = await axios.post(`${process.env.REACT_APP_ITIFN_API}/table`, {
        '_id': id,
        'x_coord': x,
        'y_coord': y,
        company:
        {'name': cName,
        'number_of_reps': numReps,
        'website': website,
        'other_info': notes},
        'year': year
    }, { headers });

    return response.data;
}

export async function getTablesEndpoint(sessionUUID){
    headers['Authorization'] = sessionUUID;

    const response = await axios.get(`${process.env.REACT_APP_ITIFN_API}/tables`, {}, {headers});

    return response.data;
}
