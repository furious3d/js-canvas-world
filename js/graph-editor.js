class GraphEditor {
    constructor(canvas, graph) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.graph = graph;
        this.selected = null;
        this.hovered = null;
        this.dragging = false;

        this.#initEventListeners();
    }

    render() {
        this.graph.draw(this.ctx);

        if (this.selected) {
            this.selected.draw(this.ctx, { outline: true });
        }

        if (this.hovered) {
            this.hovered.draw(this.ctx, { color: "red", outline: false });
        }
    }

    #initEventListeners() {
        this.canvas.addEventListener("mousedown", (evt) => {
            if (evt.button == 2) {   //right button click
                if (this.hovered) {
                    this.#removePoint(this.hovered);
                } else {
                    this.selected = null;
                }
            }

            if (evt.button == 0) {
                const mouse = new Point(evt.offsetX, evt.offsetY);
                const nearestPoint = getNearestPoint(mouse, this.graph.points, 15);
                if (nearestPoint) {
                    this.#select(nearestPoint);
                    this.dragging = true;
                    return;
                } else {
                    this.graph.addPoint(mouse);
                    this.#select(mouse);
                    this.hovered = mouse;
                }
            }
        });

        this.canvas.addEventListener("mousemove", (evt) => {
            const mouse = new Point(evt.offsetX, evt.offsetY);
            this.hovered = getNearestPoint(mouse, this.graph.points, 15);
            if (this.dragging) {
                this.selected.x = mouse.x;
                this.selected.y = mouse.y;
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