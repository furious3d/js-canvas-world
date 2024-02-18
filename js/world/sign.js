class Sign {
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
    }

    draw(ctx) {
        this.poly.draw(ctx);
    }
}
