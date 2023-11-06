import {} from "../../../utils"


export class Grid {

    constructor(parent, rows, cols, gap) {

        this.parent = parent;
        this.element = parent.createChildDiv();
        this.rows = rows;
        this.cols = cols;
        this.gap = gap;
        this.generateBoxes();
    }

    createCellDiv() {
        const div = document.createElement("div");

        div.style.border = "1px solid black"; /* adds a border around each item */
        div.style.padding = "0"; /* removes padding from each item */

        this.element.appendChild(div);

        return div;
    }

    generateBoxes() {
        
        const e = this.element;

        e.style.width = "110%",
        e.style.height = "110%",
        e.style.display = "grid";
        e.style.gridTemplateColumns = "repeat(auto-fit, 50px)"; /* sets column width to 100px */
        e.style.gridTemplateRows = "repeat(auto-fit, 30px)"; /* sets row height to 50px */
        e.style.gridGap = "10px"; /* sets border space between items to 10px */
        e.style.border = "1px solid black"; /* adds a border around each cell */
        e.style.padding = "0"; /* removes padding from the container */
        e.style.position = "relative";  

        this.removeAllCells();

        for (let i = 0; i < 2000; i++) {
            this.createCellDiv();
        }

    }

    removeAllCells() {

        const e = this.element;
        
        while (e.lastChild) {

            e.removeChild(e.lastChild);
          }
    }
}