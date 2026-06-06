import ApiException from "../models/ApiException.js";

const authMiddleware = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    throw new ApiException(401, "Unauthorized");
}

export default authMiddleware;