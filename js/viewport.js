class Viewport {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.zoom = 1;
        this.zoomStep = 0.1;

        this.#initEventHandlers();
    }

    getMouse(evt) {
        return new Point(
            evt.offsetX * this.zoom,
            evt.offsetY * this.zoom
        );
    }

    #initEventHandlers() {
        this.canvas.addEventListener("mousewheel", (evt) => { this.#onMouseScroll(evt); });
    }

    #onMouseScroll(evt) {
        const dir = Math.sign(evt.deltaY);
        const zoom = this.zoom + dir * this.zoomStep;
        this.zoom = Math.max(1, Math.min(5, zoom));
    }
}