class GraphEditor {
    constructor(viewport, graph) {
        this.viewport = viewport;
        this.canvas = this.viewport.canvas;
        this.ctx = this.canvas.getContext("2d");
        this.mouse = null;
        this.graph = graph;
        this.selected = null;
        this.hovered = null;
        this.dragging = false;

        this.#initEventListeners();
    }

    render() {
        this.graph.draw(this.ctx);

        if (this.selected) {
            const newPoint = this.hovered ? this.hovered : this.mouse;
            new Segment(this.selected, newPoint).draw(this.ctx, { dash: [3, 3] });
            this.selected.draw(this.ctx, { outline: true });
        }

        if (this.hovered) {
            this.hovered.draw(this.ctx, { color: "red", outline: false });
        }
    }

    clearAll() {
        this.graph.clear();
        this.selected = null;
        this.hovered = null;
    }

    #initEventListeners() {
        this.canvas.addEventListener("mousedown", (evt) => { this.#handleMouseDown(evt); });
        this.canvas.addEventListener("mousemove", (evt) => { this.#onMouseMove(evt); });
        this.canvas.addEventListener("contextmenu", (evt) => evt.preventDefault());
        this.canvas.addEventListener("mouseup", () => { this.dragging = false; });
    }

    #handleMouseDown(evt) {
        if (evt.button == 2) {   //right button click
            this.#onRightMouseDown();
        } else if (evt.button == 0) {
            this.#onLeftMouseDown();
        }
    }

    #onRightMouseDown() {
        if (this.selected) {
            this.selected = null;
        } else if (this.hovered) {
            this.#removePoint(this.hovered);
        }
    }

    #onLeftMouseDown() {
        if (this.hovered) {
            this.#select(this.hovered);
            this.dragging = true;
            return;
        } else {
            this.graph.addPoint(this.mouse);
            this.#select(this.mouse);
            this.hovered = this.mouse;
        }
    }

    #onMouseMove(evt) {
        this.mouse = this.viewport.getMouse(evt, true);
        this.hovered = getNearestPoint(this.mouse, this.graph.points, 15 * this.viewport.zoom);
        if (this.dragging) {
            this.selected.x = this.mouse.x;
            this.selected.y = this.mouse.y;
        }
    }

    #select(point) {
        if (this.selected) {
            this.graph.addSegment(new Segment(this.selected, point));
        }
        this.selected = point;
    }

    #removePoint(point) {
        this.graph.removePoint(point);
        this.hovered = null;
        if (this.selected == point) {
            this.selected = null;
        }
    }
}