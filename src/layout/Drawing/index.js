import { Figure } from "../Figure";
import { SelectionTool } from "../SelectionTool";

export class Drawing extends Figure {
    constructor(parent, div) {
      super(parent, div);
      this.setPosition(0, 50, 0,0);
      this.element.style.width = "100%";
      this.element.style.height = "calc(100% - 50px)";
      this.element.style.backgroundColor = "white";
      this.figures = [];
      this.tool = new SelectionTool(this);
      this.element.addEventListener("click", (evt) => {
        this.getTool().onClick(evt);
      });
  
      this.element.addEventListener("mousedown", (evt) => {
        this.getTool().onMouseDown(evt);
      });    
      this.element.addEventListener("mousemove", (evt) => {
        this.getTool().onMouseMove(evt);
      });
  
      this.element.addEventListener("mouseup", (evt) => {
        this.getTool().onMouseUp(evt);
      });
    }
  
    addFigure(figure) {
      this.figures.push(figure);
      this.element.appendChild(figure.element);
    }
    
    getDrawing() {
      return this;
    }
  
    getTool() {
      return this.tool;
    }
    
    select() {
      this.getTool().deselectAll();
    }
    
  }