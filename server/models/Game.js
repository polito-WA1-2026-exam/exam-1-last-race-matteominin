import dayjs from "dayjs";

export const GameStatus = Object.freeze({
    STARTED: "STARTED",
    WON: "WON",
    LOST: "LOST"
});

class Game {
    constructor({id = null, status = GameStatus.STARTED, playerId, startStationId, endStationId, coins = 20, route = null, date}) {
        this.id = id;
        this.status = status;
        this.playerId = playerId;
        this.startStationId = startStationId;
        this.endStationId = endStationId;
        this.coins = coins;
        this.route = typeof route === "string" ? JSON.parse(route) : route;
        this.date = date ? dayjs(date).toISOString() : dayjs().toISOString();
    }

    invalidate() {
        this.status = GameStatus.LOST;
        this.coins = 0;
    }

    finalizeScore(route) {
        this.coins = this.coins > 0 ? this.coins : 0;
        this.status = this.coins > 0 ? GameStatus.WON : GameStatus.LOST;
        this.route = typeof route === "string" ? JSON.parse(route) : route;
    }
}

export default Game;