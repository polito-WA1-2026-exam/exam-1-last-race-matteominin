import client from './client.js';

const getLeaderboard = async () => {
    const response = await client.request("/leaderboard");

    if (!response.ok) {
        throw new Error("Failed to fetch leaderboard");
    }

    return await response.json();
}

const leaderboardAPI = {
    getLeaderboard
}

export default leaderboardAPI;