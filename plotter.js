//Constructor
var plotterClass = function (spec) {
//Define Inheritance
	var that = {};
//private atributes and methods
	var zero = {
		x: 50,
		y: 50
	};
	var L;
	var xBorder;
	var canvas = (function(){
		var canvas = document.getElementById(spec.canvasID);
		return canvas.getContext("2d");
	})();
//public atributes and methods

	that.set_xBorder = function ( number ) {
		xBorder = number;
	};
	that.set_L = function ( number ) {
		L = number;
	};
	
	that.draw = function ( p ) {
		var xi = p.xi <= xBorder ? p.xi : xBorder; 
		var yi = p.xi <= xBorder ? 0 : p.xi - xBorder; 
		var resto = p.xi <= xBorder ? -(xBorder - xi) : yi ;
		
		canvas.clearRect(0, 0, spec.canvasW, spec.canvasH);
		
		//zona horizontal
		canvas.beginPath();
		canvas.lineWidth=10;
		canvas.moveTo(zero.x + xi, zero.y);
		canvas.lineTo(zero.x + xBorder, zero.y);
		canvas.stroke();
		
		//zona vertical
		canvas.beginPath();
		canvas.lineWidth=10;
		canvas.moveTo(zero.x + xBorder, zero.y + yi);
		canvas.lineTo(zero.x + xBorder, zero.y + L + resto );
		canvas.stroke();
	};
	
	return that;
}

var plotter = plotterClass({canvasID: 'can', canvasW: 600, canvasH: 400});
plotter.set_xBorder( 100 );
plotter.set_L( 200 );
//debugging
var i = 0;


setInterval(function(){
		plotter.draw({xi: i });
		i++
		}, 1000/50);


