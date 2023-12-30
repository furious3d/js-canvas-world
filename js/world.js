class World {
    constructor(
        graph,
        roadWidth = 100,
        roadRoundness = 6,
        buildingWidth = 150,
        buildingMinLength = 150,
        spacing = 50,
        treeSize = 150
    ) {
        this.graph = graph;
        this.roadWidth = roadWidth;
        this.roadRoundness = roadRoundness;
        this.buildingWidth = buildingWidth;
        this.buildingMinLength = buildingMinLength;
        this.spacing = spacing;
        this.treeSize = treeSize;

        this.envelopes = [];
        this.roadBorders = [];
        this.buildings = [];
        this.trees = [];

        this.generate();
    }

    generate() {
        this.envelopes.length = 0;

        for (const seg of this.graph.segments) {
            this.envelopes.push(new SegmentEnvelope(seg, this.roadWidth, this.roadRoundness));
        }

        this.roadBorders = Polygon.union(this.envelopes.map((e) => e.poly));
        this.buildings = this.#generateBuildings();
        this.trees = this.#generateTrees();
    }

    #generateBuildings() {
        const envelopes = [];
        this.graph.segments.forEach((s) => {
            envelopes.push(
                new SegmentEnvelope(s, this.roadWidth + this.buildingWidth + this.spacing * 2, this.roadRoundness)
            );
        });

        const guides = Polygon.union(envelopes.map((e) => e.poly));
        for (let i = 0; i < guides.length; i++) {
            const seg = guides[i];
            if (seg.length() < this.buildingMinLength) {
                guides.splice(i, 1);
                i--;
            }
        }

        const supports = [];
        guides.forEach((s) => {
            const len = s.length() + this.spacing;
            const buildingCount = Math.floor(len / (this.buildingMinLength + this.spacing));
            const buildingLen = len / buildingCount - this.spacing;
            const dir = s.directionVector();
            let p1, p2;
            for (let i = 0; i < buildingCount; i++) {
                p1 = i == 0 ? s.p1 : add(p2, scale(dir, this.spacing));
                p2 = add(p1, scale(dir, buildingLen));
                supports.push(new Segment(p1, p2));
            }
        });

        const bases = [];
        supports.forEach((s) => {
            bases.push(new SegmentEnvelope(s, this.buildingWidth).poly);
        });

        const eps = 0.001;
        for (let i = 0; i < bases.length - 1; i++) {
            for (let j = i + 1; j < bases.length; j++) {
                if (bases[i].intersectsPoly(bases[j]) || bases[i].distanceToPoly(bases[j]) < this.spacing - eps) {
                    bases.splice(j, 1);
                    j--;
                }
            }
        }

        return bases;
    }

    #generateTrees() {
        const points = [
            ...this.roadBorders.map((s) => [s.p1, s.p2]).flat(),
            ...this.buildings.map((b) => b.points).flat(),
        ];
        const left = Math.min(...points.map((p) => p.x));
        const right = Math.max(...points.map((p) => p.x));
        const top = Math.min(...points.map((p) => p.y));
        const bottom = Math.max(...points.map((p) => p.y));
        const forbiddenPolys = [...this.buildings, ...this.envelopes.map((e) => e.poly)];
        const trees = [];

        let attemptsNum = 0;

        while (attemptsNum < 100) {
            const treePoint = new Point(lerp(right, left, Math.random()), lerp(top, bottom, Math.random()));
            let keep = true;
            for (const poly of forbiddenPolys) {
                if (poly.containsPoint(treePoint) || poly.distanceToPoint(treePoint) < this.treeSize) {
                    keep = false;
                    break;
                }
            }

            if (keep) {
                for (const t of trees) {
                    if (distance(treePoint, t) < this.treeSize) {
                        keep = false;
                        break;
                    }
                }
            }

            if (keep) {
                let closeToOtherObjects = false;
                for (const poly of forbiddenPolys) {
                    if (poly.distanceToPoint(treePoint) < this.treeSize * 2) {
                        closeToOtherObjects = true;
                        break;
                    }
                }
                keep = closeToOtherObjects;
            }

            if (keep) {
                trees.push(treePoint);
                attemptsNum = 0;
            }

            attemptsNum++;
        }

        return trees;
    }

    render(ctx) {
        this.envelopes.forEach((e) => {
            e.draw(ctx, { fill: "#bbbbbb", stroke: "#bbbbbb", lineWidth: 15 });
        });
        this.graph.segments.forEach((s) => {
            s.draw(ctx, { color: "white", width: 8, dash: [20, 5] });
        });
        this.roadBorders.forEach((b) => {
            b.draw(ctx, { color: "white", width: 5 });
        });
        this.buildings.forEach((b) => {
            b.draw(ctx);
        });
        this.trees.forEach((t) => {
            t.draw(ctx, { color: "rgba(20, 120, 0, 0.5", size: this.treeSize });
        });
    }
}
