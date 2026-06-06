import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import ApiException from "../models/ApiException.js";
import GameDAO from "../dao/GameDAO.js";
import Game from "../models/Game.js";

const router = express.Router();

const gameDAO = new GameDAO();

router.post("/", authMiddleware, async (req, res) => {
    const activeGame = await gameDAO.getActiveGameByPlayerId(req.user.id);

    if (activeGame) {
        throw new ApiException(400, "Player already has an active game");
    }

    const game = new Game({
        playerId: req.user.id
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

    // TODO: update the game
})

export default router;