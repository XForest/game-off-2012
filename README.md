##XForest -  a browser-based MMORPG

XForest is a browser-based MMORPG(massively multiplayer online role-playing game). 
The backend is written in node.js based on [pomelo](https://github.com/NetEase/pomelo/wiki/Introduction-to-pomelo),
which is a fast, scalable, distributed game server framework for node.js. The frontend uses the HTML5 Canvas to draw 
the map and renders the animations by colorbox, which is a client side game engine written in JavaScript based on HTML5.
In this game, the client communicates via websockets with the server. 

## Online demo

 * Visit [XForest](http://www.appme.net) online


## Themes

First.  we clone a hero that will clone hp, mp, attack and defense etc from the hero ontology.
Second. hero enters the origin master scene to push message and pull task from NPC.
Third.  There are three branch scenes in the game, where you can roam casually, just like github branch.
Last. after died,hero will clone self,and commit the status.


## Screenshot

![scene three](http://pomelo.netease.com/image/demo4.png)


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

.................

#### pomelo

Pomelo is made by our team. It is a fast, scalable, distributed game server framework for node.js. It provides the basic
development framework and a lot of related components, including libraries and tools. Pomelo is also suitable for realtime
web application, its distributed architecture makes pomelo scales better than other realtime web framework.

####colorbox
Colorbox is our team's another open source project. It is a client side game engine written in JavaScript based on HTML5 and 
soon to be open source. 


## Screenshot

![scene three](http://pomelo.netease.com/image/demo4.png)

This is a screenshot in scene three. There are many monsters and one hero named Traxex who is killing the monster for experiences, treasures and equipments.


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
