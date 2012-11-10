//Constructor
var plotterClass = function (spec) {
//Define Inheritance
	var that = {};
//private atributes and methods
	var zero = {
		x: 50,
		y: 50
	};
	var L = spec.L || 200;
	var xBorder = spec.xBorder || 100;
	var dt = spec.det || 1/60;
	var vData = spec.vData;
	var n = vData.length;
	var factor = spec.factor;
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
	
	that.drawFrame = function ( p ) {
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
		if(p.L > xBorder) { //evita que cuando L < xB se produscan anormalidades
			canvas.beginPath();
			canvas.lineWidth=10;
			canvas.moveTo(zero.x + xBorder, zero.y + yi);
			canvas.lineTo(zero.x + xBorder, zero.y + p.L + resto );
			canvas.stroke();
		
		}
		
		//Apoyo fisico
		canvas.fillStyle="#FF0000";
		canvas.fillRect(0, zero.y + 6, zero.x + xBorder - 6, 100);
	};
	
	that.draw = function (plus) {
		var i = 0;
		var intervalId = setInterval(function(){
			if(plus && i > 0) { L += L * dt * i * factor};
			that.drawFrame({xi: vData[i], L:  L});
			
			i++;
			
			if ( i === n - 1) clearInterval( intervalId );
			}, 1000 * dt);
		
	}
	
	return that;
}

//Interfaz
//var plotter = plotterClass({canvasID: 'can', canvasW: 600, canvasH: 400,factor: 1/1000, xBorder: 100, L: 200, dt: 1/60, vDatos: [0, 1, 2, 3, 4, 5, 6, 7 ,8, 9, 10]});
//plotter.draw();





