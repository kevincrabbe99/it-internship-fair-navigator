import axios from 'axios';


export async function test() {
    const response = await axios.get('http://localhost:8080/test');
    console.log(response.data);
    return response.data;
}