const initState = {
    current_user: undefined
};

export default function detail(state = initState, action) {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            state = {
                ...state,
                current_user: action.current_user
            }
            return state;
        case 'CHANGE_STATUS':
            state = {
                ...state,
                current_user: {
                    ...state.current_user,
                    status: action.status
                }
            }
            return state;
        default:
            return state;
    }
}
