class StopEditor extends SignEditor {
    constructor(viewport, world) {
        super(viewport, world, world.laneGuides);
    }

    createSign(center, dir) {
        return new StopSign(center, dir, this.world.roadWidth / 2, this.world.roadWidth / 2);
    }
}
