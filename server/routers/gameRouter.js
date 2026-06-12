import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import ApiException from "../models/ApiException.js";
import GameDAO from "../dao/GameDAO.js";
import Game from "../models/Game.js";
import MapDAO from "../dao/mapDAO.js";
import EventDAO from "../dao/eventDAO.js";
import GameService from "../services/gameService.js";
import { GameStatus } from "../models/Game.js";

const router = express.Router();

const gameDAO = new GameDAO();
const gameService = new GameService(gameDAO, new MapDAO(), new EventDAO());


router.post("/", authMiddleware, async (req, res) => {
    const game = await gameService.createGame(req.user.id);
    res.json(game);
})

router.get("/current", authMiddleware, async (req, res) => {
    const game = await gameService.getGame(req.user.id);
    res.json(game);
})

router.put("/:id/start", authMiddleware, async (req, res) => {
    const { id: gameId } = req.params;
    const { id: userId } = req.user;
    const updatedGame = await gameService.startGame(userId, gameId);
    res.json(updatedGame);
})

router.put("/current", authMiddleware, async (req, res) => {
    const route = req.body;
    const result = await gameService.verifyAndUpdateGame(req.user.id, route);
    res.json(result);
})

export default router;