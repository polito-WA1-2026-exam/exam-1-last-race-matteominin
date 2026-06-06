import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import ApiException from "../models/ApiException.js";
import GameDAO from "../dao/GameDAO.js";
import Game from "../models/Game.js";
import MapDAO from "../dao/mapDAO.js";
import EventDAO from "../dao/eventDAO.js";
import { calculateDistance } from "../utils/graphUtils.js";

const router = express.Router();

const gameDAO = new GameDAO();
const mapDAO = new MapDAO();
const eventDAO = new EventDAO();

router.post("/", authMiddleware, async (req, res) => {
    const activeGame = await gameDAO.getActiveGameByPlayerId(req.user.id);

    if (activeGame) {
        throw new ApiException(400, "Player already has an active game");
    }

    const map = await mapDAO.getMap();

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

    const game = new Game({
        playerId: req.user.id,
        startStationId: station1.id,
        endStationId: station2.id
    });

    const newGame = await gameDAO.createGame(game);
    res.status(201).json(newGame);
})

router.get("/current", authMiddleware, async (req, res) => {
    const activeGame = await gameDAO.getActiveGameByPlayerId(req.user.id);

    if(!activeGame) {
        throw new ApiException(404, "Player doesn't have any active game");
    }

    res.json(activeGame);
})

router.put("/current", authMiddleware, async (req, res) => {
    const activeGame = await gameDAO.getActiveGameByPlayerId(req.user.id);

    if (!activeGame) {
        throw new ApiException(404, "Player doesn't have any active game");
    }

    const { routes } = req.body;
    activeGame.route = route;

    let validRoute = false; 
    // TODO: valide routes

    if (validRoute) {
        const events = await eventDAO.getEvents();
        for (const route of routes) {
            const event = events[Math.floor(Math.random() * events.length)];
            activeGame.coins += event.effect;
        }
    } else {
        activeGame.coins = 0;
    }

    activeGame.status = activeGame.coins > 0 ? GameStatus.WON : GameStatus.LOST;

    const updatedGame = await gameDAO.updateGame(activeGame);
    res.json(updatedGame);
})

export default router;