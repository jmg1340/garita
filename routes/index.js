var express = require('express');
var router = express.Router();


var garitaController = require('../controllers/garita_controller');
var sessionController = require('../controllers/session_controller');


/* GET login.ejs. */
router.get('*', function(req, res, next) {
  //console.log("directori: " + process.cwd());
  if (!req.session.user){
  	console.log("USUARI NO IDENTIFICAT");
  	//redirect("/login");
  	res.render('garita/identificacio', { title: 'Identificació', zErrores: [] });
  }else{
  	next();
  }
});

/* AUTOLOAD de comandos con :personalId */
router.param('personalId',	garitaController.loadPersonal); // autoload :personalId
router.param('codi_ES',		garitaController.loadES); // autoload :codi_ES


// Definicion de rutas de session
router.get("/login",	sessionController.new);		// formulario login
router.post("/login",	sessionController.create);	// crear sesion
router.get("/logout",	sessionController.destroy);	// destruir sesion


// Definicion de rutas de /garita
//router.get('/es/nouES',								garitaController.novaEntradaSortida);  // pantalla nova ES
router.get('/es/autocompletar',						garitaController.autocompletar);  // funcionamet widget Autocomplete
router.post('/es/afegir',							garitaController.afegirES);  // introduccio nou registre a taula ES
router.get('/es/:data?',							garitaController.entradesSortides);  // pantalla Entrades / Sortides
router.delete('/es/:codi_ES(\\d+)/eliminar',		garitaController.eliminarES); // eliminacio registre taula Personal


router.get('/personal', 							garitaController.personal);  // pantalla personal
router.get('/personal/nouPersonal',					garitaController.nouPersonal); // formulari nou registre Personal
router.post('/personal/afegirPersonal',				garitaController.afegirPersonal); // introduccio nou registre taula Personal
router.get('/personal/:personalId(\\d+)/edicio',	garitaController.edicioPersonal); // formulari edicio Personal
router.put('/personal/:personalId(\\d+)/modificar',		garitaController.modificarPersonal); // modificar registre taula Personal
router.delete('/personal/:personalId(\\d+)/eliminar',	garitaController.eliminarPersonal); // eliminacio registre taula Personal

router.get('/consultes', 							garitaController.consultes);  // pantalla consultes




/* GET personal.ejs. *
router.get('/PERSONAL', function(req, res, next) {
  res.render('personal.ejs', { title: 'Personal' });
});

/* GET consultes.ejs. *
router.get('/CONSULTES', function(req, res, next) {
  res.render('consultes.ejs', { title: 'Consultes' });
});

*/
module.exports = router;
