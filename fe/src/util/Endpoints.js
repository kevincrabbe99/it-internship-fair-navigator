import axios from 'axios';


export async function test() {
    const response = await axios.get(`${process.env.REACT_APP_ITIFN_API}test`);
    console.log(response.data);
    return response.data;
}