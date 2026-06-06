import db from "../db/db.js";
import Event from "../models/Event.js";

const rowToEvent = (row) => {
    return new Event(row.id, row.name, row.description, row.effect);
}

class EventDAO {
    getEvents() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM events';
            db.all(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows.map(r => rowToEvent(r)));
            })
        })
    }
}

export default EventDAO;