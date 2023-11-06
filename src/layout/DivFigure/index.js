import { Figure } from "../Figure";
import { HandleFigure } from "../HandleFigure";

export class DivFigure extends Figure {
    constructor(parent, div, left, top, width, height) {
      super(parent, div);
      this.element.style.backgroundColor = "lightblue";
      this.setPosition(left, top, width, height);
      
      this.handletl = new HandleFigure(this, this.createChildDiv(), (p,x,y)=>{
        const b = p.getBounds();
        p.setPosition(x, y, b.w - (x - b.x), b.h - (y - b.y));
      });
      this.handletl.setPosition(-5, -5, 10, 10);
      
      this.handletr = new HandleFigure(this, this.createChildDiv(), (p,x,y)=>{
        const b = p.getBounds();
        const t = p.getTool();
        const dragW = t.dragStartW;
        const dragH = t.dragStartH;
        const dratStartY = t.dragStartY;
        console.log(y, dragH);
        p.setPosition(b.x, y, x - b.x + dragW, b.h - (y - b.y));
      });
      this.handletr.setFractionalPosition(-5, 100, -5, 0, 10 , 0, 10, 0);
      
      this.handlebr = new HandleFigure(this, this.createChildDiv(), (p,x,y)=>{
        const b = p.getBounds();
        const dragW = p.getTool().dragStartW;
        const dragH = p.getTool().dragStartH;
        p.setPosition(b.x, b.y, x - b.x + dragW, y - b.y + dragH);
      });
      this.handlebr.setFractionalPosition(-5, 100, -5, 100, 10 , 0, 10, 0);
      
      this.handlebl = new HandleFigure(this, this.createChildDiv(), (p,x,y)=>{
        const b = p.getBounds();
        const dragW = p.getTool().dragStartW;
        const dragH = p.getTool().dragStartH;      
        p.setPosition(x, b.y, b.w - (x - b.x), y - b.y + dragH);
      });
      this.handlebl.setFractionalPosition(-5, 0, -5, 100, 10 , 0, 10, 0);
    }
    
    selectionStateChanged() {
      const isSelected = this.isSelected();
      this.setDragging(isSelected);
    }
  
    setDragging(dragging) {
      this.draggingEnabled = dragging;
      this.handletl.setVisible(this.draggingEnabled);
      this.handletr.setVisible(this.draggingEnabled);
      this.handlebr.setVisible(this.draggingEnabled);
      this.handlebl.setVisible(this.draggingEnabled);
    }
  }