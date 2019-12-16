import axios from 'axios';

// const api_url = 'https://api-admin-gia-su.herokuapp.com';
const api_url = 'http://localhost:3000'

export function callApiLogin(body) {
    console.log(body)
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

export function callApiAddTag(tag) {
    return axios({
        method: 'POST',
        url: `${api_url}/tag`,
        data: {
            tag
        }
    })
}

export function callApiDeleteTag(tag) {
    return axios({
        method: 'DELETE',
        url: `${api_url}/tag`,
        data: {
            tag
        }
    })
}

export function callApiGetAllTag() {
    return axios({
        method: 'GET',
        url: `${api_url}/tag`
    })
}


export function callApiGetAllUser() {
    return axios({
        method: 'GET',
        url: `${api_url}/user`
    })
}