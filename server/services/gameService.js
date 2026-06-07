import ApiException from "../models/ApiException.js";
import Game from "../models/Game.js";
import { calculateDistance, isRouteValid } from "../utils/graphUtils.js";

class GameService {
    constructor(gameDAO, mapDAO, eventDAO) {
        this.gameDAO = gameDAO;
        this.mapDAO = mapDAO;
        this.eventDAO = eventDAO;
    }

    async startNewGame(playerId) {
        const activeGame = await this.gameDAO.getActiveGameByPlayerId(playerId);

        if (activeGame) {
            throw new ApiException(400, "Player has already an active game");
        }

        const map = await this.mapDAO.getMap();
        const [station1, station2] = this._getRandomStations(map);

        const game = new Game({
            playerId: playerId,
            startStationId: station1.id,
            endStationId: station2.id
        });

        const newGame = await this.gameDAO.createGame(game);
        return newGame;
    }

    _getRandomStations(map) {
        let distance = 0;
        let station1, station2;

        while (distance < 3) {
            station1 = map.stations[Math.floor(Math.random() * map.stations.length)];
            station2 = map.stations[Math.floor(Math.random() * map.stations.length)];

            if (station1.id === station2.id) {
                continue;
            }

            distance = calculateDistance(station1.id, station2.id, map.segments);
        }
        return [station1, station2];
    }

    async verifyAndUpdateGame(playerId, route) {
        const activeGame = await this.gameDAO.getActiveGameByPlayerId(playerId);
        
        if (!activeGame) {
            throw new ApiException(404, "Player doesn't have any active game");
        }

        // TODO: check submission time

        const map = await this.mapDAO.getMap();
        const isValidRoute = isRouteValid(route, map.segments);
        
        let steps = [];
        const events = await this.eventDAO.getEvents();
        if (isValidRoute) {
            steps = await this._executeRoute(activeGame, route, events);
            activeGame.finalizeScore(route);
        } else {
            activeGame.invalidate();
        }
    
        const updatedGame = await this.gameDAO.updateGame(activeGame);
        return {
            game: updatedGame,
            steps
        };
    }

    async _executeRoute(activeGame, route, events) {
        const steps = [];

        for (let i = 0; i < route.length - 1; i++) {
            const event = events[Math.floor(Math.random() * events.length)];
            activeGame.coins += event.effect;

            steps.push({
                fromStationId: route[i],
                toStationId: route[i + 1],
                eventName: event.name,
                eventDescription: event.description,
                effect: event.effect,
                coinsAfterStep: activeGame.coins
            });
        }

        return steps;
    }
}

export default GameService;