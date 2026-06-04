import crypto from "crypto";
import passport from "passport";
import LocalStrategy from "passport-local"
import UserDAO from "../dao/UserDAO.js";

const userDAO = new UserDAO();

const passportConfig = () => {
    passport.use(new LocalStrategy(async function verify(username, password, cb) {
        try {
            const user = await userDAO.getUserByUsername(username);
            if (!user) return cb(null, false, { message: 'Incorrect username or password.' });

            crypto.scrypt(password, user.salt, 64, (err, hashedPassword) => {
                if (err) return cb(err);

                if (!crypto.timingSafeEqual(Buffer.from(user.hash, "hex"), hashedPassword)) {
                    return cb(null, false, { message: "Incorrect username or password."});
                }

                cb(null, user);
            })
        } catch (err) {
            cb(err);
        }
    }));

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    })

    passport.deserializeUser(async (id, cb) => {
        try {
            const user = await userDAO.getUserById(id);
            if (!user) return cb(null, false);

            cb(null, user);
        } catch(err) {
            cb(err);
        }
    })
}

export default passportConfig;