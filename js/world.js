class World {
    constructor(graph, roadWidth = 100, roadRoundness = 6) {
        this.graph = graph;
        this.roadWidth = roadWidth;
        this.roadRoundness = roadRoundness;

        this.envelopes = [];
        this.intersections = [];

        this.generate();
    }

    generate() {
        this.envelopes.length = 0;

        for (const seg of this.graph.segments) {
            this.envelopes.push(new SegmentEnvelope(seg, this.roadWidth, this.roadRoundness));
        }

        this.intersections = Polygon.break(this.envelopes[0].poly, this.envelopes[1].poly);
    }

    render(ctx) {
        this.envelopes.forEach((e) => {
            e.draw(ctx);
        });

        this.intersections.forEach((e) => {
            e.draw(ctx, { color: "red", size: 6 });
        });
    }
}
