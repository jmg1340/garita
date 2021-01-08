var models = require("../models/models.js"); 
var Sequelize = require("sequelize");



/*** AUTOLOAD : factoriza el codigo si ruta incluye :personalId  ***/
exports.loadPersonal = function(req, res, next, personalId){
	models.TblPersonal.findById(personalId).then(function(oPersonal){
		if (oPersonal){
			req.personal = oPersonal;
			next();
		} /*else{
			next(new Error('No existeix personalId=' + personalId));
		}
	}).catch (function(error){
		next(error);
	});*/
	})
}


/*** AUTOLOAD : factoriza el codigo si ruta incluye :codi_ES  ***/
exports.loadES = function(req, res, next, codi_ES){
	models.TblES.findById(codi_ES).then(function(oES){
		if (oES){
			req.ES = oES;
			next();
		} /*else{
			next(new Error('No existeix personalId=' + personalId));
		}
	}).catch (function(error){
		next(error);
	});*/
	})
}







/***********************************************************************************/
/*********************   pantalla ENTRADES / SORTIDES   ****************************/
/***********************************************************************************/
exports.entradesSortides = function (req, res){
	
	// variable objecte 'oES' utilitzada per al formulari de nou registre a taula ES
	//var oES = models.TblES.build({idPersonal: "", data: "", hora: "", ES: ""});
	var oES = {
		idPersonal: 			"", 
		autocompletarNom: 		"", 
		autoCompletarVehicle: 	"", 
		atoCompletarMatricula: 	"", 
		data: 					"", 
		hora: 					"", 
		ES: 					""
	};
	
	// 'data' recollida del parametre '?data=dataSeleccionada' (datepicker)
	var formData = req.params["data"] || null;
	//console.log ("formData: " + formData);
	if(formData === null){
		// formData pren el valor de la data actual
		var mes = (new Date().getMonth()+1 < 10) ? "0" + (new Date().getMonth()+1) : (new Date().getMonth()+1) ;
		var dia =  (new Date().getDate() < 10) ? "0" + (new Date().getDate()) : (new Date().getDate());
		formData = mes  + "/" + dia + "/" + new Date().getFullYear();
		console.log ("formData quan es NULL: " + formData);
	}else{
		// formData pren el valor de la data seleccionada (datapicker)
		formData = formData.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3");  //canvia dd/mm/aaaa per mm/dd/aaaa
		//console.log ("formData NO NULL; canvi format: " + formData);

	}

	models.TblES.findAll({include: models.TblPersonal, where: {"data": new Date(formData)}, order: "hora DESC"}).then(function(tblESPersonal){
  		//console.log(JSON.stringify(tblESPersonal));
	  	
  		// Es crea una nova propietat a l'obecte tblESPersonal (de nom "horaHHMM") on posem la hora amb el format HH:MM
		for (i=0; i < tblESPersonal.length; i++){
			
			var hora2 = tblESPersonal[i].hora.toString();
			console.log("hora2: " + hora2);
			var hora3 = hora2.substr(0,2);
			var min =  hora2.substr(3,2);

			tblESPersonal[i].horaHHMM =  hora3 + ":" + min;
		}




  		// El valor de formData es torna a enviar al formulari amb el format dd/mm/aaaa
  		formData = formData.replace( /(\d{2})\/(\d{2})\/(\d{4})/, "$2-$1-$3");  //canvia mm/dd/aaaa per dd/mm/aaaa
	  	//console.log("dataEnviada: " + formData);
	  	
	  	
	  	// carrega la pagina ES.ejs amb les dades:
	  	//	title: titol de la pagina
	  	//	tbl: objecte que recull el llistat d'entrades sortides del dia seleccionat
	  	//  dataEnviada: data que es posarà al datapicker quan carregui la pagina
	  	//	objES: objecte que s'utilitza per despres recuperar les dades del formulari de nou registre
	  	//  zErrores: recull errors cas de que no es compleixi alguna validacio en el formulari de nou registre
	  	res.render("garita/es", {title: "Entrades / Sortides", tbl: tblESPersonal, dataEnviada: formData, objES: oES, zErrores: []});
	});		
}


/*** pantalla nova Entrada/Sortida  ***/
/*
exports.novaEntradaSortida = function (req, res){
	res.render("garita/es_nou", {title: "Entrades / Sortides - nou registre"});
}
*/


/***************************AFEGIR REGISTRE A TAULA 'ES' ***************************/
exports.afegirES = function(req, res){
	// Los nombres de los parámetros del formulario
	// - name="objES[codi]”
	// - name="objES[data]”
	// - name="objES[hora]”
	// - name="objES[ES]”
	// utilizan notación pseudo JSON que permite indicar que son propiedades de un objeto
	// quiz. El middleware bodyparser.urlencoded(..) los analiza correctamente y genera
	// el objeto req.body.objES, si quitamos el parámetro de configuración {extended: false}
	// que express-generator incluyo cuando generó el proyecto.

	var oDadesFormulari = req.body.objES;
	
	var oDadesES = models.TblES.build({
		idPersonal: oDadesFormulari.idPersonal,
		data: 		oDadesFormulari.data,
		hora: 		oDadesFormulari.hora,
		ES: 		oDadesFormulari.ES
	});
	// S'ha de canviar el format de oDadesFormulari.data. De dd/mm/aaaa a mm/dd/aaaa
	//console.log("oDadesFormulari.data: " + oDadesFormulari.data);
	//oDadesFormulari.data = oDadesFormulari.replace( /(\d{2})\/(\d{2})\/(\d{4})/, "$2-$1-$3"); 

	//guarda en DB els camps nom, vehicle i matricula
	oDadesES.validate().then(function(err){
		console.log("************ VALIDACIO **************");
		var data2 = new Date(oDadesFormulari.data);
		
		var mes = (data2.getMonth()+1 < 10) ? "0" + (data2.getMonth()+1) : (data2.getMonth()+1) ;
		var dia =  (data2.getDate() < 10) ? "0" + (data2.getDate()) : (data2.getDate());
		var data3 = mes  + "-" + dia + "-" + data2.getFullYear();


		if(err){
			console.log("************ HI HA ERRORS **************");
			console.log("err.errors.length: " + err.errors.length);
			console.log("JSON.stringify(err.errors): " + JSON.stringify(err.errors));


			//-------
			models.TblES.findAll({include: models.TblPersonal, where: {"data": new Date(data3)}, order: "hora DESC"}).then(function(tblESPersonal){
		  		//console.log(JSON.stringify(tblESPersonal));
			  	
		  		// Es crea una nova propietat a l'obecte tblESPersonal (de nom "horaHHMM") on posem la hora amb el format HH:MM
				for (i=0; i < tblESPersonal.length; i++){
					
					var hora2 = tblESPersonal[i].hora.toString();
					//console.log("hora2: " + hora2);
					var hora3 = hora2.substr(0,2);
					var min =  hora2.substr(3,2);

					tblESPersonal[i].horaHHMM =  hora3 + ":" + min;
				}


		  		// El valor de data3 es torna a enviar al formulari amb el format dd/mm/aaaa
		  		data3 = data3.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2-$1-$3");  //canvia mm/dd/aaaa per dd/mm/aaaa
			  	//console.log("dataEnviada: " + data3);
			  	
			  	
			  	// carrega la pagina ES.ejs amb les dades:
			  	//	title: titol de la pagina
			  	//	tbl: objecte que recull el llistat d'entrades sortides del dia seleccionat
			  	//  dataEnviada: data que es posarà al datapicker quan carregui la pagina
			  	//	objES: objecte que s'utilitza per despres recuperar les dades del formulari de nou registre
			  	//  zErrores: recull errors cas de que no es compleixi alguna validacio en el formulari de nou registre
			  	res.render("garita/es", {title: "Entrades / Sortides", tbl: tblESPersonal, dataEnviada: data3, objES: oDadesFormulari, zErrores: err.errors});
			});	
			//-------



			//res.redirect('/es/' + data3, {objPersonal: oDadesFormulari, zErrores: err.errors});
		}else{
			console.log("************ DADES CORRECTES **************");
			oDadesES.save({fields: ["idPersonal", "data", "hora", "ES"]}).then(function(){



				//-------
				models.TblES.findAll({include: models.TblPersonal, where: {"data": new Date(data3)}, order: "hora DESC"}).then(function(tblESPersonal){
			  		//console.log(JSON.stringify(tblESPersonal));
				  	
			  		// Es crea una nova propietat a l'obecte tblESPersonal (de nom "horaHHMM") on posem la hora amb el format HH:MM
					for (i=0; i < tblESPersonal.length; i++){
						
						var hora2 = tblESPersonal[i].hora.toString();
						//console.log("hora2: " + hora2);
						var hora3 = hora2.substr(0,2);
						var min =  hora2.substr(3,2);

						tblESPersonal[i].horaHHMM =  hora3 + ":" + min;
					}


			  		// El valor de data3 es torna a enviar al formulari amb el format dd/mm/aaaa
			  		data3 = data3.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2-$1-$3");  //canvia mm/dd/aaaa per dd/mm/aaaa
				  	//console.log("dataEnviada: " + data3);
				  	
				  	

					oDadesFormulari = {
						idPersonal: 			"", 
						autocompletarNom: 		"", 
						autoCompletarVehicle: 	"", 
						atoCompletarMatricula: 	"", 
						data: 					"", 
						hora: 					"", 
						ES: 					""
					};





				  	// carrega la pagina ES.ejs amb les dades:
				  	//	title: titol de la pagina
				  	//	tbl: objecte que recull el llistat d'entrades sortides del dia seleccionat
				  	//  dataEnviada: data que es posarà al datapicker quan carregui la pagina
				  	//	objES: objecte que s'utilitza per despres recuperar les dades del formulari de nou registre
				  	//  zErrores: recull errors cas de que no es compleixi alguna validacio en el formulari de nou registre
				  	res.render("garita/es", {title: "Entrades / Sortides", tbl: tblESPersonal, dataEnviada: data3, objES: oDadesFormulari, zErrores: []});
				});	
				//-------





				//res.redirect('/es/' + data3, {objPersonal: oDadesFormulari, zErrores: []});
			});
		}
	});


}
 


/*** widget Autocompletar  ***/
exports.autocompletar = function (req, res){
	var strTextBuscar = "%" + req.query["term"] + "%"; // 'term' es la variable enviada des del widget 'autocomplete'
	console.log("strTextBuscar: " + strTextBuscar);
	var strCampBuscar = req.query["campBusqueda"];

	// ATENCIO: l'operador "ilike" serveix per ignorar majuscules / minuscules. 
	// Aquest operador sembla ser que nomes es valide per a Postgres
	models.TblPersonal.findAll({where: [strCampBuscar + " ilike ?", strTextBuscar], order: "nom ASC"}).then(function(tblPersonal, err){

		//console.log(JSON.stringify(tblPersonal));
		console.log("tblPersonal.length: " + tblPersonal.length);

		if (!err) {
			// Method to construct the json result set
			var result = JSON.stringify(tblPersonal);   //array de tipus [{...},{...},{...}, ... ]
			//var result = {"resultats" : result2};
			console.log("result: " + result);

			res.send(result, {
				'Content-Type': 'application/json'
			}, 200);
		} else {
			res.send(JSON.stringify(err), {
			    'Content-Type': 'application/json'
			}, 404);
		}		
	});	
}




/************************** ELIMINACIO REGISTRE DE TAULA 'ES' ******************************/
exports.eliminarES = function(req, res){
	console.log(" ** estic a la funcio eliminarES **");

	// objecte req.personal generada en el middleware AUTOLOAD
	req.ES.destroy().then(function(){
		var vData2 = new Date(req.body.formdata);
		console.log("vData2: " + vData2);
		var mes = (vData2.getMonth()+1 < 10) ? "0" + (vData2.getMonth()+1) : (vData2.getMonth()+1) ;
		var dia =  (vData2.getDate() < 10) ? "0" + (vData2.getDate()) : (vData2.getDate());
		var vData3 = dia  + "-" + mes + "-" + vData2.getFullYear();

		res.redirect('/es/' + vData3);
	})
}














/***********************************************************************************/
/****************************     pantalla PERSONAL     ****************************/
/***********************************************************************************/
exports.personal = function (req, res){

	var strTextBuscar = (req.query.txtBuscar || null);
	var strCampBuscar = (req.query.campBuscar || "nom");
	console.log("strTextBuscar: " + strTextBuscar);
	console.log("strCampBuscar: " + strCampBuscar);

	if (strTextBuscar === null){
		strTextBuscar = "%";
	}else{
		strTextBuscar ="%" + strTextBuscar.replace(/ /g, '%') + "%";
	}
	
	// ATENCIO: l'operador "ilike" serveix per ignorar majuscules / minuscules. 
	// Aquest operador sembla ser que nomes es valide per a Postgres
	models.TblPersonal.findAll({where: [strCampBuscar + " ilike ?", strTextBuscar], order: [Sequelize.col('nom', 'personal')]}).then(function(tblPersonal){
  
	  // renderitza a la pagina Personal.ejs amb les dades 
	  res.render("garita/personal", {title: "Personal", tbl: tblPersonal, zErrores:[]});
	});		

}



/***********************************************************************************/
/************************ pantalla FORMULARI NOU PERSONAL **************************/
/***********************************************************************************/
exports.nouPersonal = function (req, res){
	  
	  // variable objecte 'personal' utilitzada per al formulari de nou registre de personal
	  var oPersonal = models.TblPersonal.build({nom: "", vehicle: "", matricula: "", nif: "", empresa: "", categoria: ""});
	  
	  // renderitza a la pagina Personal.ejs amb les dades 
	  res.render("garita/personal_nou", {title: "Personal -> nou registre", objPersonal: oPersonal, zErrores:[]});		

}



/****************** INTRODUCCIO NOU REGSITRE A TAULA 'PERSONAL' *******************/
exports.afegirPersonal = function(req, res){
	// Los nombres de los parámetros del formulario
	// - name="objPersonal[nom]”
	// - name="objPersonal[vehicle]”
	// - name="objPersonal[matricula]”
	// utilizan notación pseudo JSON que permite indicar que son propiedades de un objeto
	// quiz. El middleware bodyparser.urlencoded(..) los analiza correctamente y genera
	// el objeto req.body.objPersonal, si quitamos el parámetro de configuración {extended: false}
	// que express-generator incluyo cuando generó el proyecto.

	var oDadesFormulari = models.TblPersonal.build( req.body.objPersonal);

	//console.log("oDadesFormulari.nom: " + oDadesFormulari.nom);

	//guarda en DB els camps nom, vehicle i matricula previa validació
	oDadesFormulari.validate().then(function(err){
		if(err){
			res.render("garita/personal_nou", {title: "Personal -> nou registre", objPersonal: oDadesFormulari, zErrores: err.errors});
		}else{
			oDadesFormulari.save({fields: ["nom", "vehicle", "matricula", "nif", "empresa", "categoria"]}).then(function(){
				res.redirect('/personal');
			});
		}
	});
}





/***********************************************************************************/
/************************ pantalla FORMULARI EDICIO PERSONAL ***********************/
/***********************************************************************************/
exports.edicioPersonal = function (req, res){
	  
	// objecte req.personal generada en el middleware AUTOLOAD
	var oPersonal = req.personal;

	// renderitza a la pagina Personal_edicio.ejs amb les dades del registre a modificar
	res.render("garita/personal_edicio", {title: "Edicio registre Personal", objPersonal: oPersonal, zErrores:[]});
}




/***********************  MODIFICAR REGISTRE A TAULA 'PERSONAL' *********************/
exports.modificarPersonal = function (req, res){
	  
	// objecte req.personal generada en el middleware AUTOLOAD
	req.personal.nom = req.body.objPersonal.nom;
	req.personal.vehicle = req.body.objPersonal.vehicle;
	req.personal.matricula = req.body.objPersonal.matricula;
	req.personal.nif = req.body.objPersonal.nif;
	req.personal.empresa = req.body.objPersonal.empresa;
	req.personal.categoria = req.body.objPersonal.categoria;

	//guarda en DB els camps nom, vehicle i matricula previa validació
	req.personal.validate().then(function(err){
		if(err){
			res.render("garita/personal_nou", {title: "Personal -> nou registre", objPersonal: req.personal, zErrores: err.errors});
		}else{
			req.personal.save({fields: ["nom", "vehicle", "matricula", "nif", "empresa", "categoria"]}).then(function(){
				res.redirect('/personal');
			});
		}
	});

}


/*********************** ELIMINACIO REGISTRE DE TAULA 'PERSONAL' **********************/
exports.eliminarPersonal = function(req, res){
	console.log(" ************* estic a la funcio eliminarPersonal *****************");

	// objecte req.personal generada en el middleware AUTOLOAD
	req.personal.destroy().then(function(){
		res.redirect('/personal');
	})
}












/***********************************************************************************/
/****************************    pantalla CONSULTES     ****************************/
/***********************************************************************************/
exports.consultes = function (req, res){
	
	// variable objecte 'ES' utilitzada per al formulari de nou registre a taula ES
	//var oCONS = models.TblES.build({idPersonal: "", data: "", hora: "", ES: ""});


	// recollida de dades del formulari de la busqueda
	//console.log("********** RECOLLIDA DADES FORMULARI **************");
	//console.log("JSON.stringify(req.query.objFORM): " + JSON.stringify(req.query.objFORM));
	
	if ( req.query.objFORM === undefined ){		// es dona quan carreguem la pagina venint d'una altre
		//console.log("*** req.query.objFORM es UNDEFINED ***");
		var dadesFormulari = {
			idPersonal	: null,
			autoCompletarNom2: null,
			es 			: null,
			data1 		: null,
			data2 		: null
		};
	} else{
		//console.log("*** req.query.objFORM EXISTEIX !!! ***");
		var dadesFormulari = {
			idPersonal	: (req.query.objFORM.idPersonal || null),
			autoCompletarNom2: (req.query.objFORM.autoCompletarNom2         || null),
			es 			: (req.query.objFORM.es         || null),
			data1 		: (req.query.objFORM.data1 	  || null),
			data2 		: (req.query.objFORM.data2 	  || null)
		};
	}	

	//console.log("JSON.stringify(dadesFormulari): " + JSON.stringify(dadesFormulari));

	// Preparacio dels criteris de la consulta
	//console.log("preparacio criteris consulta");
	var existeixAlgunCriteri = false;
	var i;
	if ( req.query.objFORM !== undefined ){
		for (dada in dadesFormulari){
			//console.log("DADA (propietat): " + dada + "\tDADA (valor): " + dadesFormulari[dada]);
			if ((dada !== "data1") && (dada !== "data2")){   	// No tenir en compte els valors de les propietats data1 o data2
				if(dadesFormulari[dada] !== null){
					existeixAlgunCriteri = true;
					//console.log("DADA (propietat): " + dada + "\tDADA (valor): " + dadesFormulari[dada]);
				}  	
			}
		}
	}

	var criteris = {} ;
	if (existeixAlgunCriteri){
		console.log("existeix algun criteri");
		if ((dadesFormulari.idPersonal !== null) && (dadesFormulari.idPersonal !== ''))
			criteris.idPersonal = dadesFormulari.idPersonal;
				
		if ((dadesFormulari.es !== null) && (dadesFormulari.es !== ''))
			criteris.ES = dadesFormulari.es;
		
		//transformacio de dates
		var dadesData1 = dadesFormulari.data1.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2-$1-$3");  //canvia dd/mm/aaaa per mm/dd/aaaa
		var dadesData2 = dadesFormulari.data2.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2-$1-$3");  //canvia dd/mm/aaaa per mm/dd/aaaa
		criteris.data = {$between: [dadesData1 , dadesData2]};    //operador Between a squelize: [valorMin, valorMax]
		
	}else{
		criteris.idPersonal = null;
	}

	console.log("JSON.stringify(criteris): " + JSON.stringify(criteris));


	models.TblES.findAll({include: models.TblPersonal, 
						  //attributes: {include: [Sequelize.fn('date_format', Sequelize.col('data'), '%d-%m-%Y'), 'dataDDMMAAAA']},						
						  where: criteris, 
						  order: [["data", "DESC"], ["hora", "DESC"]]
						}).then(function(tblESPersonal){

		 var i; 
		 for (i=0; i < tblESPersonal.length; i++){
			
			var fecha = tblESPersonal[i].data;
			var mes = (fecha.getMonth()+1 < 10) ? "0" + (fecha.getMonth()+1) : (fecha.getMonth()+1) ;
			var dia =  (fecha.getDate() < 10) ? "0" + (fecha.getDate()) : (fecha.getDate());
			
			tblESPersonal[i].dataDDMMAAAA =  dia + "/" + mes + "/" + fecha.getFullYear();


			var hora2 = tblESPersonal[i].hora.toString();
			//console.log("hora2: " + hora2);
			var hora3 = hora2.substr(0,2);
			var min =  hora2.substr(3,2);

			tblESPersonal[i].horaHHMM =  hora3 + ":" + min;
		}


		console.log("JSON.stringify(tblESPersonal): " + JSON.stringify(tblESPersonal));

	  	// renderitza a la pagina CONSULTES.ejs amb les dades 
	  	res.render("garita/consultes", {title: "Consultes", tbl: tblESPersonal, objFORM: dadesFormulari, autocompletarNom: req.query.autocompletarNom, zErrores:[]});
	});		





}
