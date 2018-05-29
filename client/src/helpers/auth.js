export const getToken = () => {
    return localStorage.getItem('token');
}

export const setToken = (token) => {
    return localStorage.setItem('token', token);
}

export const getAxiosConfig = () => {
    return {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }
}

export const removeToken = () => {
    return localStorage.removeItem('token');
}