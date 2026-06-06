import express from "express";
import UserDAO from "../dao/UserDAO.js";
import ApiException from "../models/ApiException.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
const userDAO = new UserDAO();

router.get("/current", authMiddleware, async (req, res) => {
  	const user = await userDAO.getUserById(req.user.id);

  	if (user == null) {
		throw new ApiException(404, `User with not found`);
	}
	
	res.json(user);
});

export default router;