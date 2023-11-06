import { Figure } from "../Figure";

export class HandleFigure extends Figure {
    
    constructor(parent, div, updateFunc) {
      super(parent, div);
      this.updateFunc = updateFunc;
      this.element.style.backgroundColor = "black";
      this.element.style.cursor = "pointer";
      this.element.style.display = "none";
      this.element.style.zIndex = "1";
    }
    
    moveTo(x, y) {
      
      this.updateFunc(this.parent, x, y);
    }
    getLeft() {
      
      return this.parent.getLeft();
    }
    
    getTop() {
    
      return this.parent.getTop();
    }
  
    getWidth() {
      
      return this.parent.getWidth();
    }
  
    getHeight() {
      
      return this.parent.getHeight();
    }
  }
