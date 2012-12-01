__resources__["/main.js"] = {
meta: {
mimetype: "application/javascript"
			},
data: function(exports, require, module, __filename, __dirname){
				var clientManager = require('clientManager');
				var config = require('config');
				var pomelo = window.pomelo;

				function main(){
					clientManager.init();
				}
				//主动调用main函数
				//        main();
				exports.main = main;
			}
};
