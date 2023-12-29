class World {
    constructor(graph, roadWidth = 100, roadRoundness = 6) {
        this.graph = graph;
        this.roadWidth = roadWidth;
        this.roadRoundness = roadRoundness;

        this.envelopes = [];
        this.roadBorders = [];

        this.generate();
    }

    generate() {
        this.envelopes.length = 0;

        for (const seg of this.graph.segments) {
            this.envelopes.push(new SegmentEnvelope(seg, this.roadWidth, this.roadRoundness));
        }

        this.roadBorders = Polygon.union(this.envelopes.map((e) => e.poly));
    }

    render(ctx) {
        this.envelopes.forEach((e) => {
            e.draw(ctx);
        });

        this.roadBorders.forEach((b) => {
            b.draw(ctx, { color: "white", width: 8 });
        })
    }
}
