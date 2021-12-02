import axios from 'axios';

export async function test() {
    const response = await axios.get(`${process.env.REACT_APP_ITIFN_API}/test`);
    console.log(response.data);
    return response.data;
}

export async function loginEndpoint(username, password) {

    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }

    // call to process.env.REACT_APP_ITIFN_API
    axios.post(`${process.env.REACT_APP_ITIFN_API}/login`, {
        username: username,
        password: password
        },{
            headers: headers
        }).then(response => {
            console.log(response.data);
            return response.data;
        }).catch(error => {
            console.log(error);
            return error;
        });

}

export async function isAdmin() {
    
}