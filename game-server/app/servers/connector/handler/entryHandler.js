var Code = require('../../../../../shared/code');
var userDao = require('../../../dao/userDao');
var async = require('async');
var channelUtil = require('../../../util/channelUtil');

module.exports = function(app) {
	return new Handler(app);
};

var Handler = function(app) {
	this.app = app;
};

var pro = Handler.prototype;

/**
 * New client entry game server. Check token and bind user info into session.
 * 
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next stemp callback
 * @return {Void}
 */
pro.entry = function(msg, session, next) {
	var token = msg.token, self = this;

	if(!token) {
		next(new Error('invalid entry request: empty token'), {code: Code.FAIL});
		return;
	}

	var uid, player;
	async.waterfall([
		function(cb) {
			// auth token
			self.app.rpc.auth.authRemote.auth(session, token, cb);
		}, function(code, user, cb) {
			// query player info by user id
			if(code !== Code.OK) {
				next(null, {code: code});
				return;
			}

			if(!user) {
				next(null, {code: Code.ENTRY.FA_USER_NOT_EXIST});
				return;
			}
			uid = user.uid;
			// generate session and register chat status
			self.app.get('sessionService').kick(uid, cb);
			session.bind(uid, cb);
			player = { areaId:1, name:'test', id:uid,userId:uid};
			session.set('areaId', player.areaId);
			session.set('playername', player.name);
			session.set('playerId', player.id);
			session.on('closed', onUserLeave.bind(null, self.app));
			session.pushAll(cb);
		}, function(cb) {
			self.app.rpc.chat.chatRemote.add(session, player.userId, player.name, 
				channelUtil.getGlobalChannelName(), cb);
		}
	], function(err) {
		if(err) {
			next(err, {code: Code.FAIL});
			return;
		}
		next(null, {code: Code.OK, player:  player});
	});
};

var onUserLeave = function (app, session, reason) {
	if(!session || !session.uid) {
		return;
	}

	app.rpc.area.playerRemote.playerLeave(session, {playerId: session.get('playerId'), areaId: session.get('areaId')}, null);
	app.rpc.chat.chatRemote.kick(session, session.uid, null);
};
