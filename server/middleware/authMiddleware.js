import ApiException from "../models/ApiException";

export default authMiddleware = (req, res, next) => {
    if (req.isAuthenticated) {
        return next();
    }

    throw new ApiException(401, "Unauthorized");
}