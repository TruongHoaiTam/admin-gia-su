const initState = {
    current_user: undefined,
    current_contract: undefined
};

export default function detail(state = initState, action) {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            state = {
                ...state,
                current_user: action.current_user
            }
            return state;
        case 'SET_CURRENT_CONTRACT':
            state = {
                ...state,
                current_contract: action.current_contract
            }
            return state;
        default:
            return state;
    }
}
