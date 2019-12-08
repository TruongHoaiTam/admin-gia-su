import axios from 'axios';

const api_url = 'https://api-admin-gia-su.herokuapp.com';

export function callApiLogin(body) {
    return axios({
        method: 'POST',
        url: `${api_url}/admin/login`,
        data: {
            username: body.username,
            password: body.password
        }
    });
}

export function callApiCreateAdmin(body) {
    console.log(body)
    return axios({
        method: 'POST',
        url: `${api_url}/admin/create-admin`,
        data: {
            username: body.username,
            password: body.password,
            fullname: body.fullname,
            avatar: body.avatar,
        }
    });
}
