const canvas = document.querySelector("#simscreen");
const ctx = canvas.getContext("2d");
const quadrantImg = document.querySelector(".quad-img");
let nextCanvas = false;
let previous = document.querySelector(".previous");
let next = document.querySelector(".next");
let quadrant = 1;
let m,
  k = 0;
//Initialise system parameters here
function varinit() {
  varchange();
  //Variable slider and number input types

  $("#xslider").slider("value", 0);
  $("#xspinner").spinner("value", 0);
  $("#yslider").slider("value", 0);
  $("#yspinner").spinner("value", 0);
}
function varchange() {
  //Variable x slider and number input types
  $("#xslider").slider({ max: 100, min: -100, step: 1 }); // slider initialisation : jQuery widget
  $("#xspinner").spinner({ max: 100, min: -100, step: 1 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number

  $("#xslider").on("slide", function (e, ui) {
    $("#xspinner").spinner("value", ui.value);
    varupdate();
  });
  $("#xspinner").on("spin", function (e, ui) {
    $("#xslider").slider("value", ui.value);
    varupdate();
  });
  $("#xspinner").on("change", function () {
    varchange();
  });

  //Variable y slider and number input types
  $("#yslider").slider({ max: 100, min: -100, step: 1 }); // slider initialisation : jQuery widget
  $("#yspinner").spinner({ max: 100, min: -100, step: 1 }); // number initialisation : jQuery widget
  $("#yslider").on("slide", function (e, ui) {
    $("#yspinner").spinner("value", ui.value);
    varupdate();
  });
  $("#yspinner").on("spin", function (e, ui) {
    $("#yslider").slider("value", ui.value);
    varupdate();
  });
  $("#yspinner").on("change", function () {
    varchange();
  });
  varupdate();
}
function varupdate() {
  $("#xslider").slider("value", $("#xspinner").spinner("value")); //updating slider location with change in spinner(debug)
  $("#yslider").slider("value", $("#yspinner").spinner("value"));

  k = $("#yspinner").spinner("value"); //Updating variables
  m = $("#xspinner").spinner("value"); //Updating variables
  k = -k + 225;
  m = m + 250;
  updateQuadrant();
  if (!nextCanvas) drawShape();
  else newCanvas();
}

function drawShape() {
  nextCanvas = false;
  previous.classList.add("hide");
  next.classList.remove("hide");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    ctx.font = " Bold 20px 'Nunito' sans MS";
    ctx.font = "16px comic sans MS";
    ctx.fillStyle = "black";
    ctx.clearRect(0, 0, 500, 500);
    canvas_arrow(ctx, 400, 225, 490, 225, 4);
    canvas_arrow(ctx, 490, 225, 10, 225, 4);
    canvas_arrow(ctx, 250, 10, 250, 400, 4);
    canvas_arrow(ctx, 250, 400, 250, 80, 4);
    ctx.beginPath();
    ctx.moveTo(250, 400);
    ctx.lineTo(250, 75);
    ctx.moveTo(10, 225);
    ctx.lineTo(490, 225);
    ctx.stroke();
    ctx.fillText("X-axis", 435, 245);
    ctx.fillText("Y-axis", 285, 80);
    ctx.beginPath();
    ctx.arc(m, k, 4, 0, 2 * Math.PI);
    ctx.fillText(`(${m - 250}, ${-k + 225})`, m - 30, k - 10);
    ctx.fillStyle = "#db1d1d";
    ctx.fill();
    ctx.closePath();
  } else {
    alert("You need Safari or Firefox 1.5+ to see this demo.");
  }
}
function updateQuadrant() {
  let m1 = m - 250;
  let k1 = -k + 225;
  if (m1 < 0 && k1 > 0) {
    quadrantImg.src = "./images/quad2.png";
    quadrant = 2;
  } else if (k1 < 0 && m1 > 0) {
    quadrantImg.src = "./images/quad4.png";
    quadrant = 4;
  } else if (k1 < 0 && m1 < 0) {
    quadrantImg.src = "./images/quad3.png";
    quadrant = 3;
  } else {
    quadrantImg.src = "./images/quad1.png";
    quadrant = 1;
  }
}
function canvas_arrow(context, fromx, fromy, tox, toy, r) {
  var x_center = tox;
  var y_center = toy;

  var angle;
  var x;
  var y;

  context.beginPath();

  angle = Math.atan2(toy - fromy, tox - fromx);
  x = r * Math.cos(angle) + x_center;
  y = r * Math.sin(angle) + y_center;

  context.moveTo(x, y);

  angle += (1 / 3) * (2 * Math.PI);
  x = r * Math.cos(angle) + x_center;
  y = r * Math.sin(angle) + y_center;

  context.lineTo(x, y);

  angle += (1 / 3) * (2 * Math.PI);
  x = r * Math.cos(angle) + x_center;
  y = r * Math.sin(angle) + y_center;

  context.lineTo(x, y);

  context.closePath();
  context.fillStyle = "black";

  context.fill();
}

function newCanvas() {
  nextCanvas = true;
  previous.classList.remove("hide");
  next.classList.add("hide");
  ctx.clearRect(0, 0, 500, 500);
  ctx.fillStyle = "black";
  ctx.font = " Italic Bold 20px comic sans MS";
  ctx.lineWidth = 2;

  ctx.strokeStyle = "black";

  ctx.moveTo(20, 225);
  ctx.lineTo(470, 225);
  ctx.stroke();

  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.moveTo(250, 225);
  ctx.lineTo(250, k);
  ctx.moveTo(250, 225);
  ctx.lineTo(250, m - 25);
  // ctx.stroke();

  ctx.strokeStyle = "#AEADAC";
  ctx.stroke();

  ctx.fillStyle = "red";
  ctx.fillText("a", 255, m - 25);
  ctx.fillText("TOP VIEW", 300, m - 25);
  ctx.save();
  ctx.fillStyle = "blue";
  ctx.fillText("a'", 260, k);
  ctx.fillText("FRONT VIEW", 110, k);
  ctx.moveTo(250, 225);
  ctx.arc(250, k, 5, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.restore();
  ctx.moveTo(250, 225);
  ctx.arc(250, m - 25, 5, 0, 2 * Math.PI);
  ctx.moveTo(250, 225);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.fillText("X", 0, 230);
  ctx.fillText("Y", 480, 230);
  if (quadrant == 1) {
    ctx.fillText("VP", 60, 220);
    ctx.fillText("HP", 60, 244);
  } else if (quadrant == 2) {
    ctx.fillText("VP", 90, 220);
    ctx.fillText("HP", 60, 220);
  } else if (quadrant == 3) {
    ctx.fillText("HP", 60, 220);
    ctx.fillText("VP", 60, 242);
  } else if (quadrant == 4) {
    ctx.fillText("HP", 60, 242);
    ctx.fillText("VP", 90, 242);
  }
}
