import { callApiLogin } from '../utils/apiCaller';

export const actLogin = user => ({
    type: 'LOGIN',
    user
});

export const actLoginErr = () => ({
    type: 'LOGIN_ERR'
});

export const actLoginRequest = user => {
    return dispatch => {
        return callApiLogin(user)
            .then(res => {
                localStorage.setItem('username', res.data.user.username);
                localStorage.setItem('fullname', res.data.user.fullname);
                localStorage.setItem('avatar', res.data.user.avatar);
                localStorage.setItem('token', res.data.token);
                dispatch(actLogin(res.data));
            })
            .catch(() => {
                dispatch(actLoginErr());
            });
    };
};

export const actGetUser = () => {
    return dispatch => {
        dispatch(
            actLogin({
                username: localStorage.getItem('username'),
                fullname: localStorage.getItem('fullname'),
                avatar: localStorage.getItem('avatar'),
                usertoken: localStorage.getItem('token')
            })
        );
    };
};


export const actLogout = () => {
    return dispatch => {
        localStorage.removeItem('username');
        localStorage.removeItem('fullname');
        localStorage.removeItem('avatar');
        localStorage.removeItem('token');
        dispatch(actLogin({ username: undefined, usertoken: undefined }));
    };
};