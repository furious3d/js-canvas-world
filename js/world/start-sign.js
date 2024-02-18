class StartSign extends Sign {
    constructor(center, dir, width, height) {
        super(center, dir, width, height);

        this.img = new Image();
        this.img.src = "car30.png";
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.center.x, this.center.y);
        ctx.rotate(angle(this.dir) - Math.PI / 2);
        ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);

        ctx.restore();
    }
}
