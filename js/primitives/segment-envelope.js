class SegmentEnvelope {
    constructor(seg, width, roundness = 1) {
        this.segment = seg;
        this.poly = this.#buildPolygon(width, roundness);
    }

    draw(ctx) {
        if (this.poly) {
            this.poly.draw(ctx);
        }
    }

    #buildPolygon(width, roundness) {
        if (this.segment == null) {
            return null;
        }
        const { p1, p2 } = this.segment;
        const radius = width / 2;
        const alpha = angle(subtract(p1, p2));
        const alpha_cw = alpha + Math.PI / 2;
        const alpha_ccw = alpha - Math.PI / 2;
        const points = [];
        const step = Math.PI / Math.max(1, roundness);
        const eps = step / 2;
        for (let rI = alpha_ccw; rI <= alpha_cw + eps; rI += step) {
            points.push(translate(p1, rI, radius));
        }
        for (let rI = alpha_ccw; rI <= alpha_cw + eps; rI += step) {
            points.push(translate(p2, Math.PI + rI, radius));
        }

        return new Polygon(points);
    }
}