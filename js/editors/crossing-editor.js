class CrossingEditor extends SignEditor {
    constructor(viewport, world) {
        super(viewport, world, world.graph.segments);
    }

    createSign(center, dir) {
        return new CrossingSign(center, dir, this.world.roadWidth, this.world.roadWidth / 2);
    }
}
