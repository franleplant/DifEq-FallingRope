//clase
var guide = function () {

	var that = {};
	

	var canvasID = "can",
		canvasW = 300,
		canvasH = 400;


	that.initSimul = function (plus) {
		var x0 = parseFloat( document.getElementById('x0').value ),
			x1 = parseFloat( document.getElementById('x1').value ),
			xBorder = parseFloat( document.getElementById('xBorder').value ),
			L = parseFloat( document.getElementById('L').value ),
			g = parseFloat( document.getElementById('g').value ),
			u = parseFloat( document.getElementById('u').value ),
			dt = parseFloat( document.getElementById('dt').value ),
			n = parseFloat( document.getElementById('n').value ),
			factor = parseFloat( document.getElementById('factor').value );
	
	
		document.getElementById('canvasWrapper').innerHTML = '';
		document.getElementById('canvasWrapper').innerHTML = '<canvas id=' + canvasID + ' width='+ canvasW +' height='+ canvasH +'>Please user a modern Web Browser</canvas>';
		document.getElementById('paperWrapper').innerHTML = '';
			
		var calc = calculator({iniCon: [x0, x1], xBorder: xBorder, L: L, dt: dt, g: g, u: u, n: n, factor: factor, canvasID: "can", canvasW: 300, canvasH: 400 });
		calc.draw(plus);
		
		var paper = Raphael("paperWrapper");
		paper.text(20, 150, "x [m]");
		paper.text(250, 300, "t [s]");
		paper.linechart(150, 0, 280, 280, calc.get_vData_t(), [calc.get_vData(), calc.get_analytical()], { axis: "0 0 1 1", symbol: "", smooth: false, colors: ['#F00', '#0F0'] })		
	}
	
	
	//console.log(calc.get_vData());
	//console.log(calc.get_analytical());
	return that;
}

var guide1 = guide();








