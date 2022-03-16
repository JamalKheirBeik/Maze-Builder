class Cell {
  constructor(x, y, d) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.isVisited = false;
    this.walls = [true, true, true, true]; // top, right, bottom, left
  }

  show() {
    stroke(255);
    // top line
    if (this.walls[0])
      line(
        this.x * this.d,
        this.y * this.d,
        this.x * this.d + this.d,
        this.y * this.d
      );
    // right line
    if (this.walls[1])
      line(
        this.x * this.d + this.d,
        this.y * this.d,
        this.x * this.d + this.d,
        this.y * this.d + this.d
      );
    // bottom line
    if (this.walls[2])
      line(
        this.x * this.d + this.d,
        this.y * this.d + this.d,
        this.x * this.d,
        this.y * this.d + this.d
      );
    // left line
    if (this.walls[3])
      line(
        this.x * this.d,
        this.y * this.d + this.d,
        this.x * this.d,
        this.y * this.d
      );

    if (this.isVisited) {
      noStroke();
      fill(180, 0, 200);
      rect(this.x * this.d, this.y * this.d, this.d, this.d);
    }
  }

  highlight() {
    noStroke();
    fill(0, 255, 0);
    rect(this.x * this.d, this.y * this.d, this.d, this.d);
  }

  index(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
      return -1;
    }

    return i + j * cols;
  }

  neighbor() {
    var neighbors = [];
    const top = board[this.index(this.x, this.y - 1)];
    const right = board[this.index(this.x + 1, this.y)];
    const bottom = board[this.index(this.x, this.y + 1)];
    const left = board[this.index(this.x - 1, this.y)];

    if (top && !top.isVisited) neighbors.push(top);
    if (right && !right.isVisited) neighbors.push(right);
    if (bottom && !bottom.isVisited) neighbors.push(bottom);
    if (left && !left.isVisited) neighbors.push(left);

    if (neighbors.length > 0) {
      var r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  }
}
