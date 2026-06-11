import express from "express";
import morgan from "morgan";
import cors from "cors";
import ApiException from "./models/ApiException.js";

// AUTH Imports
import passport from "passport";
import session from "express-session";
import passportConfig from "./config/passportConfig.js";

// MIDDLEWARE Imports
import globalErrorHandler from "./middleware/errorHandler.js";
import authMiddleware from "./middleware/authMiddleware.js";

// ROUTERS Imports
import authRouter from "./routers/authRouter.js";
import mapRouter from "./routers/mapRouter.js";
import gameRouter from "./routers/gameRouter.js";
import leaderboardRouter from "./routers/leaderboardRouter.js"

const app = express();
const port = 3001;

const corsOptions = {
	origin: 'http://localhost:5173',
	credentials: true,
};

app.use(cors(corsOptions));

app.use(morgan('dev'));
app.use(express.json());

// PASSPORT CONFIG
app.use(session({
	secret: 'session-secret-key',	// TODO: Move to env variable
	resave: false,
	saveUninitialized: false
}))
app.use(passport.authenticate("session"));

passportConfig();

// ROUTES
app.use("/api/v1/sessions", authRouter);
app.use("/api/v1/map", mapRouter);
app.use("/api/v1/games", gameRouter);
app.use("/api/v1/leaderboard", leaderboardRouter);

app.use((req, res, next) => {
	throw new ApiException(404, `Endpoint ${req.method} ${req.url} not found`);
})

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

// START SERVER
app.listen(port, (err) => {
	if (err) {
		console.error("Error starting server:", err);
		return;
	}

	console.log(`Server listening at http://localhost:${port}`);
});