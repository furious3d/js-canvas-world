class Building {
    constructor(base, height = 10) {
        this.base = base;
        this.height = height;
        this.center = this.#getBaseCenter();
    }

    draw(ctx, viewPoint) {
        const roof = this.#getRoofPoly(viewPoint);
        const sides = [];
        for (let i = 0; i < this.base.points.length; i++) {
            const nextI = (i + 1) % this.base.points.length;
            const poly = new Polygon([
                this.base.points[i], this.base.points[nextI],
                roof.points[nextI], roof.points[i]
            ]);
            sides.push(poly);
        }

        sides.sort((a, b) => 
            b.distanceToPoint(viewPoint) - a.distanceToPoint(viewPoint)
        );

        this.base.draw(ctx, { fill: '#909090', stroke: '#909090' });
        sides.forEach((s) => {
            s.draw(ctx, { fill: '#664422', stroke: '#664444' });
        });
        roof.draw(ctx, { fill: '#bfb5b0', stroke: '#888888' });
    }

    #getRoofPoly(viewPoint) {
        const points = this.base.points.map((p) => 
            add(p, scale(subtract(p, viewPoint), this.height / 100))
        );
        return new Polygon(points);
    }

    #getBaseCenter() {
        let sumX = 0, sumY = 0;
        this.base.points.forEach((p) => {
            sumX += p.x;
            sumY += p.y;
        });
        return new Point(sumX / 4, sumY / 4);
    }
}