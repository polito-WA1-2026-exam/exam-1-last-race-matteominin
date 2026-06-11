import express from "express";
import GameDAO from "../dao/GameDAO.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
const gameDAO = new GameDAO();

router.get("/", authMiddleware, async (req, res) => {
    const leaderboard = await gameDAO.getLeaderboard();
    res.json(leaderboard);
});

export default router;