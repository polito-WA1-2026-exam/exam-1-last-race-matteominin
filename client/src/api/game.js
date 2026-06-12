import client from './client.js';

const create = async () => {
    const response = await client.request('/games', {
        method: 'POST'
    })

    if (response.status == 400) {   // TODO: check if it's the correct error code 
        return;
    }

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create a new game');
    }

    return await response.json();
}

const getCurrent = async () => {
    const response = await client.request('/games/current', {
        method: 'GET'
    });

    if (!response.ok) {
        const errorData = await response.json();
        const error = new Error(errorData.message || 'Failed to fetch current game');
        error.status = 404;
        throw error;
    }

    return await response.json();
}

const start = async (gameId) => {
    const response = await client.request(`/games/${gameId}/start`, {
        method: 'PUT'
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to start a new game');
    }

    return await response.json();
}

const getMap = async () => {
    const response = await client.request('/map');

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update the game');
    }

    return await response.json();
}

const verifyAndUpdate = async (route) => {
    const response = await client.request('/games/current', {
        method: 'PUT',
        body: JSON.stringify(route)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update the game');
    }

    return await response.json();
}

const gameAPI = {
    create,
    start,
    getCurrent,
    getMap,
    verifyAndUpdate
}

export default gameAPI;