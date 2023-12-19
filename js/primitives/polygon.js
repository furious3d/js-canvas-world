class Polygon {
    constructor(points) {
        this.points = points;
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