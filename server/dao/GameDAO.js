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
                    date
                )
                VALUES (?, ?, ?, ?, ?, ?, ?);
            `;

            const {status, playerId, startStationId, endStationId, coins, route, date} = game;

            db.run(query, 
                [
                    status,
                    playerId,
                    startStationId,
                    endStationId,
                    coins,
                    route,
                    date
                ], function (err) {
                if (err) return reject(err);
                game.id = this.lastID;

                resolve(game);
            })
        });

    }
    
    getActiveGameByPlayerId(playerId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM games
                WHERE player_id = ? AND status = ?;
            `;

            db.get(query, [playerId, GameStatus.STARTED], (err, row) => {
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
                    date: row.date
                });

                resolve(game);
            })
        })    
    }
}

export default GameDAO;