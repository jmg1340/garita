
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
		'personal',
		{
			codi:
			{
				type: 	DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,	 // Automatically gets converted to SERIAL for postgres
				validate:
				{
					notEmpty: 
					{
						msg: "-> Falta Codi"
					}
				}
			},
			
			nom:
			{
				type: 	DataTypes.STRING,
				validate:
				{
					notEmpty: 
					{
						msg: "-> Falta Nom"
					}
				}
			},
			
			vehicle:
			{
				type: 	DataTypes.STRING,
			},
			
			matricula:
			{
				type: 	DataTypes.STRING,
			},
			
			nif:
			{
				type: 	DataTypes.STRING,
			},
			
			empresa:
			{
				type: 	DataTypes.STRING,
			},
			
			categoria:
			{
				type: 	DataTypes.STRING,
			}
		},
		opcions
	);
}