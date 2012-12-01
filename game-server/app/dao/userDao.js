var logger = require('pomelo-logger').getLogger(__filename);
var pomelo = require('pomelo');
var dataApi = require('../util/dataApi');
var Player = require('../domain/entity/player');
var User = require('../domain/user');
var consts = require('../consts/consts');
var utils = require('../util/utils');
var consts = require('../consts/consts');
var Bag = require('../domain/bag');
var Equipments = require('../domain/equipments');
var userDao = module.exports;

/**
 * Get an user's all players by userId
 * @param {Number} uid User Id.
 * @param {function} cb Callback function.
 */
userDao.getPlayersByUid = function(uid, cb){
	utils.invokeCallback(cb,null,userMap[playerId]);
};

/**
 * Get an user's all players by userId
 * @param {Number} playerId
 * @param {function} cb Callback function.
 */
userDao.getPlayer = function(playerId, cb){
	utils.invokeCallback(cb,null,userMap[playerId]);
};

/**
 * Get all the information of a player, include equipments, bag, skills, tasks.
 * @param {String} playerId
 * @param {function} cb
 */
userDao.getPlayerAllInfo = function (playerId, cb) {
	this.createPlayer(playerId,cb);
};

var roles = [1001,1002,1006,1014,1011,1005];

var userMap = {};

/**
 * Create a new player
 * @param {String} uid User id.
 * @param {String} name Player's name in the game.
 * @param {Number} roleId Player's roleId, decide which kind of player to create.
 * @param {function} cb Callback function
 */
userDao.createPlayer = function (uid,cb){
	if (!!userMap[uid]){
		utils.invokeCallback(cb,null,userMap[uid]);
		return;
	}
	var roleId = roles[Math.round(Math.random()*5)]; 
	var role = dataApi.role.findById(roleId);
	var character = dataApi.character.findById(roleId);
	var born = consts.BornPlace;
	var x = born.x + Math.floor(Math.random()*born.width);
	var y = born.y + Math.floor(Math.random()*born.height);
	var areaId = consts.PLAYER.initAreaId;
	role.country = 1;
	var player = new Player({
				id: uid,
				userId: uid,
				kindId: roleId,
				kindName: role.name,
				name:character.englishName,
				areaId: 1,
				roleName: role.name,
				level: 1,
				experience: 0,
				attackValue: character.attackValue,
				defenceValue: character.defenceValue,
				skillPoint: 1,
				hitRate: character.hitRate,
				dodgeRate: character.dodgeRate,
				walkSpeed: character.walkSpeed,
				attackSpeed: character.attackSpeed,
				hp:character.hp,
				maxHp:character.hp,
				mp:character.mp,
				maxMp:character.mp,
				equipments: {},
				bag:new Bag({id:uid,items:{},itemCount:20}) 
	});
	player.equipments = new Equipments({playerId:uid});
	player.curTasks = [];
	player.learnSkill(1,null);
	userMap[uid] = player;
	utils.invokeCallback(cb,null,player);
};

