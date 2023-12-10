class GraphEditor {
    constructor(canvas, graph) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.graph = graph;
        this.selected = null;
        this.hovered = null;

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
            if (evt.button == 2 && this.hovered) {   //right button click
                this.#removePoint(this.hovered);
            }

            if (evt.button == 0) {
                const mouse = new Point(evt.offsetX, evt.offsetY);
                const nearestPoint = getNearestPoint(mouse, this.graph.points, 15);
                if (nearestPoint) {
                    this.selected = nearestPoint;
                    return;
                } else {
                    this.graph.addPoint(mouse);
                    this.selected = mouse;
                    this.hovered = mouse;
                }
            }
        });

        this.canvas.addEventListener("mousemove", (evt) => {
            const mouse = new Point(evt.offsetX, evt.offsetY);
            this.hovered = getNearestPoint(mouse, this.graph.points, 15);
        });

        this.canvas.addEventListener("contextmenu", (evt) => evt.preventDefault());
    }

    #removePoint(point) {
        this.graph.removePoint(point);
        this.hovered = null;
        if (this.selected == point) {
            this.selected = null;
        }
    }
}