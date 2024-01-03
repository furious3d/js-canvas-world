class StopEditor {
    constructor(viewport, world) {
        this.viewport = viewport;
        this.world = world;
        this.canvas = this.viewport.canvas;
        this.ctx = this.canvas.getContext("2d");
        this.mouse = null;
        this.intent = null;

        this.signs = world.signs;
    }

    enable() {
        this.#initEventListeners();
    }

    disable() {
        this.#removeEventListeners();
    }

    render() {
        if (this.intent) {
            this.intent.draw(this.ctx);
        }
    }

    #initEventListeners() {
        this.canvas.addEventListener("mousedown", this.#handleMouseDown);
        this.canvas.addEventListener("mousemove", this.#onMouseMove);
        this.canvas.addEventListener("contextmenu", this.#onContextMenu);
    }

    #removeEventListeners() {
        this.canvas.removeEventListener("mousedown", this.#handleMouseDown);
        this.canvas.removeEventListener("mousemove", this.#onMouseMove);
        this.canvas.removeEventListener("contextmenu", this.#onContextMenu);
    }

    #handleMouseDown = (evt) => {
        if (evt.button == 2) {
            this.#onRightMouseDown();
        } else if (evt.button == 0) {
            this.#onLeftMouseDown();
        }
    };

    #onMouseMove = (evt) => {
        this.mouse = this.viewport.getMouse(evt, true);
        const seg = getNearestSegment(this.mouse, this.world.laneGuides, 15 * this.viewport.zoom);
        if (seg) {
            const proj = seg.projectPoint(this.mouse);
            if (proj.offset > 0 && proj.offset < 1) {
                this.intent = new StopSign(proj.point, seg.directionVector(), world.roadWidth / 2, world.roadWidth / 2);
            } else {
                this.intent = null;
            }
        } else {
            this.intent = null;
        }
    };

    #onContextMenu = (evt) => evt.preventDefault();

    #onRightMouseDown() {
        for (let i = 0; i < this.signs.length; i++) {
            const poly = this.signs[i].poly;
            if (poly.containsPoint(this.mouse)) {
                this.signs.splice(i, 1);
                return;
            }
        }
    }

    #onLeftMouseDown() {
        if (this.intent) {
            this.signs.push(this.intent);
            this.intent = null;
        }
    }
}
