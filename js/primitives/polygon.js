class Polygon {
    constructor(points) {
        this.points = points;
        this.segments = [];
        for (let pIdx = 1; pIdx <= this.points.length; pIdx++) {
            this.segments.push(new Segment(this.points[pIdx - 1], this.points[pIdx % this.points.length]));
        }
    }

    static break(poly1, poly2) {
        const segs1 = poly1.segments;
        const segs2 = poly2.segments;
        const intersections = [];
        segs1.forEach((s1) => {
            segs2.forEach((s2) => {
                const ints = getIntersection(s1.p1, s1.p2, s2.p1, s2.p2);

                if (ints && ints.offset != 1 && ints.offset != 0) {
                    intersections.push(new Point(ints.x, ints.y));
                }
            });
        });

        return intersections;
    }

    draw(ctx, { stroke = "#0000ff", lineWidth = 2, fill = "rgba(0, 100, 255, 0.3)" } = {}) {
        ctx.beginPath();
        ctx.fillStyle = fill;
        ctx.strokeStyle = stroke;
        ctx.lineWidth = lineWidth;
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (let pIdx = 1; pIdx < this.points.length; pIdx++) {
            ctx.lineTo(this.points[pIdx].x, this.points[pIdx].y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}
