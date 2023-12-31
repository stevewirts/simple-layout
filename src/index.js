import { DivFigure, GridDrawing } from "/layout";

window.addEventListener("load", () => {
  const div = document.getElementById("drawing");
  window.drawing = new GridDrawing(null, div);
});

window.addDivFigure = function addDivFigure() {
  const div = document.createElement("div");
  const divFigure = new DivFigure(drawing, div, 25, 50, 200, 200);
  drawing.addFigure(divFigure);
}
