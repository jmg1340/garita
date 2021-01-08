var users =
	{
		admin: {id: 1, username: "administrador", password: "admin"},
		garita: {id: 1, username: "Garita", password: "1111"},
		jordi: {id: 2, username: "jordi" , password: "jmg"}
	};

exports.autenticar = function(usuari, password, callback){
	if(users[usuari]){
		if(password === users[usuari].password){
			callback(null, users[usuari]);
		}else{
			callback(new Error('password erroni'));
		}
	}else{
		callback(new Error('usuari no existeix'));
	}

}