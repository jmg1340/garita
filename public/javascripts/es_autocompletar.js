
alert ("estic a es_autocompletar.js");
console.log("estic a es_autocompletar.js");







var models = require("../models/models.js"); 


var funcioAutocompletar = function(req, res){
	
	alert ("estic a funcionAutocompletar");

	var strTextBuscar = "%" + req.body.term + "%"; // 'term' es la variable enviada des del widget 'autocomplete'
	var strCampBuscar = "nom";

	
	models.TblPersonal.findAll({where: [strCampBuscar + " like ?", strTextBuscar], order: "nom ASC"}).then(function(tblPersonal){

		//creem una matriu que tindrà 2 valors:
		var matriz=new Array(2);
		for (var i; i < tablPersonal.length; i++){
			matriz[i][0] = tbl.Personal[i].nom;  // label (atuocomplete: per als suggeriments) 
			matriz[i][1] = tbl.Personal[i].vehicle;  // value (atuocomplete: valor opcio seleccionada)
		}

	});		

	JSON.stringify(matriz);

	console.log(JSON.stringify(matriz));
}

funcioAutocompletar();