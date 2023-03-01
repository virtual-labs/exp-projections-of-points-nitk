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
function drawShape() {
  var canvas = document.getElementById("simscreen");

  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    canvas_arrow(ctx, 300, 225, 450, 225, 4);
    canvas_arrow(ctx, 450, 225, 100, 225, 4);
    canvas_arrow(ctx, 275, 100, 275, 375, 4);
    canvas_arrow(ctx, 275, 375, 275, 80, 4);
    ctx.beginPath();
    ctx.moveTo(275, 375);
    ctx.lineTo(275, 75);
    ctx.moveTo(100, 225);
    ctx.lineTo(450, 225);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.font = "Italic Bold 20px comic sans MS";
    ctx.fillStyle = "black";
    ctx.fillText("X-axis", 450, 245);
    ctx.fillText("Y-axis", 285, 80);
  } else {
    alert("You need Safari or Firefox 1.5+ to see this demo.");
  }
}
function updatewidth(val) {
  document.getElementById("widthInput").value = val;
}
function updatesliderwidth(val) {
  document.getElementById("wid").value = val;
}
function updatesliderheight(val) {
  document.getElementById("hgt").value = val;
}
function updateheight(val) {
  document.getElementById("heightInput").value = val;
}
function writeMessage(message) {
  document.getElementById("commentboxleft").innerText = message;
}
function getMousePos(canvas, evt) {
  var canvas = document.getElementById("simscreen");
  var context = canvas.getContext("2d");
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}
function newa() {
  var canvas = document.getElementById("simscreen");
  var context = canvas.getContext("2d");
  context.beginPath();
  // canvas.addEventListener(
  //   "mousemove",
  //   function (ev) {
  //     var mousePos = getMousePos(canvas, ev);
  //     var message =
  //       "X: " + (mousePos.x - 275) + ", Y: " + parseInt(mousePos.y - 225);
  //     writeMessage(message);
  //   },
  //   false
  // );
}
function updatecanvas1() {
  var we = document.getElementById("one").style.visibility;
  if (we == "visible") newcanvas();
  else updatecanvas();
}
function updatecanvas() {
  document.getElementById("two").style.visibility = "visible";
  document.getElementById("one").style.visibility = "hidden";
  document.getElementById("1").style.visibility = "hidden";
  document.getElementById("2").style.visibility = "hidden";
  document.getElementById("3").style.visibility = "hidden";
  document.getElementById("4").style.visibility = "hidden";
  document.getElementById("commentboxright").innerHTML = "";
  var canvas = document.getElementById("simscreen");
  var context = canvas.getContext("2d");
  var k = -Number(document.getElementById("heightInput").value) + 225;
  var m = Number(document.getElementById("widthInput").value) + 275;
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawShape();
  context.font = "16px comic sans MS";
  context.beginPath();
  context.arc(m, k, 3, 0, 2 * Math.PI);
  context.fillStyle = "#FF0000";
  context.fill();
  context.closepath();
}
function newcanvas() {
  var canvas = document.getElementById("simscreen");
  var context = canvas.getContext("2d");
  document.getElementById("titleincanvas").innerText = "Distance From Planes";
  document.getElementById("commentboxright").innerHTML =
    "VP = Vertical Plane</br> HP = Horizontal Plane";
  var k = Number(document.getElementById("heightInput").value);
  var m = Number(document.getElementById("widthInput").value);
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.fillStyle = "black";
  context.font = " Italic Bold 20px comic sans MS";
  context.lineWidth = 3;
  if (m < 0 && k > 0) {
    context.fillText("VP", 90, 220);
    context.fillText("HP", 60, 220);
    document.getElementById("2").style.visibility = "visible";
    document.getElementById("1").style.visibility = "hidden";
    document.getElementById("3").style.visibility = "hidden";
    document.getElementById("4").style.visibility = "hidden";
  } else if (k < 0 && m > 0) {
    context.fillText("HP", 60, 242);
    context.fillText("VP", 90, 242);
    document.getElementById("4").style.visibility = "visible";
    document.getElementById("1").style.visibility = "hidden";
    document.getElementById("3").style.visibility = "hidden";
    document.getElementById("2").style.visibility = "hidden";
  } else if (k < 0 && m < 0) {
    context.fillText("HP", 60, 220);
    context.fillText("VP", 60, 242);
    document.getElementById("3").style.visibility = "visible";
    document.getElementById("2").style.visibility = "hidden";
    document.getElementById("1").style.visibility = "hidden";
    document.getElementById("4").style.visibility = "hidden";
  } else {
    context.fillText("VP", 60, 220);
    context.fillText("HP", 60, 244);
    document.getElementById("1").style.visibility = "visible";
    document.getElementById("2").style.visibility = "hidden";
    document.getElementById("3").style.visibility = "hidden";
    document.getElementById("4").style.visibility = "hidden";
  }
  context.lineWidth = 3;
  context.strokeStyle = "black";

  context.moveTo(50, 225);
  context.lineTo(525, 225);
  context.stroke();

  context.lineWidth = 1;

  context.beginPath();
  context.moveTo(275, 225);
  context.lineTo(275, 225 - k);
  context.moveTo(275, 225);
  context.lineTo(275, 225 + m);
  // context.stroke();

  context.strokeStyle = "#AEADAC";
  context.stroke();

  context.fillStyle = "red";
  context.fillText("a", 255, 227 + m);
  context.fillText("TOP VIEW", 300, 227 + m);
  context.save();
  context.fillStyle = "blue";
  context.fillText("a'", 285, 225 - k);
  context.fillText("FRONT VIEW", 110, 225 - k);
  context.moveTo(275, 225);
  context.arc(275, 225 - k, 5, 0, 2 * Math.PI);
  context.fill();
  context.beginPath();
  context.restore();
  context.moveTo(275, 225);
  context.arc(275, 225 + m, 5, 0, 2 * Math.PI);
  context.moveTo(275, 225);
  context.fill();
  context.beginPath();
  context.fillStyle = "black";

  context.fillText("X", 30, 230);
  context.fillText("Y", 525, 230);

  document.getElementById("two").style.visibility = "hidden";
  document.getElementById("one").style.visibility = "visible";
}
