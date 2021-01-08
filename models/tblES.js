
var opcions = 
{
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,

  // don't delete database entries but set the newly added attribute deletedAt
  // to the current date (when deletion was done). paranoid will only work if
  // timestamps are enabled
  paranoid: false,

  // don't use camelcase for automatically added attributes but underscore style
  // so updatedAt will be updated_at
  underscored: true,

  // disable the modification of tablenames; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true,

  // define the table's name
  //tableName: 'my_very_custom_table_name'	
}





module.exports = function(sequelize,DataTypes){
	return sequelize.define(
		'ES',
		{
			codiES:
			{
				type: 	DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				validate:
				{
					notEmpty: 
					{
						msg: "-> Falta codiES"
					}
				}
			},
			
			data:
			{
				type: 	DataTypes.DATE,
				validate:
				{
					notEmpty: 
					{
						msg: "-> Falta data"
					}
				}
			},
			
			hora:
			{
				type: 	DataTypes.TIME,
				validate:
				{
					notEmpty: 
					{
						msg: "-> Falta hora"
					},
					is: 
					{
						args: /^([01]?\d|2[0-3]):[0-5]\d$/, 		// que el format sigui: hores - de 0 a 23 i minuts de 0 a 59
						msg: "-> Hora incorrecte"
					}

				}
			},
			
			ES:
			{
				type: 	DataTypes.STRING,
				validate:
				{
					notEmpty: 
					{
						msg: "-> Falta (E)ntrada o (S)ortida"
					},
					is: 
					{
						args: /^[E|S|e|s]$/, 		// que les entrades nomes siguin "E" o "S" (majuscules / minuscules)
						msg: "-> E/S nomes pot ser una E o una S"
					}
				},
				set: function(val) {
			      this.setDataValue('ES', val.toUpperCase());
			    }
			},
			
			idPersonal:
			{
				type: 	DataTypes.STRING,
				validate:
				{
					notEmpty: 
					{
						msg: "-> Falta seleccionar Nom / Vehicle / Matricula"
					}
				}
			}
		},
		opcions
	);
}