var w = 30; // dimensions of the cells
var board = [];
var stack = [];
var cols, rows, current;

function setup() {
  // frameRate(5);
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  cols = floor(width / w);
  rows = floor(height / w);
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      board.push(new Cell(j, i, w));
    }
  }
  current = board[0];
}

function draw() {
  board.forEach((cell) => {
    cell.show();
  });
  current.isVisited = true;
  current.highlight();
  var next = current.neighbor();
  if (next) {
    next.isVisited = true;
    stack.push(current);
    removeWalls(current, next);
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  } else {
    noLoop();
    var r = floor(random(0, 1000));
    saveCanvas(`maze_${r}`, "jpg");
  }
}

function removeWalls(a, b) {
  var x = a.x - b.x;
  if (x == 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  }
  if (x == -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.y - b.y;
  if (y == 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  }
  if (y == -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}
