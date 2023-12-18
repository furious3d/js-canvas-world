class Viewport {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.center = new Point(this.canvas.width / 2, this.canvas.height / 2);
        this.zoom = 1;
        this.zoomStep = 0.1;
        this.offset = scale(this.center, -1);

        this.drag = {
            start: new Point(0, 0),
            end: new Point(0, 0),
            offset: new Point(0, 0),
            active: false
        };

        this.#initEventHandlers();
    }

    getMouse(evt, withoutDragOffset = false) {
        const p = new Point(
            (evt.offsetX - this.center.x) * this.zoom - this.offset.x,
            (evt.offsetY - this.center.y) * this.zoom - this.offset.y
        );
        return withoutDragOffset ? subtract(p, this.drag.offset) : p;
    }

    getOffset() {
        return add(this.offset, this.drag.offset);
    }

    #initEventHandlers() {
        this.canvas.addEventListener("mousewheel", (evt) => { this.#onMouseScroll(evt); }, { passive: true });
        this.canvas.addEventListener("mousedown", (evt) => { 
            if (evt.button == 1) {
                this.#onMiddleMouseDown(evt); 
            }
        });
        this.canvas.addEventListener("mouseup", (evt) => {
            if (evt.button == 1) {
                this.#onMiddleMouseUp(evt); 
            }
        });
        this.canvas.addEventListener("mousemove", (evt) => { 
            this.#onMiddleMouseMove(evt); 
        });
    }

    #onMiddleMouseDown(evt) {
        console.log("middle button down");
        this.drag.start = this.getMouse(evt);
        this.drag.active = true;
    }

    #onMiddleMouseUp(evt) {
        if (this.drag.active) {
            this.offset = add(this.offset, this.drag.offset);
            this.drag = {
                start: new Point(0, 0),
                end: new Point(0, 0),
                offset: new Point(0, 0),
                active: false
            };
        }
    }

    #onMiddleMouseMove(evt) {
        if (this.drag.active) {
            this.drag.end = this.getMouse(evt);
            this.drag.offset = subtract(this.drag.end, this.drag.start);
        }
    }

    #onMouseScroll(evt) {
        const dir = Math.sign(evt.deltaY);
        const zoom = this.zoom + dir * this.zoomStep;
        this.zoom = Math.max(1, Math.min(5, zoom));
    }
}