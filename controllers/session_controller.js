// GET login  -  fomrulario de login
exports.new = function (req, res){
	var errors = req.session.errors || [];
	req.session.errors = [];

	console.log("*** S'HA REDIRECCIONAT AL FORMULARI LOGIN ****");
	res.render('garita/identificacio', {zErrores: errors});
	//res.redirect('/algo');
};



// POST login  -  crea la session
exports.create = function(req, res){
	var usuari 		= req.body.usuari;
	var password	= req.body.password;


	var userController = require('./user_controller');
	userController.autenticar(usuari, password, function(error, user){
		
		if (error){		// si hay error retornamos mensajes de error de session
			req.session.errors = [{"message": "Se ha producido el siguiente error: " + error}];
			res.render("garita/identificacio", {title: "Identificació", zErrores: req.session.errors });
			return;
		}

		// Crear req.session.user y guardar campos id i username
		// La sesion se define por la existencia de REQ.SESSION.USER
		req.session.user = {id: user.id, username: user.username};

		


		res.redirect('/es/'); 		// redireccina a la pagina de Entrades / Sortides

	});
};


// DELETE /logout 	-	Destruir la sesion
exports.destroy = function(req, res){
	delete req.session.user;
	res.render("garita/identificacio", {title: "Identificació", zErrores: [] });		//redirecciona al formulari de login
};