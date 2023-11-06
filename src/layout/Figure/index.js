import {} from "../../utils";

export class Figure {
    constructor(parent, div) {
      this.parent = parent;
      this.element = div;
      div.figure = this;
    }
    
    getBounds() {
      const e = this.element;
      return {
        x: Number.parseInt(e.style.left), 
        y: Number.parseInt(e.style.top), 
        w: Number.parseInt(e.style.width), 
        h: Number.parseInt(e.style.height)};
    }
  
    createChildDiv() {
      const div = document.createElement("div");
      this.element.appendChild(div);
      return div;
    }
    setPosition(x, y, width, height) {
      this.element.style.position = "absolute";
      this.element.style.left = x + "px";
      this.element.style.top = y + "px";
      this.element.style.width = width + "px";
      this.element.style.height = height + "px";
    }
    setFractionalPosition(x, xP, y, yP, w, wP, h, hP) {
      this.element.style.position = "absolute";
      this.element.style.left = "calc(" + x + "px + " + xP + "%)";
      this.element.style.top =  "calc(" + y + "px + " + yP + "%)";
      this.element.style.width =  "calc(" + w + "px + " + wP + "%)";
      this.element.style.height =  "calc(" + h + "px + " + hP + "%)";
    }
    setVisible(isVisible) {
      if (isVisible) {
        this.element.style.display = "block";
      } else {
        this.element.style.display = "none";
      }
    }
    getDrawing() {
      return this.parent.getDrawing();
    }
    selectionStateChanged() {
  
    }
    isSelected(figure) {
      return this.getTool().isSelected(figure);
    }
    getTool() {
      return this.getDrawing().getTool();
    }
  
    isSelected() {
      return this.getTool().isSelected(this);
    }
    moveTo(x, y) {
      
      this.element.style.left = x + 'px';
      this.element.style.top = y + 'px';
    }
    
    getLeft() {
    
      return this.element.offsetLeft;
    }
    
    getTop() {
    
      return this.element.offsetTop;
    }
  
    getWidth() {
    
      return Number.parseInt(this.element.style.width);
    }
  
    getHeight() {
    
      return Number.parseInt(this.element.style.height);
    }
    
    select() {
  
      this.getTool().select(this);
    }
    
    deselect() {
  
      this.getTool().deselect(this);
    }
    
}
  
