//maze generator tutorial from The Coding Train

var cols, rows;
var w = 40;
var grid = [];

function setup() {
    createCanvas(400, 400);

    cols = floor(width / w);
    rows = floor(height / w);

    //generate grid of rows and cols.
    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            var cell = new Cell(i, j);
            grid.push(cell);
        }
    }

}

function draw() {
    background(51);

    grid.forEach(cell => {
        cell.show();
    });
}

function Cell(i, j) {
    //cols and rows
    this.i = i;
    this.j = j;

    this.show = function () {
        var x = this.i * w;
        var y = this.j * w;
        this.walls = [true, true, true, true]

        stroke(255);
        if (this.walls[0]) {
            line(x, y, x + w, y);
        }
        if (this.walls[1]) {
            line(x + w, y, x + w, y + w);
        }
        if (this.walls[2]) {
            line(x + w, y + w, x, y + w)
        }
        if (this.walls[3]) {
            line(x, y + w, x, y + w);
        }
        // noFill();
        // rect(x, y, w, w);

    }
}