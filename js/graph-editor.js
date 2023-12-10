class GraphEditor {
    constructor(canvas, graph) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.graph = graph;
        this.selected = null;

        this.#initEventListeners();
    }

    render() {
        this.graph.draw(this.ctx);

        if (this.selected) {
            this.selected.draw(this.ctx, { outline: true });
        }
    }

    #initEventListeners() {
        this.canvas.addEventListener("mousedown", (evt) => {
            const mouse = new Point(evt.offsetX, evt.offsetY);
            this.graph.addPoint(mouse);
            this.selected = mouse;
        });
    }
}