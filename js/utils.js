function getNearestPoint(location, points, area = Number.MAX_SAFE_INTEGER) {
    let minDist = Number.MAX_SAFE_INTEGER;
    let nearest = null;

    for (const p of points) {
        const dist = distance(location, p);
        if (dist < minDist && dist <= area) {
            minDist = dist;
            nearest = p;
        }
    }

    return nearest;
}

function distance(p1, p2) {
    return Math.hypot(p2.x - p1.x, p2.y - p1.y);
}