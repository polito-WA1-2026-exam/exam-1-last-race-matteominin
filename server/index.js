import express from "express";
import morgan from "morgan";
import ApiException from "./models/ApiException.js";

// AUTH Imports
import passport from "passport";
import session from "express-session";
import passportConfig from "./config/passportConfig.js";

// MIDDLEWARE Imports
import globalErrorHandler from "./middleware/errorHandler.js";

// ROUTES Imports
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = 3001;

app.use(morgan('dev'));
app.use(express.json());

// PASSPORT CONFIG
app.use(session({
	secret: 'session-secret-key',
	resave: false,
	saveUninitialized: false
}))
app.use(passport.authenticate("session"));

passportConfig();

// ROUTES
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/sessions", authRoutes);

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