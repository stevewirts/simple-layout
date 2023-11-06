Array.prototype.remove = function(item) {
  let index = this.indexOf(item);
  if (index !== -1) {
    this.splice(index, 1);
  }
}
Array.prototype.add = function(item) {
  this.push(item);
}

Array.prototype.contains = function(item) {
  return this.includes(item);
}

Array.prototype.isEmpty = function() {
  return this.length == 0;
}

Array.prototype.copy = function() {
  return this.slice();
}

class Figure {
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

class Tool {
  
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

class SelectionTool extends Tool {
  
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

class Drawing extends Figure {
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

class DivFigure extends Figure {
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

class HandleFigure extends Figure {
  
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


function addDivFigure() {
  const div = document.createElement("div");
  const divFigure = new DivFigure(drawing, div, 25, 50, 200, 200);
  drawing.addFigure(divFigure);
}

window.addEventListener("load", () => {
  const div = document.getElementById("drawing");
  window.drawing = new Drawing(null, div);
});