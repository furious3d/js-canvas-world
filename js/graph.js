class Graph {
    constructor(points = [], segments = []) {
        this.points = points;
        this.segments = segments;
    }

    static load(data) {
        let points = [];
        let segments = [];

        try {
            const graphData = JSON.parse(data);
            points = graphData.points.map((p) => new Point(p.x, p.y));
            segments = graphData.segments.map(
                (s) =>
                    new Segment(
                        points.find((p) => p.equals(s.p1)),
                        points.find((p) => p.equals(s.p2))
                    )
            );
        } catch (err) {
            console.error("Invalid graph data stored");
        }

        return new Graph(points, segments);
    }

    getSegmentsByPoint(point) {
        const segs = [];
        this.segments.forEach((s) => {
            if (s.includesPoint(point)) {
                segs.push(s);
            }
        });
        return segs;
    }

    addPoint(point) {
        this.points.push(point);
    }

    addSegment(segment) {
        this.segments.push(segment);
    }

    removePoint(point) {
        const segs = this.getSegmentsByPoint(point);
        segs.forEach((s) => {
            this.removeSegment(s);
        });
        this.points.splice(this.points.indexOf(point), 1);
    }

    removeSegment(seg) {
        this.segments.splice(this.segments.indexOf(seg), 1);
    }

    containsPoint(point) {
        return this.points.find((p) => p.equals(point));
    }

    containsSegment(segment) {
        return this.segments.find((s) => s.equals(segment));
    }

    clear() {
        this.points.length = 0;
        this.segments.length = 0;
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
