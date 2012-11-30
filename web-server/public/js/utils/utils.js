
__resources__["/utils.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {

  var aniOrientation = require('consts').Orientation;
  
  module.exports.distance = function(sx, sy, ex, ey) {
    var dx = ex - sx;
    var dy = ey - sy;

    return Math.sqrt(dx * dx + dy * dy);
  };

	module.exports.totalDistance = function(path) {
    if(!path || path.length < 2) {
      return 0;
    }

    var distance = 0;
    for(var i=0, l=path.length-1; i<l; i++) {
      distance += this.distance(path[i].x, path[i].y, path[i + 1].x, path[i + 1].y);
    }

    return distance;
	};

	/**
   * amend the path of addressing
   * @param {Object} path   the path of addressing
   * @return {Object} path the path modified
   */
	module.exports.pathAmend = function(sprite, path) {
		var position = sprite.getPosition();
		path[0] = {
			x: position.x,
			y: position.y
		};
		if (path.length > 2) {
			path.splice(1, 1);
		}
		return path;
	};

	module.exports.getPoolName = function(kindId, name, flipx) {
		return kindId + '_' + name + '_' + flipx;
	};

  module.exports.invokeCallback = function(cb) {
    if(cb && typeof cb === 'function') {
      cb.apply(null, Array.prototype.slice.call(arguments, 1));
    }
  };

  /**
  * calculate the direction
  * if move, x1, y1 are the startPosition, x2, y2 are the endPosotion
  * else, x1, y1 are the curNode position, x2, y2 are the target position
  */
  module.exports.calculateDirection = function(x1, y1, x2, y2) {
    var distX = x2 - x1;
    var distY = y2 - y1;
		var result = {
			orientation : 0,
			flipX:false
		}
		//if (distX==0 && distY>0) {
			//result.orientation = 0;
		//} 
		//if (distX==0 && distY<0) {
			//result.orientation = 3;
	//}
		//if (distY==0 && distX>0) {
		//	result.orientation = 2;
		//}
		//if (distY==0 && distX<0){
			//result.orientation = 1;
	//}
	//	if (distY>0 && distX> 0){
		//	result.orientation = 5;
		//}
		//if (distX>0 && distY<0) {
			//result.orientation = 6;
		//}
		//if (distX<0 && distY > 0) {
			//result.orientation = 4;
		//}
		//if (distX<0 && distY< 0 ){
			//result.orientation = 7;
		//}
		//return result;
    if (distX >= 0 && distY < 0) {//quadrant 1
      return {
        orientation:  aniOrientation.LEFT,
        flipX: false
      };
    } else if (distX < 0 && distY < 0) {//quadrant 2
      return {
        orientation:  aniOrientation.LEFT,
        flipX: true
      };
    } else if (distX <0 && distY >= 0) {//quadrant 3
      return {
        orientation:  aniOrientation.RIGHT,
        flipX: false
      };
    } else {//quadrant 4
      return {
        orientation:  aniOrientation.RIGHT,
        flipX: true
      };
    }
  };
}};
