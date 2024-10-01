const container = document.querySelector(".paint-area");

var gridSize = 32;
var paintColor = "black";

// when changing from eraser, preserve the color
var previousColor = "black";

var containerWidth = container.getBoundingClientRect().width;

function createSquare(i, gridSize) {
  const square = document.createElement("div");
  square.id = "gridSquare" + i;
  square.classList.add("square");
  square.style.background = "white";
  square.style.width = containerWidth / gridSize + "px";
  square.style.height = containerWidth / gridSize + "px";

  container.appendChild(square);
}

function generateSquareGrid(gridSize) {
  for (let i = 0; i < gridSize ** 2; i++) {
    createSquare(i, gridSize);
  }

  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    square.addEventListener("mousedown", (e) => {
      e.target.style.background = paintColor;
    });
  });
}

function changeSquareGrid(updateValue) {
  container.innerHTML = "";
  generateSquareGrid(updateValue);
}

const gridValueText = document.getElementById("slider-value");

function onSliderChange(e) {
  gridValueText.innerHTML = e.target.value + "x" + e.target.value;
}

function onSliderRelease(e) {
  changeSquareGrid(e.target.value);
}

const slider = document.getElementById("slider");

slider.addEventListener("input", onSliderChange);
slider.addEventListener("click", onSliderRelease);

generateSquareGrid(gridSize);

const clean = document.getElementById("clean-btn");

function cleanSquareGrid() {
  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    square.style.background = "white";
  });
}

clean.addEventListener("mousedown", cleanSquareGrid);

const eraserBtn = document.getElementById("eraser-btn");

function eraser() {
  if (paintColor != "white") {
    previousColor = paintColor;
    paintColor = "white";
    eraserBtn.style.boxShadow = "0 0 6px rgb(227, 0, 64)";
    eraserBtn.style.opacity = "1";
    eraserBtn.style.scale = "1.2";
  } else {
    paintColor = previousColor;
    eraserBtn.style.boxShadow = "none";
    eraserBtn.style.scale = "1";
    eraserBtn.style.opacity = "0.7";
  }
}

eraserBtn.addEventListener("mousedown", eraser);
