class StopSign {
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
        this.border = this.poly.segments[2];
    }

    draw(ctx) {
        this.border.draw(ctx, { color: "white", width: 5 });
        ctx.save();
        ctx.translate(this.center.x, this.center.y);
        ctx.rotate(angle(this.dir) - Math.PI / 2);
        ctx.scale(1, 3);

        ctx.beginPath();
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.font = "bold " + this.height * 0.3 + "px Arial";
        ctx.fillText("STOP", 0, 1);

        ctx.restore();
    }
}
