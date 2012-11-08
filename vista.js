var initSimul = function () {
	var x0 = parseFloat( document.getElementById('x0').value ),
		x1 = parseFloat( document.getElementById('x1').value ),
		xBorder = parseFloat( document.getElementById('xBorder').value ),
		L = parseFloat( document.getElementById('L').value ),
		g = parseFloat( document.getElementById('g').value ),
		u = parseFloat( document.getElementById('u').value ),
		dt = parseFloat( document.getElementById('dt').value );
		n = parseFloat( document.getElementById('n').value );
		
	var canvasID = "can",
		canvasW = 300,
		canvasH = 400;
	
	document.getElementById('canvasWrapper').innerHTML = '';
	document.getElementById('canvasWrapper').innerHTML = '<canvas id=' + canvasID + ' width='+ canvasW +' height='+ canvasH +'>Please user a modern Web Browser</canvas>';
	document.getElementById('paperWrapper').innerHTML = '<p> Posicion vs Tiempo Diferencias Finitas </p>';
	document.getElementById('paperWrapper2').innerHTML = '<p> Posicion vs Tiempo Metodo Analitico </p>';


	
	var calc = calculator({iniCon: [x0, x1], xBorder: xBorder, L: L, dt: dt, g: g, u: u, n: n, canvasID: "can", canvasW: 300, canvasH: 400 });
	calc.draw();
	
	var r = Raphael("paperWrapper");
	r.linechart(70, 0, 300, 300, calc.get_vData_t(), calc.get_vData(), { nostroke: false, axis: "0 0 1 1", symbol: "circle", smooth: true })	
	
	var s = Raphael("paperWrapper2");
	s.linechart(70, 0, 300, 300, calc.get_vData_t(), calc.get_analytical(), { nostroke: false, axis: "0 0 1 1", symbol: "circle", smooth: true })
	
	//console.log(calc.get_vData());
	//console.log(calc.get_analytical());

}







