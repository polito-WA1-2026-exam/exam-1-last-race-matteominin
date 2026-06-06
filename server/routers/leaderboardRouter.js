import express from "express";
import GameDAO from "../dao/GameDAO.js";

const router = express.Router();
const gameDAO = new GameDAO();

router.get("/", async (req, res) => {
    const leaderboard = await gameDAO.getLeaderboard();
    res.json(leaderboard);
});

export default router;