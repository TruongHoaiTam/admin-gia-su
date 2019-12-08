const initState = {
    username: undefined,
    fullname: undefined,
    avatar: undefined,

    token: undefined,

    err: undefined
};

export default function auth(state = initState, action) {
    switch (action.type) {
        case 'LOGIN':
            state = {
                ...state,
                username: action.user.username,
                fullname: action.user.fullname,
                avatar: action.user.avatar,
                token: action.user.token,
                err: undefined
            };
            return state;
        case 'LOGIN_ERR': {
            state = {
                ...state,
                username: undefined,
                fullname: undefined,
                avatar: undefined,
                token: undefined,
                err: 400
            };
            return state;
        }
        default:
            return state;
    }
}
