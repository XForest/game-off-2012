__resources__["/main.js"] = {
	meta: {
		mimetype: "application/javascript"
	}, 

	data: function(exports, require, module, __filename, __dirname){
		
		var clientManager = require('clientManager');

		function main() {
			clientManager.init();
			setDefaultUser();
		}

		function setDefaultUser() {
			if (localStorage) {
				var dusr = localStorage.getItem("username");
				if(dusr){
				  window.name = dusr;	
				}
			}
		}

		exports.main = main;
	}
};
