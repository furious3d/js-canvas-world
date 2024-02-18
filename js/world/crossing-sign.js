class CrossingSign extends Sign {
    constructor(center, dir, width, height) {
        super(center, dir, width, height);
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
