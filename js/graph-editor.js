class GraphEditor {
    constructor(canvas, graph) {
        this.canvas = canvas;
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

    #initEventListeners() {
        this.canvas.addEventListener("mousedown", (evt) => {
            if (evt.button == 2) {   //right button click
                if (this.selected) {
                    this.selected = null;
                } else if (this.hovered) {
                    this.#removePoint(this.hovered);
                }
            }

            if (evt.button == 0) {
                const nearestPoint = getNearestPoint(this.mouse, this.graph.points, 15);
                if (nearestPoint) {
                    this.#select(nearestPoint);
                    this.dragging = true;
                    return;
                } else {
                    this.graph.addPoint(this.mouse);
                    this.#select(this.mouse);
                    this.hovered = this.mouse;
                }
            }
        });

        this.canvas.addEventListener("mousemove", (evt) => {
            this.mouse = new Point(evt.offsetX, evt.offsetY);
            this.hovered = getNearestPoint(this.mouse, this.graph.points, 15);
            if (this.dragging) {
                this.selected.x = this.mouse.x;
                this.selected.y = this.mouse.y;
            }
        });

        this.canvas.addEventListener("contextmenu", (evt) => evt.preventDefault());
        this.canvas.addEventListener("mouseup", () => { this.dragging = false; });
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