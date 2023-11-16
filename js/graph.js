class Graph {
    constructor(points = [], segments = []) {
        this.points = points;
        this.segments = segments;
    }

    addPoint(point) {
        this.points.push(point);
    }

    addSegment(segment) {
        this.segments.push(segment);
    }

    containsPoint(point) {
        return this.points.find((p) => p.equals(point));
    }

    containsSegment(segment) {
        return this.segments.find((s) => s.equals(segment));
    }

    draw(ctx) {
        for (const seg of this.segments) {
            seg.draw(ctx);
        }

        for (const p of this.points) {
            p.draw(ctx);
        }
    }
}
