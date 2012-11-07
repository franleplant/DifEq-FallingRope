var initSimul = function () {
	var x0 = parseFloat( document.getElementById('x0').value ),
		x1 = parseFloat( document.getElementById('x1').value ),
		xBorder = parseFloat( document.getElementById('xBorder').value ),
		L = parseFloat( document.getElementById('L').value ),
		g = parseFloat( document.getElementById('g').value ),
		u = parseFloat( document.getElementById('u').value ),
		dt = parseFloat( document.getElementById('dt').value );
		n = parseFloat( document.getElementById('n').value );
	
	
	console.log( {iniCon: [x0, x1], xBorder: xBorder, L: L, dt: dt, g: g, u: u, n: n } );
	var calc = calculator({iniCon: [x0, x1], xBorder: xBorder, L: L, dt: dt, g: g, u: u, n: n });
	calc.draw();
	delete r;
	var r = Raphael(650, 120, 640, 480);
	r.linechart(120, 0, 400, 400, calc.get_vData_t(), calc.get_vData(), { nostroke: false, axis: "0 0 1 1", symbol: "circle", smooth: true })	
	

}







