export const UPDATE_USER = 'UPDATE_USER';

export const updateUser = (userData) => ({
    type: UPDATE_USER,
    payload: userData,
});