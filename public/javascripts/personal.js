$(document).ready(function() {


	$("#nouPersonal").bind("click", function(){
		window.location.href = "/personal/nouPersonal";
	})






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

		// si el valor guardat es = al de la opcio creada, posar-la com seleccionada
		if ($('#idCategoria2').val() === vCategories[i].valor){
			$("#idCategoria option[value='" + vCategories[i].valor +"']").attr("selected","selected");
		}
	} 




/*
	for (var i=0; i<vCategoria.length; i++) {
	    $('#idCategoria').append($('<option>', { 
	        value: vCategoria.valor,
	        text : vCategoria.text 
	    }));
	}
*/





/*

	$( "#idCategoria" ).autocomplete({
	    source: vCategoria,
		
		// The minimum number of characters a user must type before a search is performed.
		minLength: 1,

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
	        }
	    }, 

		select: function (event, ui) {
			// Prevent value from being put in the input:
			this.value = ui.item.label;

			// Prevent other event from not being execute            
			event.preventDefault();

		}

	}).css('width','100%')
	  .css('background-color','ivory');


*/



});