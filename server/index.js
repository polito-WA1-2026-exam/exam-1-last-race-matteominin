// imports
import express from "express";
import morgan from "morgan";
import globalErrorHandler from "./middleware/errorHandler.js";
import ApiException from "./models/ApiException.js";
import userRoutes from "./routes/userRoutes.js";

// init express
const app = express();
const port = 3001;

// middlewares
app.use(morgan('dev'));
app.use(express.json());

// catch non existing endpoints
app.use((req, res, next) => {
  throw new ApiException(404, `Endpoint ${req.method} ${req.url} not found`);
})

// global error handler
app.use(globalErrorHandler);

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});