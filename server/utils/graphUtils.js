export const calculateDistance = (startId, endId, segments) => {
    const graph = {};

    segments.forEach(seg => {
        if (!graph[seg.station1_id]) graph[seg.station1_id] = [];
        if (!graph[seg.station2_id]) graph[seg.station2_id] = [];

        graph[seg.station1_id].push(seg.station2_id);
        graph[seg.station2_id].push(seg.station1_id);
    });

    const queue = [{id: startId, dist: 0}];
    const visited = new Set();
    visited.add(startId);

    while (queue.length > 0) {
        const {id: current, dist: currentDist} = queue.shift();

        if (current === endId) return currentDist;

        const neighbors = graph[current];

        neighbors.forEach(n => {
            if (!visited.has(n)) {
                visited.add(n);
                queue.push({id: n, dist: currentDist + 1});
            }
        })

    }
    
    return -1;
}