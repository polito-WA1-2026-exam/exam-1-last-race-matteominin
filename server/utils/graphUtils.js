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

export const isRouteValid = (route, segments) => {
    if (!route || !Array.isArray(route) || route.length < 2) {
        return false;
    }
    
    const visitedSegments = new Set();
    for (let i = 0; i < route.length - 1; i++) {
        const currentStationId = route[i];
        const nextStationId = route[i + 1];
        const segment = segments.find(s => {
            return (s.station1_id === currentStationId && s.station2_id === nextStationId) ||
                (s.station1_id === nextStationId && s.station2_id === currentStationId);
        })
        
        if (!segment) {
            return false;
        }

        const segmentKey = `${Math.min(currentStationId, nextStationId)}-${Math.max(currentStationId, nextStationId)}`;
        if (visitedSegments.has(segmentKey)) {
            return false;
        }
        visitedSegments.add(segmentKey);
    }

    return true;
}