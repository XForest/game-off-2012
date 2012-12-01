__resources__["/animation.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {

	/**
	 * Module dependencies
	 */

	var FrameAnimation = require('frameanimation').FrameAnimation;
	var EntityType = require('consts').EntityType;
	var imgAndJsonUrl = require('config').IMAGE_URL;
	var dataApi = require('dataApi');
	var app = require('app');
	var aniOrientation = require('consts').Orientation;

	/**
	 * Initialize a new 'Animation' with the given 'opts'
	 * 
	 * @param {Object} opts
	 * @api public
	 */

	var Animation = function(opts) {
		this.kindId = opts.kindId;
		this.type = opts.type;
		this.name = opts.name;
		this.flipx = opts.flipx;
	};

	/**
	 * Create animation, each node owns four basic animations
	 * standAnimation, walkAnimation, diedAnimation and attackAnimation
	 *
	 * @api public
	 */
	Animation.prototype.create = function() {
		var animationData = this.getJsonData();
		var width = animationData.width;
		var height = animationData.height;
		var totalFrames = animationData.totalFrames;
		var img = this.getImage();
		var startFrame = getStartFrame(this.name);
		var _flipx = getFlipx(this.flipx,this.name);
		if (this.kindId===210 && this.name==='RightHurt'){
			_flipx = false;
			console.log(this.kindId + this.name+ ' ' + _flipx + ' ' + startFrame.x + ' star ' + startFrame.y + ' ' + totalFrames);
		}
		var ani = new FrameAnimation({
			flipX: _flipx,
			image : img,
			w : width,
			h : height,
			totalTime : totalFrames * 80,
			interval : 80,
			startFrame:startFrame 
		});
		ani.name = this.name;
		ani.flipx = this.flipx;
		return ani;
	};
  
	var getFlipx = function(flipx,name){
		if (isFix(name,'RightAttack')){
			return true;
		} else {
			return flipx;
		}
	}

	var getStartFrame= function(name){
			if (name==='LeftWalk' || name==='LeftStand') {
					return {x:0,y:6};
			} 
			if (name==='RightWalk' || name ==='RightStand'){
					return {x:0,y:4};
			}
			return {x:0,y:0};

	}

	/**
	 * Get animation's jsonData.
	 *
	 * @api public
	 */
	Animation.prototype.getJsonData= function() {
		var id = this.kindId, type = this.type, name = this.name, data;
		if (type === EntityType.PLAYER || type === EntityType.MOB) {
			data = getDir(id,this.name);	
		} else if (type === EntityType.NPC) {
			data = {
				width: 250,
				height: 100,
				totalFrames:1
			};
		}
		if (data) {
			return data;
		} else {
			console.error('the jsonData :'+id+'/'+name+'.json is not exist!');
		}
	};

	var format = function(name){
		if (name.indexOf('Stand')!=-1 || name.indexOf('Walk')!=-1){
			return 'Stand';
		} else if (name.indexOf('Attack')!=-1){
			return 'Attack';
		} else return 'Die';
	}

	var isFix= function(name,sname){
		return (name.indexOf(sname)!=-1);
	}

	var getDir = function(id,name){
		var	d = dataApi.animation.get(id)[format(name)];
		if (!d){
			console.log(' id = ' +id + ' ' + name);
		  return  { width: 128, height: 1024/8, totalFrames:1 };
		}
		if (id==='1009') {
			console.log('sss');
		}
		var xspan =d.xspan;
		var yspan = d.yspan;
		var data = { width: d.width/xspan, height: d.height/yspan, totalFrames:d.frame };
		if (isFix(name,'Stand')){
				data.totalFrames = 1;
		}
		return data;
		if (name.indexOf('Attack')!=-1){
			  var data = { width: 960/5, height: 576/3, totalFrames:14 };
				return data;
		}
	}

	/**
	 * Get animation's iamge.
	 *
	 * @api public
	 */
	Animation.prototype.getImage = function() {
		var id = this.kindId, type = this.type, name = this.name;
		var aniIamgeUrl;
		if (type === EntityType.PLAYER || type === EntityType.MOB) {
			if (name.indexOf('Stand')!=-1 || name.indexOf('Walk')!=-1) {
				aniIamgeUrl =  imgAndJsonUrl+ 'pic/hero/'+id+'/Stand.png';
			} else if (name.indexOf('Attack')!=-1) {
				aniIamgeUrl = imgAndJsonUrl + 'pic/hero/'+id+'/Attack.png';
			} else if (name.indexOf('Hurt')!=-1) {
				aniIamgeUrl = imgAndJsonUrl + 'pic/hero/'+id+'/Hurt.png';
			} else {
				aniIamgeUrl = imgAndJsonUrl + 'pic/hero/'+id+'/Die.png';
			} 
			
			//aniIamgeUrl = imgAndJsonUrl+'animation/character/'+id+'/'+name+'.png';
		} else if(type === EntityType.NPC) {
			if (name === aniOrientation.LEFT) {
				aniIamgeUrl = imgAndJsonUrl+'npc/'+id+'/stand/frame_0.png';
			} else {
				aniIamgeUrl = imgAndJsonUrl+'npc/'+id+'/stand/frame_15.png';
			}
		}
		var ResMgr = app.getResMgr();
		var img = ResMgr.loadImage(aniIamgeUrl);
		if(img) {
			return img;
		}else {
			console.error('the iamge :'+id+'/'+name+'.PNG is not exist!');
		}
	};

	module.exports = Animation;
}};
