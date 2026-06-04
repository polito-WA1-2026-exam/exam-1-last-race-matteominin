import express from "express";
import UserDAO from "../dao/UserDAO.js";
import ApiException from "../models/ApiException.js";

const router = express.Router();
const userDAO = new UserDAO();

router.get("/:id", async (req, res, next) => {
  	const id = req.params.id;
  	const user = await userDAO.getUserById(id);

  	if (user == null) {
		throw new ApiException(404, `User with id ${id} not found`);
	}
	
	res.json(user);
});

export default router;