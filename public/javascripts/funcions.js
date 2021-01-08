
//$(document).ready(function() {

//funcions = {
	dataDDMMYYYY = function (data) {
		var mes = (data.getMonth()+1 < 10) ? "0" + (data.getMonth()+1) : (data.getMonth()+1) ;
		var dia =  (data.getDate() < 10) ? "0" + (data.getDate()) : (data.getDate());
		return  dia + "/" + mes + "/" + data.getFullYear(); 
	}  
//}


	//alert(dataDDMMYYY(new Date()));
//});