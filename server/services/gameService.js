import dayjs from "dayjs";
import ApiException from "../models/ApiException.js";
import Game from "../models/Game.js";
import { calculateDistance } from "../utils/graphUtils.js";

class GameService {
    constructor(gameDAO, mapDAO, eventDAO) {
        this.gameDAO = gameDAO;
        this.mapDAO = mapDAO;
        this.eventDAO = eventDAO;
    }

    async createGame(playerId) {
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

        return await this.gameDAO.createGame(game);
    }

    async getGame(playerId) {
        const activeGame = await this.gameDAO.getActiveGameByPlayerId(playerId);

        if (!activeGame) {
            throw new ApiException(404, "The player doesn't have any active game");
        }

        return activeGame;;
    }

    async startGame(userId, gameId) {
        const timestamp = dayjs().toISOString();
        const updatedGame = await this.gameDAO.startGame(userId, gameId, timestamp);

        if (!updatedGame) {
            throw new ApiException(404, "Game not found or already started");
        }

        return updatedGame;
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

        const isTimeValid = this._isTimeValid(activeGame.startedAt);

        let steps = [];
        if (!isTimeValid) {
            activeGame.invalidate(route);
        } else {
            const map = await this.mapDAO.getMap();
            const isValidRoute = this._isRouteValid(activeGame, route, map.segments);
            
            const events = await this.eventDAO.getEvents();
            if (isValidRoute) {
                steps = this._executeRoute(activeGame, route, events);
                activeGame.finalizeScore(route);
            } else {
                activeGame.invalidate(route);
            }
        }
    
        const updatedGame = await this.gameDAO.updateGame(activeGame);
        return {
            ...updatedGame,
            steps
        };
    }

    _isTimeValid(startTime) {
        const now = dayjs();
        const start = dayjs(startTime);
        const elapsedSeconds = now.diff(start, 'second');
        
        if (elapsedSeconds > 90 + 3) { 
            return false;
        }

        return true;
    }

    _isRouteValid(activeGame, route, segments) {
        if (!route || !Array.isArray(route) || route.length < 2) {
            return false;
        }

        const firstSegment = route[0];
        if (firstSegment.station1_id !== activeGame.startStationId && firstSegment.station2_id !== activeGame.startStationId) {
            return false;
        }

        const lastSegment = route[route.length - 1];
        if (lastSegment.station1_id !== activeGame.endStationId && lastSegment.station2_id !== activeGame.endStationId) {
            return false;
        }

        const visitedSegments = new Set();
        let currentStationId = activeGame.startStationId;

        for (let i = 0; i < route.length; i++) {
            const segment = route[i];

            const validSegment = segments.find(s => 
                (s.station1_id === segment.station1_id || s.station1_id === segment.station2_id) &&
                (s.station2_id === segment.station1_id || s.station2_id === segment.station2_id)
            )

            if (!validSegment) {
                return false;
            }

            if (segment.station1_id !== currentStationId && segment.station2_id !== currentStationId) {
                return false;
            }

            const segmentKey = `${Math.min(segment.station1_id, segment.station2_id)}-${Math.max(segment.station1_id, segment.station2_id)}`;
            if (visitedSegments.has(segmentKey)) {
                return false;
            }
            visitedSegments.add(segmentKey);

            if (segment.station1_id === currentStationId) {
                currentStationId = segment.station2_id
            } else {
                currentStationId = segment.station1_id
            }
        }

        return true;
    }

    _executeRoute(activeGame, segments, events) {
        const steps = [];

        for (let i = 0; i < segments.length; i++) {
            const event = events[Math.floor(Math.random() * events.length)];
            activeGame.coins += event.effect;

            steps.push({
                fromStationId: segments[i].station1_id,
                toStationId: segments[i].station2_id,
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