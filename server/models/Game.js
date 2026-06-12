import dayjs from "dayjs";

export const GameStatus = Object.freeze({
    SETUP: "SETUP",
    STARTED: "STARTED",
    WON: "WON",
    LOST: "LOST"
});

class Game {
    constructor({
        id = null, 
        status = GameStatus.SETUP, 
        playerId, 
        startStationId, 
        endStationId, 
        coins = 20, 
        route = null, 
        startedAt = null, 
        createdAt
    }) {
        this.id = id;
        this.status = status;
        this.playerId = playerId;
        this.startStationId = startStationId;
        this.endStationId = endStationId;
        this.coins = coins;
        this.route = typeof route === "string" ? JSON.parse(route) : route;
        this.startedAt = startedAt ? dayjs(startedAt).toISOString() : null;
        this.createdAt = createdAt ? dayjs(createdAt).toISOString() : dayjs().toISOString();
    }

    invalidate(route) {
        this.route = typeof route === "string" ? JSON.parse(route) : route;
        this.status = GameStatus.LOST;
        this.coins = 0;
    }

    finalizeScore(route) {
        this.coins = this.coins > 0 ? this.coins : 0;
        this.status = this.coins > 0 ? GameStatus.WON : GameStatus.LOST;
        this.route = typeof route === "string" ? JSON.parse(route) : route;
    }

    toJSON() {
        const publicData = {
            id: this.id,
            status: this.status,
            playerId: this.playerId,
            coins: this.coins,
            createdAt: this.createdAt,
            startedAt: this.startedAt
        }

        if (this.status !== GameStatus.SETUP) {
            publicData.startStationId = this.startStationId;
            publicData.endStationId = this.endStationId;
            publicData.route = this.route;
        }
        
        return publicData;
    }
}

export default Game;