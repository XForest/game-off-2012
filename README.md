##XForest -  a browser-based MMORPG

XForest is a browser-based MMORPG(massively multiplayer online role-playing game). 
The backend is written in node.js based on [pomelo](https://github.com/NetEase/pomelo/wiki/Introduction-to-pomelo),
which is a fast, scalable, distributed game server framework for node.js. The frontend uses the HTML5 Canvas to draw 
the map and renders the animations by colorbox, which is a client side game engine written in JavaScript based on HTML5.
In this game, the client communicates via websockets with the server. 

## Online demo

 * Visit [XForest](http://www.appme.net) online


## Concepts 

First.  game <b>clone</b> a hero that will <b>clone</b> hp, mp, attack and defense etc from the hero ontology.<br/>

Second. hero enters the <b>origin</b> <b>master</b> scene to <b>push</b> message and <b>pull</b> task from NPC.<br/>
Third.  There are three <b>branch</b> scenes in the game, where you can roam casually, just like github <b>branch</b>.<br/>
Last. after died,hero will <b>clone</b> self,and <b>commit</b> the status.<br/>


## Screenshot

![scene three](http://pomelo.netease.com/image/demo4.png)<br/>
This is a screenshot in scene three. There are many monsters and one hero named Traxex who is killing the monster for experiences, treasures and equipments.


## How to install
First. clone the code and config mysql.
Then npm install in game-server and web-server.
Last exec node app.js in aboved direcotry.


## Requirements

* [nodejs](http://nodejs.org/)
* Linux or Mac os
* MySQL

## Open source projects

* pomelo(https://github.com/NetEase/pomelo  or  http://pomelo.netease.com/)
* colorbox
* express(http://expressjs.com/)
* socket.io(http://socket.io/)
* 66rpg.com
.................
 

## License

(The MIT License)

Copyright (c) 2012 Netease, Inc. and other contributors

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
