
var path = require("path");

// Cargar modelo ORM (Object Relational Mapping)
var Sequelize = require("sequelize");

var sequelize = new Sequelize('garitadb', 'jordi', 'jordi', {
  host: 'localhost',
  dialect: 'postgres',
  
  options:{
  	port: 5432,
  },

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
}); 




//Importar la definicio de la taula PERSONAL de tblPersonal.js
var TblPersonal = sequelize.import(path.join(__dirname, "tblPersonal"));

//Importar la definicio de la taula ES de tblES.js
var TblES = sequelize.import(path.join(__dirname, "tblES"));



/** RELACIONS ENTRE TAULES **/

// Un registre de TblES pertenece a un registre de la TblPersonal
// Al establir {foreignKey: 'idPersonal'} automaticament crea el camp idPersonal a la taula tblES
// que relaciona amb el camp clau de la taula TblPersonal
TblES.belongsTo(TblPersonal,  {foreignKey: 'idPersonal', onDelete: "CASCADE", constraints: true}); 

// Un registre de la taula TblPersonal puede tener muchos registres de TblES
TblPersonal.hasMany(TblES, { foreignKey: 'idPersonal', onDelete: "CASCADE", constraints: true} ); 



exports.TblPersonal = TblPersonal; // exporta la definicio de la taula tblPersonal
exports.TblES = TblES; // exporta la definicio de la taula tblPersonal



//will, based on your model definitions, create any missing tables.

sequelize.sync().then(function(){
  TblPersonal.count().then(function(countRegTblPersonal){
    console.log("registres de TblPersonal: " + countRegTblPersonal);
  });
  TblES.count().then(function(countRegTblES){
    console.log("registres de TblES: " + countRegTblES);
  });
  console.log("conexio a 'garitadb' (Postgres) establerta !!");
})


