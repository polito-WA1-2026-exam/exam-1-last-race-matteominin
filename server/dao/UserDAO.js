import db from '../db/db.js';
import User from '../models/User.js';

const mapRowToUser = (row) => {
    return new User(row.id, row.username, row.hash, row.salt);
}

class UserDAO {
    getUserById(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE id = ?';
            db.get(query, [id], (err, row) => {
                if (err) return reject(err);

                if (row == null) {
                    resolve(null);
                } else {
                    const user = mapRowToUser(row);
                    resolve(user);
                }
            })
        })
    }

    getUserByUsername(username) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE username = ?";
            db.get(query, [username], (err, row) => {
                if (err) return reject(err);

                if (row == null) {
                    resolve(null);
                } else {
                    const user = mapRowToUser(row);
                    resolve(user);
                }
            })
        })
    }
}

export default UserDAO;