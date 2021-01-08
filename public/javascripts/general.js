$(document).ready(function() {
  	
    
    //$("#menu").menu();
    

    //$("input[type=submit], a, button").menu();




  	//********** formularis emrergents *********
    /***
    var dialegPersonal;
    dialegPersonal = $("#finestraEmergentPersonal").dialog({ //<!--  ------> muestra la ventana  -->
        display: "none",
        autoOpen: false,
        width: 250,  //<!-- -------------> ancho de la ventana -->
        show: "scale", //<!-- -----------> animación de la ventana al aparecer -->
        hide: "scale", //<!-- -----------> animación al cerrar la ventana -->
        resizable: false, //<!-- ------> fija o redimensionable si ponemos este valor a "true" -->
        modal: true//<!-- ------------> si esta en true bloquea el contenido de la web mientras la ventana esta activa (muy elegante) -->
        
    });  	
    ***/



    /***

    $('#emergentAfegirPersonal').bind("click", function() { 
        
        // $("#idCodi").prop("value", "");
        // $("#idNom").prop("value", "");
        // $("#idVehicle").prop("value", "");
        // $("#idMatricula").prop("value", "");
        
        $("#fomulariPersonal").prop("action", "/personal/nouPersonal");
        $("#btEnviarPersonal").prop("value", "Afegir");
        
        dialegPersonal.dialog({title: "Nou registre"});        
        dialegPersonal.dialog("open");
    });


    $('.emergentEditarPersonal').bind("click", function() { 
        $("#idCodi").prop("value", $(this).closest("tr").attr("id"));
        $("#idNom").prop("value", $(this).parent().parent().children().eq(0).html());
        $("#idVehicle").prop("value", $(this).parent().parent().children().eq(1).html());
        $("#idMatricula").prop("value", $(this).parent().parent().children().eq(2).html());

        $("#fomulariPersonal").prop("action", "/personal/editar");
        $("#btEnviarPersonal").prop("value", "Guardar");
        
        dialegPersonal.dialog({title: "Editar registre"});
        dialegPersonal.dialog("open");
    });

    ***/

 

});

