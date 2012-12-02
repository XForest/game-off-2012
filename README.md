##XForest -  a browser-based MMORPG

XForest is a browser-based MMORPG(massively multiplayer online role-playing game). 
The backend is written in node.js based on [pomelo](https://github.com/NetEase/pomelo/wiki/Introduction-to-pomelo),
which is a fast, scalable, distributed game server framework for node.js. The frontend uses the HTML5 Canvas to draw 
the map and renders the animations by colorbox, which is a client side game engine written in JavaScript based on HTML5.
In this game, the client communicates via websockets with the server. 

## Online demo

 * Visit [XForest](http://42.121.124.204/) online


## Concepts 

First.  game <b>clone</b> a hero that will <b>clone</b> hp, mp, attack and defense etc from the hero ontology.<br/>

Second. hero enters the <b>origin</b> <b>master</b> scene to <b>push</b> message and <b>pull</b> task from NPC.<br/>
Third.  There are three <b>branch</b> scenes in the game, where you can roam casually, just like github <b>branch</b>.<br/>
Last. after died,hero will <b>clone</b> self,and <b>commit</b> the status.<br/>


## Screenshot

![scene three](http://42.121.124.204/pic/screen.png)<br/>
This is a screenshot in scene three. There are many monsters and one hero named Traxex who is killing the monster for experiences, treasures and equipments.


## How to install
First.Clone the code.
Then. Exec npm install in game-server and web-server.
Last. Exec node app.js in aboved direcotry.

visit http://127.0.0.1:3001/

## Requirements

* [nodejs](http://nodejs.org/)
* Linux or Mac os

## Open source projects

* pomelo(https://github.com/NetEase/pomelo  or  http://pomelo.netease.com/)
* colorbox
* express(http://expressjs.com/)
* socket.io(http://socket.io/)
* 66rpg source(http://www.66rpg.com)
