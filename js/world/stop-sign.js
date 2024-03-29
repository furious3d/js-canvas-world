class StopSign extends Sign {
    constructor(center, dir, width, height) {
        super(center, dir, width, height);
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
