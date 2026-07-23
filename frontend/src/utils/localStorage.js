export const setToken = (token) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const removeToken = () => localStorage.removeItem('token');
export const setUserData = (data) => localStorage.setItem('user', JSON.stringify(data));
export const getUserData = () => JSON.parse(localStorage.getItem('user'));
export const removeUserData = () => localStorage.removeItem('user');