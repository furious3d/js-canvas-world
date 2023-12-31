class Tree {
    constructor(center, size, height = 8) {
        this.center = center;
        this.size = size;
        this.height = height;
        this.segmentsCount = 8;
        this.base = this.#createSegment(this.center, this.size);
    }

    draw(ctx, viewPoint) {
        const v = subtract(this.center, viewPoint);
        const top = add(this.center, scale(v, this.height / 100));

        this.base.draw(ctx, { fill: 'rgba(0, 0, 0, 0.8)', stroke: "rgba(0, 0, 0, 0)" });

        for (let i = 0; i < this.segmentsCount; i++) {
            const t = i / (this.segmentsCount - 1);
            const color = 'rgba(0, ' + lerp(70, 150, t) +', 0, 0.9)';
            const point = lerp2D(this.center, top, t);
            const segSize = this.size - lerp(20, 100, t);
            this.#createSegment(point, segSize).draw(ctx, { fill: color, stroke: "rgba(0, 0, 0, 0)" });
        }
    }

    #createSegment(point, segSize) {
        const rad = segSize / 2;
        const points = [];
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 16) {
            const pseudoRand = Math.cos(((a + this.center.x) * rad) % 17) ** 2;
            const randRadius = rad * lerp(0.7, 1, pseudoRand);
            points.push(translate(point, a, randRadius));
        }
        return new Polygon(points);
    }
}