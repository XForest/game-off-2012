var mysql = require('./mysql/mysql');
var userDao = module.exports;
var async = require('async');
var dataApi = require('./../../../game-server/app/util/dataApi');
var utils = require('./../../../game-server/app/util/utils');
var consts = require('./../../../game-server/app/consts/consts');
var logger = console;
/**
 * Get userInfo by username
 * @param {String} username
 * @param {function} cb
 */
userDao.getUserByName = function (username, cb){
  var sql = 'select * from  User where name = ?';
  var args = [username];
  mysql.query(sql,args,function(err, res){
    if(err !== null){
      cb(err.message, null);
    } else {
      if (!!res && res.length === 1) {
        var rs = res[0];
        var user = {id: rs.id, name: rs.name, password: rs.password, from: rs.from};
        cb(null, user);
      } else {
        cb(' user not exist ', null);
      }
    }
  });
};


var roleIds = [1001,1002,1005,1006,1014,1011];
/**
 * Create a new user
 * @param (String) username
 * @param {String} password
 * @param {String} from Register source
 * @param {function} cb Call back function.
 */
userDao.createUser = function (username, password, from, cb){
  var sql = 'insert into User (name,password,`from`,loginCount,lastLoginTime) values(?,?,?,?,?)';
	var self = this;
  var uid = 0,name = username,roleId = roleIds[Math.round(Math.random()*5)];
  var args = [username, password, from || '', 1, Date.now()];
  mysql.insert(sql, args, function(err,res){
    if(err !== null){
      cb({code: err.number, msg: err.message}, null);
    } else {
      var userId = res.insertId;
      var user = {id: res.insertId, name: username};
      var uid = userId;
			self.createPlayer(uid, name, roleId, function(err, player){
				if(err) {
					logger.error('[register] fail to invoke createPlayer for ' + err.stack);
					next(null, {code: consts.MESSAGE.ERR, error:err});
					return;
				}else{
					async.parallel([
					function(callback) {
						self.createEquipments(player.id, callback);
					},
					function(callback) {
						self.createBag(player.id, callback);
					},
					function(callback) {
						self.addSkill(1, callback);
					}],
					function(err, results) {
						if (err) {
							logger.error('learn skill error with player: ' + JSON.stringify(player.strip()) + ' stack: ' + err.stack);
							next(null, {code: consts.MESSAGE.ERR, error:err});
							return;
						}
						console.log('%%%j',user);
					 cb(null, user);
					//res.send({code: 200, token: Token.create(user.id, Date.now(), secret), uid: user.id});
					});
				}
			});
     //cb(null, user);
    }
  });
};


userDao.addSkill = function(playerId, cb) {
	var sql = 'insert into FightSkill (playerId, skillId, level, type ) values (?, ?, ?, ?)';
	var args = [playerId, 1, 1, 'attack'];

	mysql.insert(sql, args, function(err, res) {
		if (err) {
			logger.error(err.message);
			utils.invokeCallback(cb, err);
		} else {
			var id = res.insertId;
			utils.invokeCallback(cb, null, id);
		}
	});
};

userDao.createBag = function(playerId, cb) {
	var sql = 'insert into Bag (playerId, items, itemCount) values (?, ?, ?)';
	var args = [playerId, '{}', 20];
	
	mysql.insert(sql, args, function(err, res) {
		if (err) {
			logger.error('create bag for bagDao failed! ' + err.stack);
			utils.invokeCallback(cb, err, null);
		} else {
			var bag = {id: res.insertId};
			utils.invokeCallback(cb, null, bag);
		}
	});
	
};

userDao.createEquipments = function (playerId, cb) {
	var sql = 'insert into Equipments (playerId) values (?)';
	var args = [playerId];

	mysql.insert(sql, args, function(err, res) {
		if (err) {
			logger.error('create equipments for equipmentDao failed! ' + err.stack);
			utils.invokeCallback(cb, err, null);
		} else {
			var equip = { id: res.insertId };
			utils.invokeCallback(cb, null, equip);
		}
	});
};

userDao.createPlayer = function (uid, name, roleId,cb){
	var sql = 'insert into Player (userId, kindId, kindName, name, country, rank, level, experience, attackValue, defenceValue, hitRate, dodgeRate, walkSpeed, attackSpeed, hp, mp, maxHp, maxMp, areaId, x, y, skillPoint) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
	var role = dataApi.role.findById(roleId);
	var character = dataApi.character.findById(roleId);
	var born = consts.BornPlace;
	var x = born.x + Math.floor(Math.random()*born.width);
	var y = born.y + Math.floor(Math.random()*born.height);
	var areaId = consts.PLAYER.initAreaId;
	role.country = 1;
	var args = [uid, roleId, role.name, name, role.country, 1, 1, 0, character.attackValue, character.defenceValue, character.hitRate, character.dodgeRate, character.walkSpeed, character.attackSpeed, character.hp, character.mp, character.hp, character.mp, areaId, x, y, 1];
	mysql.insert(sql, args, function(err,res){
		if(err !== null){
			logger.error('create player failed! ' + err.message);
			logger.error(err);
			utils.invokeCallback(cb,err.message, null);
		} else {
		   var player = {};
			 player.id = res.insertId;
			utils.invokeCallback(cb,null,player);
		}
	});
};
