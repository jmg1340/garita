$(document).ready(function() {


	$("#novaES").bind("click", function(){
		window.location.href = "/es/nouES";
	})


    $( "#seleccioData" ).datepicker({
            dateFormat: "dd-mm-yy",
            constrainInput: true,
            changeMonth: false,
            changeYear: false,
            dateFormat: 'dd-mm-yy',
            firstDay: 1,    //Sunday is 0, Monday is 1, etc.
            dayNames: [ "Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte" ],
            dayNamesMin: [ "Dg", "Dll", "Dm", "Dcr", "Dj", "Dv", "Ds" ],
            monthNames: [ "Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre" ],
            monthNamesShort: ['Gen','Feb','Mar','Abr','Mai','Jun','Jul','Ago','Set','Oct','Nov','Des'],
        	onSelect: function(dataSeleccionada){
        		window.location.href = "/es/" + dataSeleccionada;
        	}
        }).css('width','75px')
    	  .css('text-align','center')
    	  .css('margin-bottom','5px');



	$( "#autocompletarNom" ).autocomplete({
	    source: function (request, response) {
	        $.ajax({
	            url: "/es/autocompletar",
	            type: "GET",
	            positon: {  collision: "flip"  },
	            //data: request,  // request is the value of search input
	            data: {
	            	term: request.term,
	            	campBusqueda: "nom"
	            },
	            success: function (dades) {
	              	// Map response values to field label and value
	               	var arr = JSON.parse(dades);	//array de tipus [{...},{...},{...}, ... ]. JSON correcte
	               	response($.map(arr, function (el){ 
	               		return {
	               			label: (el.vehicle !== null) ? el.nom + " (" + el.vehicle + ")" : el.nom,
	               			value: el
	               		};
	               	}));
	               		            }
	        });
		},
		
		// The minimum number of characters a user must type before a search is performed.
		minLength: 2,

		// set an onFocus event to show the result on input field when result is focused
		focus: function (event, ui) {
			this.value = ui.item.label;
			// Prevent other event from not being execute
			event.preventDefault();
		},
		
	    // per forçar la seleccio d'un item de la llista
	    change: function (event, ui) {
	        if(!ui.item){
	            $(event.target).val("");
			
				$("#codi_personal").val("");
				$("#autocompletarVehicle").val("");
				$("#autocompletarMatricula").val("");

				$("#afegirNouES").attr("disabled", true);
	        }
	    }, 

		select: function (event, ui) {
			// Prevent value from being put in the input:
			this.value = ui.item.label;
			
			// Set the id to the next input hidden field
			//$(this).next("input").val(ui.item.value);
			$("#codi_personal").val(ui.item.value.codi);
			$("#autocompletarVehicle").val(ui.item.value.vehicle);
			$("#autocompletarMatricula").val(ui.item.value.matricula);

			$("#afegirNouES").attr("disabled", false);

			// Prevent other event from not being execute            
			event.preventDefault();

		}

	}).css('width','95%')
	  .css('background-color','ivory');






	$( "#autocompletarVehicle" ).autocomplete({
	    source: function (request, response) {
	        $.ajax({
	            url: "/es/autocompletar",
	            type: "GET",
	            //data: request,  // request is the value of search input
	            data: {
	            	term: request.term,
	            	campBusqueda: "vehicle"
	            },
	            success: function (dades) {
	              	// Map response values to field label and value
	               	var arr = JSON.parse(dades);	//array de tipus [{...},{...},{...}, ... ]
	               	response($.map(arr, function (el){ 
	               		return {
	               			label: el.vehicle + " (" + el.nom + ")",
	               			value: el
	               		};
	               	}));
	               		            }
	        });
		},
		
		// The minimum number of characters a user must type before a search is performed.
		minLength: 2,

		// set an onFocus event to show the result on input field when result is focused
		// Triggered when focus is moved to an item (not selecting)
		focus: function (event, ui) {
			this.value = ui.item.value.vehicle;
			// Prevent other event from not being execute
			event.preventDefault();
		},
		
	    // per forçar la seleccio d'un item de la llista
	    change: function (event, ui) {
	        if(!ui.item){
	            $(event.target).val("");
			
				$("#codi_personal").val("");
				$("#autocompletarNom").val("");
				$("#autocompletarMatricula").val("");

				$("#afegirNouES").attr("disabled", true);
	        }
	    }, 

		select: function (event, ui) {
			// Prevent value from being put in the input:
			this.value = ui.item.value.vehicle;
			
			// Set the id to the next input hidden field
			//$(this).next("input").val(ui.item.value);
			$("#codi_personal").val(ui.item.value.codi);
			$("#autocompletarNom").val(ui.item.value.nom);
			$("#autocompletarMatricula").val(ui.item.value.matricula);

			$("#afegirNouES").attr("disabled", false);

			// Prevent other event from not being execute            
			event.preventDefault();

		}

	}).css('width','95%')
	  .css('background-color','ivory');





	$( "#autocompletarMatricula" ).autocomplete({
	    source: function (request, response) {
	        $.ajax({
	            url: "/es/autocompletar",
	            type: "GET",
	            //data: request,  // request is the value of search input
	            data: {
	            	term: request.term,
	            	campBusqueda: "matricula"
	            },
	            success: function (dades) {
	              	// Map response values to field label and value
	               	var arr = JSON.parse(dades);	//array de tipus [{...},{...},{...}, ... ]
		               	response($.map(arr, function (el){ 
		               		return {
		               			label: el.matricula + " (" + el.nom + ")",
		               			value: el
		               		};
		               	}));
	               		            }
	        });
		},
		
		// The minimum number of characters a user must type before a search is performed.
		minLength: 2,

		// set an onFocus event to show the result on input field when result is focused
		focus: function (event, ui) {
			this.value = ui.item.value.matricula;
			// Prevent other event from not being execute
			event.preventDefault();
		},
		
	    // per forçar la seleccio d'un item de la llista
	    change: function (event, ui) {
	        if(!ui.item){
	            $(event.target).val("");
			
				$("#codi_personal").val("");
				$("#autocompletarNom").val("");
				$("#autocompletarVehicle").val("");

				$("#afegirNouES").attr("disabled", true);
	        }
	    }, 

		select: function (event, ui) {
			// Prevent value from being put in the input:
			this.value = ui.item.value.matricula;
			
			// Set the id to the next input hidden field
			//$(this).next("input").val(ui.item.value);
			$("#codi_personal").val(ui.item.value.codi);
			$("#autocompletarVehicle").val(ui.item.value.vehicle);
			$("#autocompletarNom").val(ui.item.value.nom);

			$("#afegirNouES").attr("disabled", false);

			// Prevent other event from not being execute            
			event.preventDefault();

		}

	}).css('width','95%')
	  .css('background-color','ivory');








	$( "#formulariAfegirES" ).submit(function( event ) {
		//alert("value de 'codi_personal': " + $("#codi_personal").val());
		//event.preventDefault(); // cancela el submit dels inputs del formulari. No es processen.
	});













});