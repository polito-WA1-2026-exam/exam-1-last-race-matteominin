import express from "express";
import passport from "passport";
import ApiException from "../models/ApiException.js";
const router = express.Router();

router.post("/", passport.authenticate("local"), (req, res) => {
    return res.status(201).json({
        "id": req.user.id,
        "username": req.user.username
    });
})

router.get("/current", (req, res) => {
    if (!req.isAuthenticated()) {
        throw new ApiException(401, "Not authenticated");
    } 
    
    res.json({
        "id": req.user.id,
        "username": req.user.username
    });
})

router.delete("/current", (req, res) => {
    req.logOut(() => {
        res.end();
    });
})

export default router;