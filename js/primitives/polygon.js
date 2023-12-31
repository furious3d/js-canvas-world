class Polygon {
    constructor(points) {
        this.points = points;
        this.segments = [];
        for (let pIdx = 1; pIdx <= this.points.length; pIdx++) {
            this.segments.push(new Segment(this.points[pIdx - 1], this.points[pIdx % this.points.length]));
        }
    }

    static union(polygons) {
        Polygon.breakAll(polygons);
        const keptSegments = [];
        for (let i = 0; i < polygons.length; i++) {
            for (const seg of polygons[i].segments) {
                let keep = true;
                for (let j = 0; j < polygons.length; j++) {
                    if (i == j) continue;
                    if (polygons[j].containsSegment(seg)) {
                        keep = false;
                        break;
                    }
                }
                if (keep) {
                    keptSegments.push(seg);
                }
            }
        }
        return keptSegments;
    }

    static breakAll(polygons) {
        for (let i = 0; i < polygons.length - 1; i++) {
            for (let j = i + 1; j < polygons.length; j++) {
                Polygon.break(polygons[i], polygons[j]);
            }
        }
    }

    static break(poly1, poly2) {
        const segs1 = poly1.segments;
        const segs2 = poly2.segments;
        for (let i1 = 0; i1 < segs1.length; i1++) {
            for (let i2 = 0; i2 < segs2.length; i2++)  {
                const ints = getIntersection(segs1[i1].p1, segs1[i1].p2, segs2[i2].p1, segs2[i2].p2);

                if (ints && ints.offset != 1 && ints.offset != 0) {
                    const iPoint = new Point(ints.x, ints.y);
                    let tmpPoint = segs1[i1].p2;
                    segs1[i1].p2 = iPoint;
                    segs1.splice(i1 + 1, 0, new Segment(iPoint, tmpPoint));
                    tmpPoint = segs2[i2].p2;
                    segs2[i2].p2 = iPoint;
                    segs2.splice(i2 + 1, 0, new Segment(iPoint, tmpPoint));
                }
            }
        }
    }

    intersectsPoly(poly) {
        for (const s1 of this.segments) {
            for (const s2 of poly.segments) {
                if (getIntersection(s1.p1, s1.p2, s2.p1, s2.p2)) {
                    return true;
                }
            }
        }
        return false;
    }

    containsSegment(seg) {
        const middlePoint = getSegmentMiddlePoint(seg.p1, seg.p2);
        return this.containsPoint(middlePoint);
    }

    containsPoint(p) {
        const outerPoint = new Point(-10000, -10000);
        let iCount = 0;
        for (const s of this.segments) {
            iCount += getIntersection(outerPoint, p, s.p1, s.p2) ? 1 : 0;
        }
        return iCount % 2 == 1;
    }

    distanceToPoint(p) {
        return Math.min(...this.segments.map((s) => s.distanceToPoint(p)));
    }

    distanceToPoly(poly) {
        return Math.min(...this.points.map((p) => poly.distanceToPoint(p)));
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
