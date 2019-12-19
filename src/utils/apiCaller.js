import axios from 'axios';

// const api_url = 'https://api-admin-gia-su.herokuapp.com';
const api_admin_url = 'http://localhost:3002';
const api_user_url = 'http://localhost:3000'

export function callApiLogin(body) {
    return axios({
        method: 'POST',
        url: `${api_admin_url}/admin/login`,
        data: {
            username: body.username,
            password: body.password
        }
    });
}

export function callApiCreateAdmin(body) {
    return axios({
        method: 'POST',
        url: `${api_admin_url}/admin/create-admin`,
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
        url: `${api_admin_url}/tag`,
        data: {
            tag
        }
    })
}

export function callApiDeleteTag(tag) {
    return axios({
        method: 'DELETE',
        url: `${api_admin_url}/tag`,
        data: {
            tag
        }
    })
}

export function callApiGetAllTag() {
    return axios({
        method: 'GET',
        url: `${api_admin_url}/tag`
    })
}


export function callApiGetAllUser() {
    return axios({
        method: 'GET',
        url: `${api_user_url}/user`
    })
}

export function callApiGetAllContract() {
    return axios({
        method: 'GET',
        url: `${api_admin_url}/contract`
    })
}

export function callApiChangeStatus(item) {
    return axios({
        method: 'PUT',
        url: `${api_user_url}/status`,
        data: item
    })
}

export function callApiChangeStatusContractAdmin(item) {
    return axios({
        method: 'PUT',
        url: `${api_admin_url}/contract/status`,
        data: item
    })
}

export function callApiChangeStatusContractUser(item) {
    return axios({
        method: 'PUT',
        url: `${api_user_url}/contract/status`,
        data: item
    })
}

