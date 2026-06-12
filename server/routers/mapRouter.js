import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import MapDAO from "../dao/mapDAO.js";
import ApiException from "../models/ApiException.js";

const router = express.Router();

const mapDAO = new MapDAO();

router.get("/", authMiddleware, async (req, res) => {
    const map = await mapDAO.getMap();
    if (!map) {
        throw new ApiException(500, "Can't load map, try again later");
    }
    res.json(map);
})

export default router;