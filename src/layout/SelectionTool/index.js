import { Tool } from "../Tool";

export class SelectionTool extends Tool {
    
    constructor(drawing) {  
      super(drawing);  
      this.selections = [];
      this.dragTarget = null;
  
      this.dragStartX = 0;
      this.dragStartY = 0;
  
      this.dragStartW = 0;
      this.dragStartH = 0;
    }
  
    getChildAt(x,y) {
      const elements = document.elementsFromPoint(x,y);
      if (elements == null || elements.isEmpty()) {
        return null;
      }
      return elements[0].figure;
    }
  
    select(figure) {
      if (this.selections.contains(figure)) {
        return this;
      }
      this.selections.add(figure);
      figure.selectionStateChanged();
    }
  
    deselect(figure) {
      if (!this.selections.contains(figure)) {
        return this;
      }
      this.selections.remove(figure);
      figure.selectionStateChanged();
    }
  
    deselectAll() {
      const copy = this.selections.copy();
      this.selections = [];
      copy.forEach((each)=>{
        each.selectionStateChanged();
      });
    }
  
    isSelected(figure) {
      return this.selections.contains(figure);
    }
  
    onClick(evt, figure) {
  
      //figure.select();
    }
  
    onMouseDown(evt) {
      const figure = this.getChildAt(evt.clientX, evt.clientY);
      if (figure == null) {
        deselectAll();
        return;
      }
      figure.select();
      if (this.isSelected(figure)) {
        this.dragTarget = figure;
        this.dragStartX = evt.clientX - figure.getLeft();
        this.dragStartY = evt.clientY - figure.getTop();
        this.dragStartW = figure.getWidth();
        this.dragStartH = figure.getHeight();
      }
    }  
    onMouseMove(evt) {
      if (this.dragTarget == null) {
        return;
      }
      const xDelta = evt.clientX - this.dragStartX;
      const yDelta = evt.clientY - this.dragStartY;
  
      this.dragTarget.moveTo(xDelta, yDelta);
    }
    
    onMouseUp(evt, source) {
      const figure = this.getChildAt(evt.clientX, evt.clientY);
      if (figure == null) {
        return;
      }
      this.dragTarget = null;
      this.dragStartX = 0;
      this.dragStartY = 0;
      this.dragStartW = 0;
      this.dragStartH = 0;
      
      // if (this.dragStartX == evt.clientX - figure.getLeft() &&  this.dragStartY == evt.clientY - figure.getTop()) {
      //   figure.deselect();
      // }
    }
  
  
  }