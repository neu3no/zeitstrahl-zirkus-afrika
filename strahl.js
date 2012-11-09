

const font="Calibri";
const pageTitle="Zirkus Afrika";

var canvas;
var box="";
var highlighted=0;
var lastY=2011;
var minH = 520;
var minW = 800;

if (window.location.hash != undefined) lastY=window.location.hash;
lastY=lastY.split("#").join("");

// Strahlparameter
var sX=0.1;
var sY=0;
var sH=24;
var ymax=2011;
var ymin=1996;

// Box
var boxX = 0.1;
var boxY = 100;
var boxW = 1 - 2*boxX;
var boxH = 0.7;

var rect = function(mx,my){
	var w = 0.8 * canvas.width;
	var h = sH;
	var x = sX * canvas.width;
	var y = canvas.height -4*h;
	var context=canvas.getContext('2d');

	// Zeitstahl als solches
	context.beginPath();
		context.strokeStyle = '#fff';
		context.fillStyle = '#fff';
		context.moveTo(x,y);
		context.lineTo( x+w-h, y);
		context.lineTo( x+w, y+h/2); // Pfeilspitze
		context.lineTo( x+w-h, y+h);
		context.lineTo( x, y+h);
		context.lineTo( x, y);
	context.stroke();context.fill();
	
	// Trennstriche und Jahreszahlen
	var ystep=(w-h)/(2+ymax-ymin);
	var year;
	for (i=0; i<=ymax-ymin;i++){
		context.font = '12pt ' + font;
		context.fillStyle = 'black';
		context.textAlign = 'left';
		context.fillText(ymin+i, x+(i*ystep)+ystep/2 + 4, y+22);
		context.beginPath();
			if ( mx>x+(i*ystep)+ystep/2 &&
				 mx<x+((1+i)*ystep)+ystep/2){
				context.strokeStyle = '#f00';
				year=ymin+i;
			} else { 
				context.strokeStyle = '#ddd';
			}
			context.moveTo(x+(i*ystep)+ystep/2,y);
			context.lineTo(x+(i*ystep)+ystep/2,y+h);
		context.stroke();
	};
	return year;
};

var drawHeader = function() {
	var context=canvas.getContext('2d');
	
	context.font = '36pt ' + font;
	context.textAlign = 'center';
	context.fillStyle = "#888";
	context.fillText(pageTitle, canvas.width/2+2,48+1);
	context.fillStyle = "#fff";
	context.fillText(pageTitle, canvas.width/2-2,48-1);
	context.fillStyle = 'black';
	context.fillText(pageTitle, canvas.width/2,48);
	context.fillText(pageTitle, canvas.width/2+1,48);
};

var drawBackground = function(){
	var w = canvas.width;
	var h = canvas.height;
	var context=canvas.getContext('2d');
	var gradient =  context.createLinearGradient(0,0, 0,h);

	gradient.addColorStop(0,"#eee");
	gradient.addColorStop(1,"#ccc");
	context.fillStyle   = gradient;
	context.strokeStyle = '#fee';
	context.fillRect(0,0,w,h);
	context.lineWidth  = 3;
	context.fill();
};

var initCanvas = function(){
	var w=$(window).width();
	var h=$(window).height()-4;
	
	if (w < minW) w = minW;
	if (h < minH) h = minH;
	
	canvas.height=h;
	canvas.width=w;
	
	box.width(w*boxW);
	box.height(h*boxH);
	box.css("left",boxX * w);
	box.css("top", boxY);
	
	drawBackground();
	drawHeader();
};

var init = function(){
	canvas=document.getElementById("cv");
	box=$("div#text");
	initCanvas();
	rect();
	tmp = lastY;
	lastY=0;
	updateText(tmp);
};

var updateText = function(year){
	if (lastY !=year){
		$(".entry").hide();
		$(".entry."+year).show();
		lastY=year;
	}
	window.location.hash = (year);
};

var mouse = function(e){
	if (
		e.pageY > canvas.height - 4*sH &&
		e.pageY < canvas.height - 3*sH &&
		e.pageX > (1*sX)*canvas.width && 
		e.pageX < (1-(sX*1.5))*canvas.width
	){
		drawBackground();
		drawHeader();
		year=rect(e.pageX, e.pageY);
		updateText(year);
		highlighted = 1;
	} else if(highlighted) {
		highlighted=0;
		init();
	}
};

$(document).ready(init);
$(window).resize(init);
$(document).mousemove(mouse);