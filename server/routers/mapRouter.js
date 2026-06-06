import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import MapDAO from "../dao/mapDAO.js";

const router = express.Router();

const mapDAO = new MapDAO();

router.get("/", authMiddleware, async (req, res) => {
    const map = await mapDAO.getMap();
    res.json(map);
})

export default router;