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


	var K = g * ( L - xBorder * ( 1 + u ) );

	var dtK = dt * dt / L;

	var v = vData[1] - vData[0];
	var factor = spec.factor <= 1/10 ? spec.factor : 1/10; //se agrega para evitar que Len tienda a infinity muy rapido, asi todo da resultado	
	
	//Analitycal Solution
	
	var vDataA = [];
	

	that.calculate = function (plus) {
		var x;
		var Len = L;
		vData = [spec.iniCon[0], spec.iniCon[1]];
		for(var i = 1; i < n ;i++){
			
			x = vData[i] * ( dtK * g * ( 1 + u) + 2) - vData[i-1] + dtK * K;
			if(plus){
				Len +=Len * dt * i * factor;
				K = g * ( Len - xBorder * ( 1 + u ) );
				dtK = dt * dt / Len;	
			}
			v = vData[i] - vData[i-1]; //calculo la velocidad x(i) - x(i-1)


			//controlo para evitar que suba
			if( v < 0 ){
				for(var i = 0; i <n; i++){
					vData[i] = 0;
				};
				break;
			};

			if( x ){
				vData.push(x); //si hay exito, agrego el nuevo elemento al vector de datos
			}else{
				vData.push(0);
			};
		};
	};

	
	that.draw = function (plus) {

		that.calculate( plus);
		var plotter = plotterClass({canvasID: spec.canvasID, canvasW: spec.canvasW, canvasH: spec.canvasH,factor: factor, xBorder: xBorder, L: L, dt: dt, vData: vData });
		plotter.draw(plus);
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
	
	that.get_analytical = function () {
		
		var b = g/L * (1 + u);
	
		var c = g * (1 - xBorder/L * (1 + u)) ;
		
		var k1 = (function(){
			var e = Math.E;
		
			var alpha = spec.iniCon[0],
				betha = spec.iniCon[1];
				
			var w, z;
			
			w = alpha - betha/ Math.pow(e, -1 * Math.sqrt(b) * dt) + c/b * (1 - 1/ Math.pow(e, -1 * Math.sqrt(b) * dt));
			
			z = 1 - Math.pow(e, Math.sqrt(b) * dt)/ Math.pow(e, -1 * Math.sqrt(b) * dt);
			
			return w/z
		})();
		
		var k2 = (function(){
			var e = Math.E;
			var betha = spec.iniCon[1];
			
			var w,z;
			
			w = betha + c/b - k1 * Math.pow(e, Math.sqrt(b) * dt);
			
			z = Math.pow(e, -1 * Math.sqrt(b) * dt);
			
			return w/z
		})();
	
	
		vDataA = [spec.iniCon[0], spec.iniCon[1]];
		var e = Math.E;
		var x, v;
		for(var i = 1; i < n; i++){
			x = k1 * Math.pow(e, Math.sqrt(b) * dt * i) + k2 * Math.pow(e, -1 * Math.sqrt(b) * dt * i) - c/b;
			
			v = x - vDataA[i];
			
			//controlo para evitar que suba
			if( v < 0 ){
				for(var i = 0; i <n; i++){
					vDataA[i] = 0;
				};
				break;
			};
			
			vDataA.push(x); //if everything is ok, push
		};
	
		return vDataA
	};
	

	return that;
}

//interfaz
//var calc = calculator({iniCon: [0,1], xBorder: 100, L: 200, dt: 1/60, g: 300, u: 0.3, n: 1000, canvasID: "can", canvasW: 300, canvasH: 400 });
//calc.draw();