__resources__["/clientManager.js"] = {
	meta: {
		mimetype: "application/javascript"
	},
	data: function(exports, require, module, __filename, __dirname) {
		//var clientManager = require('Manager');

		var pomelo = window.pomelo;
		var app = require('app');
		var EntityType = require('consts').EntityType;
		var Message = require('consts').MESSAGE;
		var loginMsgHandler = require('loginMsgHandler');
		var gameMsgHandler = require('gameMsgHandler');
    var switchManager = require('switchManager');
    var clientManager = require('clientManager');
    var dataApi = require('dataApi');
    var ResourceLoader = require('resourceLoader');
		var utils = require('utils');
    var config = require('config');

    var alert = window.alert;
		var self = this;
		
		var loading = false;
    var httpHost = location.href.replace(location.hash, '');

		pomelo.on('websocket-error', function(){
			lodading = false;
       var $percent = $('#id_loadPercent').html('disconnect 0');
		});

		function init() {
     var $percent = $('#id_loadPercent').html(0);
     var $bar = $('#id_loadRate').css('width', 0);
		 $bar.css('width', '0%');
     login(); 
		};

    /**
     * login
     */
    function login() {
      if (loading) {
        return;
      }
      loading = true;
			var username = "sss",pwd='123';
      $.post(httpHost + 'login', {username: username, password: pwd}, function(data) {
        authEntry(data.uid, data.token, function() {
          loading = false;
        });
        localStorage.setItem('username', username);
      });
    }

    function queryEntry(uid, callback) {
      pomelo.init({host: config.GATE_HOST, port: config.GATE_PORT, log: true}, function() {
        pomelo.request('gate.gateHandler.queryEntry', { uid: uid}, function(data) {
          pomelo.disconnect();

          if(data.code === 2001) {
            alert('Servers error!');
            return;
          }

          callback(data.host, data.port);
        });
      });
    }

    /**
     * enter game server
     * route: connector.entryHandler.entry
     * response：
     * {
     *   code: [Number], 
     *   player: [Object]
     * }
     */
    function entry(host, port, token, callback) {
      //初始化socketClient
      //TODO for development
      if(host === '127.0.0.1') {
        host = config.GATE_HOST;
      }
      pomelo.init({host: host, port: port, log: true}, function() {
        pomelo.request('connector.entryHandler.entry', { token: token}, function(data) {
          var player = data.player;
          if (callback) {
            callback(data.code);
          }

          if (data.code == 1001) {
            alert('Login fail!');
            return;
          } else if (data.code == 1003) {
            alert('Username not exists!');
            return;
          }

          if (data.code != 200) {
            alert('Login Fail!');
            return;
          }

          // init handler
          loginMsgHandler.init();
          gameMsgHandler.init();
          afterLogin(data);
        });
      });
    }

    function authEntry(uid, token, callback) {
      queryEntry(uid, function(host, port) {
        entry(host, port, token, callback);
      });
    }

    pomelo.authEntry = authEntry;

    function afterLogin(data) {
      //var areaId = playerData.areaId;
      var areas = {1: {map: {id: 'jiangnanyewai.png', width: 3200, height: 2400}, id: 1}};
			pomelo.uid = data.player.id;
      pomelo.playerId = pomelo.uid;// playerData.id;
      pomelo.areaId = 1;//areaId;
      loadResource({jsonLoad: true}, function() {
        gamePrelude();
      });
    }

    function gamePrelude() {
      switchManager.selectView("gamePrelude");
      var entered = false;
        if (!entered) {
          entered = true;
          enterScene();
        }
    }


    function loadResource(opt, callback) {
      switchManager.selectView("loadingPanel");
      var loader = new ResourceLoader(opt);
      var $percent = $('#id_loadPercent').html(0);
      var $bar = $('#id_loadRate').css('width', 0);
      loader.on('loading', function(data) {
        var n = parseInt(data.loaded * 100 / data.total, 10);
				if (n>=100)
					n=100;
        $bar.css('width', n + '%');
        $percent.html(n);
      });
      loader.on('complete', function() {
        if (callback) {
          setTimeout(function(){
            callback();
          }, 500);
        }
      });

      loader.loadAreaResource();
    }

    function enterScene(){
      pomelo.request("area.playerHandler.enterScene",{ uid:pomelo.uid, playerId: pomelo.playerId, areaId: pomelo.areaId},function(data){
        app.init(data.data);
      });
    }

    // checkout the moveAimation
    function move(args) {
      var path = [{x: args.startX, y: args.startY}, {x: args.endX, y: args.endY}];
      var map = app.getCurArea().map;
      var paths = map.findPath(args.startX, args.startY, args.endX, args.endY);
      if(!paths || !paths.path){
        return;
      }
      var curPlayer = app.getCurArea().getCurPlayer();	

      var area = app.getCurArea();
      var sprite = curPlayer.getSprite();
			var totalDistance = utils.totalDistance(paths.path);
			var needTime = Math.floor(totalDistance / sprite.getSpeed() * 1000 + app.getDelayTime());
			var speed = totalDistance/needTime * 1000;
      //sprite.movePath(paths.path, speed);
      pomelo.request('area.playerHandler.move',{ path: paths.path}, function(result) {
				console.log('move%j',result);
        if(result.code === Message.ERR){
          console.warn('curPlayer move error!');
					sprite.translateTo(paths.path[0].x, paths.path[0].y);
        }
      });
      sprite.movePath(paths.path);
    }

    function launchAi(args) {
      var areaId = pomelo.areaId;
      var playerId = pomelo.playerId;
      var targetId = args.id;
      if (pomelo.player.entityId === targetId) {
        return;
      }
      var skillId = pomelo.player.curSkill;
      var area = app.getCurArea();
      var entity = area.getEntity(targetId);
      if (entity.type === EntityType.PLAYER || entity.type === EntityType.MOB) {
        if (entity.died) {
          return;
        }
        pomelo.notify('area.fightHandler.attack',{areaId :areaId, playerId: playerId, targetId: targetId, skillId: skillId });
      } else if (entity.type === EntityType.NPC) {
        pomelo.notify('area.playerHandler.npcTalk',{areaId :areaId, playerId: playerId, targetId: targetId});
      } else if (entity.type === EntityType.ITEM || entity.type === EntityType.EQUIPMENT) {
				var curPlayer = app.getCurPlayer();
				var bag = curPlayer.bag;
				if (bag.isFull()) {
					curPlayer.getSprite().hintOfBag();	
					return;
				}
        pomelo.notify('area.playerHandler.pickItem',{areaId :areaId, playerId: playerId, targetId: targetId});
      }
    }

    /**
     * amend the path of addressing
     * @param {Object} path   the path of addressing
     * @return {Object} path the path modified
     */
    function pathAmend(path) {
      var pathLength = path.length;
      for (var i = 0; i < pathLength-2; i ++) {
        var curPoint = path[i];
        var nextPoint = path[i+1];
        var nextNextponit = path[i+2];
        if (curPoint.x === nextPoint.x) {
          if (nextNextponit.x > nextPoint.x) {
            nextPoint.x += 1;
          } else {
            nextPoint.x -= 1;
          }
          path[i+1] = nextPoint;
        }
        if (curPoint.y === nextPoint.y) {
          if (nextNextponit.y > nextPoint.y) {
            nextPoint.y += 1;
          }else {
            nextPoint.y -= 1;
          }
          path[i+1] = nextPoint;
        }
      }
      return path;
    }


    //暴露的接口和对象
    exports.init = init;
    exports.entry = entry;
    //exports.register = register;
    exports.enterScene = enterScene;
    exports.move = move;
    exports.loadResource = loadResource;
    exports.launchAi = launchAi;

  }
};


