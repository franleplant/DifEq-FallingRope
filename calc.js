var calculator = function (spec) {
	var that = {};
	
	var xBorder = spec.xBorder || 100;
	var L = spec.L || 200; //Longitud de la Cuerda
	var g = spec.g || 100; //gravedad
	var u = spec.u || 0.3; //coeficiente de rozamiento
	var dt = spec.dt || 1/60; //Delta t del tiempo
	//x0 = condicion inicial x sub 0
	//x1 = condicion inicial x sub 1
	var vData = spec.iniCon || [0,0]; //Vector de los datos x sub i
		
	var n = spec.n || 1000; //almacena la cantidad de Datos
	
	var K = (function () {
		return g * ( L - xBorder * ( 1 + u ) );
	})();
	
	var dtK = (function () {
		return dt * dt / L;
	})();
	
	var v = (function () {
		return vData[1] + vData[0];
	})();
	
	that.calculate = function () {
		for(var i = 1; i < n ;i++){
			var x;
			x = vData[i] * ( dtK * g * ( 1 + u) + 2) - vData[i-1] + dtK * K;
			v = vData[i] + vData[i-1];
			vData.push(x);
		};
	};
	
	that.draw = function () {
		
		that.calculate( );
		var plotter = plotterClass({canvasID: 'can', canvasW: 600, canvasH: 400, xBorder: xBorder, L: L, dt: dt, vData: vData });
		plotter.draw();
	};
	
	that.get_vData = function () {
		return vData;
	};
	
	that.get_vData_t = function () {
		var vData_t = [];
		for(var i = 0; i < n; i++){
			vData_t[i] = i * dt;
		};
		return vData_t;
	};
	
	return that;
}

//interfaz
//var calc = calculator({iniCon: [0,1], xBorder: 100, L: 200, dt: 1/60, g: 300, u: 0.3, n: 1000 });
//calc.draw();