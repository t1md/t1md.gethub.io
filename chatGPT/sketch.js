canvas id="myCanvas" width="550" height="360" style="border:1px solid #d3d3d3;"></canvas
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.moveTo(50,50);
ctx.bezierCurveTo(120,-100,200,250,250,50);
ctx.bezierCurveTo(300,-100,350,250,430,50);
ctx.lineWidth = 5;
ctx.strokeStyle = '#003300';
ctx.stroke();