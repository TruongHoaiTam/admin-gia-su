const initState = {
    data: []
};

export default function manage(state = initState, action) {
    switch (action.type) {
        case 'SAVE_DATA':
            state = {
                ...state,
                data: action.data
            };
            return state;
        default:
            return state;
    }
}
