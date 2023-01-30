const form = document.querySelector(".ballForm")
const slider = document.getElementById("numBalls");

slider.oninput = function () {
  const { numBalls } = this.value;
  const output = document.getElementById("output");
  output.innerHTML = this.value;
}

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function slidertoHexcode () {
  let red = document.getElementById('red').value
  let blue= document.getElementById('blue').value
  let green = document.getElementById('green').value

   red = Number(red).toString(16);
  if (red.length < 2) {
       red = "0" + red;
  }
   blue = Number(blue).toString(16);
  if (blue.length < 2) {
       blue = "0" + blue;
  }
   green = Number(green).toString(16);
  if (green.length < 2) {
       green = "0" + green;
  }


  return "0x" + red + green + blue 
};
  