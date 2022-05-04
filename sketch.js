//maze generator tutorial from The Coding Train

var cols, rows;
var w = 4;

var grid = [];
var stack = [];

//current cell being visited
var current;

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
    current = grid[0];

}

function draw() {
    background(51);

    grid.forEach(cell => {
        cell.show();
    });

    current.visited = true;
    current.highlight();

    //STEP 1
    var next = current.checkNeighbors();
    if (next) {

        next.visited = true;

        //step 2
        stack.push(current);
        //step 3
        removeWalls(current, next);
        //step 4
        current = next;

    } else if (stack.length > 0) {
        current = stack.pop();
    }

}

//formula for 1d array
function index(i, j) {
    //check for valid index, return false
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;
    }
    return i + j * cols;
}

function Cell(i, j) {
    //cols and rows
    this.i = i;
    this.j = j;

    this.walls = [true, true, true, true]
    this.visited = false


    this.checkNeighbors = function () {
        var neighbors = [];

        var top = grid[index(i, j - 1)];
        var right = grid[index(i + 1, j)];
        var bottom = grid[index(i, j + 1)];
        var left = grid[index(i - 1, j)];

        if (top && !top.visited) {
            neighbors.push(top);
        }
        if (right && !right.visited) {
            neighbors.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbors.push(bottom);
        }
        if (left && !left.visited) {
            neighbors.push(left);
        }

        //look at current cell, return a random unvisited neighbor cell if valid.

        console.log(neighbors);
        if (neighbors.length > 0) {
            let r = floor(random(0, neighbors.length))
            return neighbors[r];
        } else {
            return undefined
        }
    }

    this.highlight = function () {
        var x = this.i * w;
        var y = this.j * w;
        noStroke();
        fill(0, 0, 255, 100);
        rect(x, y, w, w)
    }



    this.show = function () {
        var x = this.i * w;
        var y = this.j * w;


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

        //turns visited cells to purple
        if (this.visited) {
            noStroke();
            fill(255, 0, 255, 100);
            rect(x, y, w, w);
        }

    }
}


function removeWalls(a, b) {

    //difference between cell indicies
    var x = a.i - b.i
    if (x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }

    var y = a.j - b.j
    if (y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}