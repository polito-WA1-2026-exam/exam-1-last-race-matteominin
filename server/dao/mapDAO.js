import Station from '../models/map/Station.js';
import Line from '../models/map/Line.js';
import Segment from '../models/map/Segment.js';
import db from '../db/db.js';

const rowsToStations = (rows) => {
    return rows.map(row => new Station(row.id, row.name));
}

const rowsToSegments = (rows) => {
    return rows.map(row => new Segment(row.id, row.station1_id, row.station2_id, row.line_id));
}

const rowsToMap = (rows) => {
    const linesMap = new Map();
    const stationsMap = new Map();
    const segmentsList = [];

    rows.forEach(row => {
        if (!stationsMap.has(row.stat1_id)) {
            stationsMap.set(row.stat1_id, new Station(row.stat1_id, row.stat1_name));
        }

        if (!stationsMap.has(row.stat2_id)) {
            stationsMap.set(row.stat2_id, new Station(row.stat2_id, row.stat2_name));
        }

        if (!linesMap.has(row.line_id)) {
            linesMap.set(row.line_id, new Line(row.line_id, row.line_name));
        }

        segmentsList.push(new Segment(row.id, row.stat1_id, row.stat2_id, row.line_id));
    })

    return {
        lines: Array.from(linesMap.values()),
        stations: Array.from(stationsMap.values()),
        segments: segmentsList
    }
}

class MapDAO {
    getSegments() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM segments';
            db.all(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rowsToSegments(rows));
            })
        })
    }

    getStations() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM stations';

            db.all(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rowsToStations(rows));
            })
        })
    }

    getMap() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    seg.id AS segment_id,
                    l.id AS line_id,
                    l.name AS line_name,
                    stat1.id AS stat1_id,
                    stat1.name AS stat1_name, 
                    stat2.id AS stat2_id,
                    stat2.name AS stat2_name
                FROM segments seg
                JOIN stations stat1 ON stat1.id = seg.station1_id
                JOIN stations stat2 ON stat2.id = seg.station2_id
                JOIN lines l ON l.id = seg.line_id;
            `;

            db.all(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rowsToMap(rows));
            })
        })
    }
}

export default MapDAO;