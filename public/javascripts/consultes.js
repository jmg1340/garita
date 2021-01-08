$(document).ready(function() {



	$( "#autocompletarNom2" ).autocomplete({
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

				$("#novaConsulta").attr("disabled", true);
	        }
	    }, 

		select: function (event, ui) {
			// Prevent value from being put in the input:
			this.value = ui.item.label;
			
			// Set the id to the next input hidden field
			//$(this).next("input").val(ui.item.value);
			$("#codi_personal").val(ui.item.value.codi);

			$("#novaConsulta").attr("disabled", false);

			// Prevent other event from not being execute            
			event.preventDefault();

		}

	}).css('width','95%')
	  .css('background-color','ivory');







    $( "#seleccioData1" ).datepicker({
            dateFormat: "dd-mm-yy",
            constrainInput: true,
            changeMonth: false,
            changeYear: false,
            firstDay: 1,    //Sunday is 0, Monday is 1, etc.
            dayNames: [ "Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte" ],
            dayNamesMin: [ "Dg", "Dll", "Dm", "Dcr", "Dj", "Dv", "Ds" ],
            monthNames: [ "Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre" ],
            monthNamesShort: ['Gen','Feb','Mar','Abr','Mai','Jun','Jul','Ago','Set','Oct','Nov','Des'],
        }).css('width','75px')
    	  .css('text-align','center')
    	  .css('margin-bottom','5px');




    $( "#seleccioData2" ).datepicker({
            dateFormat: "dd-mm-yy",
            constrainInput: true,
            changeMonth: false,
            changeYear: false,
            firstDay: 1,    //Sunday is 0, Monday is 1, etc.
            dayNames: [ "Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte" ],
            dayNamesMin: [ "Dg", "Dll", "Dm", "Dcr", "Dj", "Dv", "Ds" ],
            monthNames: [ "Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre" ],
            monthNamesShort: ['Gen','Feb','Mar','Abr','Mai','Jun','Jul','Ago','Set','Oct','Nov','Des'],
        }).css('width','75px')
    	  .css('text-align','center')
    	  .css('margin-bottom','5px');












/*
	//CATEGORIES
	var vCategories = 
	[
		{valor: "", text: ""},
		{valor: "CEPRA", text: "CEPRA"},
		{valor: "Operaris CEPRA", text: "Operaris CEPRA"},
		{valor: "Industrial", text: "Industrial"},
		{valor: "ISS", text: "ISS"},
		{valor: "Espais Verds", text: "Espais Verds"},
		{valor: "Prosegur", text: "Prosegur"}	
	];


	// omple les opcions de la persiana CATEGORIA del desplegable   
	for (var i=0; i < vCategories.length; i++) {
		$('#idCategoria')
			.append($("<option></option>")
			.attr("value",vCategories[i].valor)
			.text(vCategories[i].text));

		$("#idCategoria option[value='']").attr("selected","selected");     // per defecte esta seleccionat el la opcio amb valor ""
	} 
*/





	// E/S
	var vOpcions = 
	[
		{valor: "", text: ""},
		{valor: "E", text: "E"},
		{valor: "S", text: "S"}	
	];


	// omple les opcions de la persiana E/S del desplegable   
	for (var i=0; i < vOpcions.length; i++) {
		$('#idES')
			.append($("<option></option>")
			.attr("value",vOpcions[i].valor)
			.text(vOpcions[i].text));

		//$("#idES option[value='']").attr("selected","selected");     // per defecte esta seleccionat el la opcio amb valor ""

		// si el valor guardat es = al de la opcio creada, posar-la com seleccionada
		if ($('#idES2').val() === vOpcions[i].valor){
			$("#idES option[value='" + vOpcions[i].valor +"']").attr("selected","selected");
		}

	} 












	$( "#formulariConsultes" ).submit(function( event ) {
		//alert("value de 'codi_personal': " + $("#codi_personal").val());
		
		
		// Per fer la segona validacio (data1 no pot ser > que data2)
		var data1 = $("#seleccioData1").val();	//.replace( /(\d{2})-(\d{2})-(\d{4})/, "$1/$2/$3");  //canvia dd-mm-aaaa per dd/mm/aaaa
		var data2 = $("#seleccioData2").val();	//.replace( /(\d{2})-(\d{2})-(\d{4})/, "$1/$2/$3");  //canvia dd-mm-aaaa per dd/mm/aaaa

		data1 = new Date(data1);
		data2 = new Date(data2);

		

		// validacions
		if ($("#autocompletarNom2").val().length == 0 ||
			$("#seleccioData1").val().length == 0 ||
			$("#seleccioData2").val().length == 0){

			alert("Obligatori omplir NOM i DATES");

			event.preventDefault(); // cancela el submit dels inputs del formulari. No es processen.
		}else if(data1 > data2){
			alert("La primera data no pot ser superior a la segona");
			event.preventDefault(); // cancela el submit dels inputs del formulari. No es processen.
		}


	});













});