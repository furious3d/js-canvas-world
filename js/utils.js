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

function getNearestSegment(location, segments, area = Number.MAX_SAFE_INTEGER) {
    let minDist = Number.MAX_SAFE_INTEGER;
    let nearest = null;

    for (const s of segments) {
        const dist = s.distanceToPoint(location);
        if (dist < minDist && dist <= area) {
            minDist = dist;
            nearest = s;
        }
    }

    return nearest;
}

function distance(p1, p2) {
    return Math.hypot(p2.x - p1.x, p2.y - p1.y);
}

function getSegmentMiddlePoint(p1, p2) {
    return new Point(
        (p1.x + p2.x) / 2,
        (p1.y + p2.y) / 2,
    );
}

function dot(p1, p2) {
    return p1.x * p2.x + p1.y * p2.y;
}

function add(p1, p2) {
    return new Point(p1.x + p2.x, p1.y + p2.y);
}

function subtract(p1, p2) {
    return new Point(p1.x - p2.x, p1.y - p2.y);
}

function scale(p, scaleVal) {
    return new Point(p.x * scaleVal, p.y * scaleVal);
}

function normalize(p) {
    return scale(p, 1 / magnitude(p));
}

function magnitude(p) {
    return Math.hypot(p.x, p.y);
}

function perpendicular(p) {
    return new Point(-p.y, p.x);
}

function translate(location, alpha, offset) {
    return new Point(location.x + Math.cos(alpha) * offset, location.y + Math.sin(alpha) * offset);
}

function angle(v) {
    return Math.atan2(v.y, v.x);
}

function getIntersection(a, b, c, d) {
    const tTop = (d.x - c.x) * (a.y - c.y) - (d.y - c.y) * (a.x - c.x);
    const uTop = (c.y - a.y) * (a.x - b.x) - (c.x - a.x) * (a.y - b.y);
    const bottom = (d.y - c.y) * (b.x - a.x) - (d.x - c.x) * (b.y - a.y);

    const eps = 0.001;
    if (Math.abs(bottom) > eps) {
        const t = tTop / bottom;
        const u = uTop / bottom;
        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            return {
                x: lerp(a.x, b.x, t),
                y: lerp(a.y, b.y, t),
                offset: t,
            };
        }
    }

    return null;
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function lerp2D(a, b, t) {
    return new Point(lerp(a.x, b.x, t), lerp(a.y, b.y, t));
}
