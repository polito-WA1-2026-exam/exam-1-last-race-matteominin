import db from '../db/db.js';
import Game, {GameStatus} from '../models/Game.js';

class GameDAO {
    createGame(game) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO games (
                    status, 
                    player_id, 
                    start_station_id, 
                    end_station_id, 
                    coins, 
                    route, 
                    started_at,
                    created_at
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);
            `;

            const {status, playerId, startStationId, endStationId, coins, route, startedAt, createdAt} = game;

            db.run(query, 
                [
                    status,
                    playerId,
                    startStationId,
                    endStationId,
                    coins,
                    route,
                    startedAt,
                    createdAt
                ], function (err) {
                if (err) return reject(err);
                game.id = this.lastID;
                resolve(game);
            })
        });
    }

    startGame(userId, gameId, startedAt) {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE games
                SET started_at = ?, status = ?
                WHERE id = ? AND player_id = ?
            `;

            db.run(query, [startedAt, GameStatus.STARTED, gameId, userId], function (err) {
                if (err) return reject(err);
                    
                const selectQuery = "SELECT * FROM games WHERE id = ? AND player_id = ?;";
            
                db.get(selectQuery, [gameId, userId], (err, row) => {
                    if (err) return reject(err);
                    if (!row) return resolve(null);

                    const updatedGame = new Game({
                        id: row.id,
                        status: row.status,
                        playerId: row.player_id,
                        startStationId: row.start_station_id,
                        endStationId: row.end_station_id,
                        coins: row.coins,
                        route: row.route,
                        startedAt: row.started_at,
                        createdAt: row.created_at
                    });

                    resolve(updatedGame);
                })
            })
        })
    }

    // TODO: reduce input params
    updateGame(game) {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE games
                SET status = ?, coins = ?, route = ?
                WHERE id = ?;
            `;

            const {id, status, coins, route} = game;

            db.run(query, [status, coins, route, id], (err) => {
                if (err) return reject(err);
                resolve(game);
            })
        })
    }
    
    getActiveGameByPlayerId(playerId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM games
                WHERE player_id = ? AND status IN (?, ?);
            `;

            db.get(query, [playerId, GameStatus.SETUP, GameStatus.STARTED], (err, row) => {
                if (err) return reject(err);
                if (!row) return resolve(null);

                const game = new Game({
                    id: row.id,
                    status: row.status,
                    playerId: row.player_id,
                    startStationId: row.start_station_id,
                    endStationId: row.end_station_id,
                    coins: row.coins,
                    route: row.route,
                    startedAt: row.started_at,
                    createdAt: row.created_at
                });

                resolve(game);
            })
        })    
    }

    getLeaderboard(limit = 10) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    u.username,
                    MAX(g.coins) AS record
                FROM games g
                JOIN users u ON g.player_id = u.id
                WHERE status = ?
                GROUP BY u.id
                ORDER BY record DESC
                LIMIT ?
            `;

            db.all(query, [GameStatus.WON, limit], (err, rows) => {
                if (err) return reject(err);
                const leaderboard = rows.map(row => ({
                    username: row.username,
                    record: row.record
                }));
                resolve(leaderboard);
            })
        })
    }
}

export default GameDAO;