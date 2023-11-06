export class Tool {

    constructor(drawing) {
        this.drawing = drawing;
    }

    isSelected(figure) {
        return false;
    }
    onClick(evt, source) { }
    onMouseDown(evt, source) {}
    onMouseMove(evt, source) { }
    onMouseUp(evt, source) {}
    select(figure) {}
    deselect(figure) {}
    deselectAll() {}
}