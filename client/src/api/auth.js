import client from './client.js';

const login = async (username, password) => {
    const response = await client.request('/sessions', {
        method: 'POST',
        body: JSON.stringify({ username, password })
    });
        
    if (response.status === 401) {
        throw new Error("Invalid username or password");
    }
    
    if (!response.ok) {
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

// TODO: fix auth error in console
const getCurrentSession = async () => {
    const response = await client.request('/sessions/current');

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Unknown error (status " + response.status + ")");
    }

    return await response.json();
}

const authAPI = {
    login,
    logout,
    getCurrentSession
}

export default authAPI;