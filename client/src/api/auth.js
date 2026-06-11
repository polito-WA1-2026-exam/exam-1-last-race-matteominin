import client from './client.js';

const login = async (username, password) => {
    const response = await client.request('/sessions', {
        method: 'POST',
        body: JSON.stringify({ username, password })
    });
        
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error("Invalid username or password");
        }
        throw new Error("Unknown error (status " + response.status + ")");
    }

    return await response.json();
}

const logout = async () => {
    const response = await client.request('/sessions/current', {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error("Impossible to logout, try again later");
    }
}

const getCurrentSession = async () => {
    const response = await client.request('/sessions/current');

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error("No active session");
        }
        throw new Error("Unknown error (status " + response.status + ")");
    }

    return await response.json();
}

const authAPI = {
    login,
    logout,
    getCurrentSession
}

export default authAPI;