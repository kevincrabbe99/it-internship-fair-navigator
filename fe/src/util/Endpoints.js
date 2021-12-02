import axios from 'axios';

export async function test() {
    const response = await axios.get(`${process.env.REACT_APP_ITIFN_API}/test`);
    console.log(response.data);
    return response.data;
}

export async function loginEndpoint(username, password) {

    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_ITIFN_API}`
    }

    // call to process.env.REACT_APP_ITIFN_API


    // axios post call to process.env.REACT_APP_ITIFN_API/login
    // pass username and password as parameters
    // include CORS hearder
    // return response.data
    const response = await axios.post(`${process.env.REACT_APP_ITIFN_API}/login`, {
        username,
        password
    }, {
        headers
    });

    console.log("LOGIN RESLPONSE: ", response);

    return response.data;

}

export async function isAdmin() {
    
}