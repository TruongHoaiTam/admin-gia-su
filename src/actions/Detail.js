export const actSetCurrentUser = current_user => ({
    type: 'SET_CURRENT_USER',
    current_user
});

export const actChangeStatus = status => ({
    type: 'CHANGE_STATUS',
    status
});