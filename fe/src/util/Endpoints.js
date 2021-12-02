import axios from 'axios';

export async function test() {
    const response = await axios.get(`${process.env.REACT_APP_ITIFN_API}/test`);
    console.log(response.data);
    return response.data;
}

export async function loginEndpoint(username, password) {

    // call to process.env.REACT_APP_ITIFN_API
    axios.post(`${process.env.REACT_APP_ITIFN_API}/api/navigator/login`, {
        username: username,
        password: password
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