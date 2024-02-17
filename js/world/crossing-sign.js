class CrossingSign {
    constructor(center, dir, width, height) {
        this.center = center;
        this.dir = dir;
        this.width = width;
        this.height = height;

        this.support = new Segment(
            translate(center, angle(dir), height / 2),
            translate(center, angle(dir), -height / 2)
        );
        this.poly = new SegmentEnvelope(this.support, width, 0).poly;
        this.borders = [this.poly.segments[0], this.poly.segments[2]];
    }

    draw(ctx) {
        const perp = perpendicular(this.dir);
        const line = new Segment(
            add(this.center, scale(perp, this.width / 2)),
            add(this.center, scale(perp, -this.width / 2))
        );
        line.draw(ctx, {
            width: this.height,
            color: "white",
            dash: [11, 11],
        });
    }
}
