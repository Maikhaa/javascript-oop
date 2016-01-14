var read = require('read');

var Room = function(doors,hint,desc){
		this.doors = doors;
		this.hint = hint;
		this.desc = desc;
};

var Game = function(rooms,currentRoom){
		this.rooms = rooms;
		this.currentRoom = currentRoom;
		this.gamePrompt = {
    		prompt: "N,S,E,W?\n>"
		}
};

Game.prototype.question = function(){
	console.log(this.currentRoom.desc);
	read(this.gamePrompt,this.processInput.bind(this));
}

Game.prototype.processInput = function(err,input){ 
		if (input === this.currentRoom.doors){
			this.nextRoom();						
		} else {
			console.log(this.currentRoom.hint);
			this.question();
		}
}

Game.prototype.nextRoom = function(){
		var index = this.rooms.indexOf(this.currentRoom);
		if (index === this.rooms.length-1){
			console.log("FIN");
		} else {
			this.currentRoom = this.rooms[index+1];	
			this.question();
		}
}

var roomOne = new Room("S","There is no exit here, go South","This is room One");
var roomTwo = new Room("N","There is no exit here, go North","This is room Two");
var roomThree = new Room("W","There is no exit here, go West","This is room Three");
var roomFour = new Room("E","There is no exit here,go East","This is room Four");

var rooms = [roomOne,roomTwo,roomThree,roomFour];

var theGame = new Game(rooms,rooms[0]);

theGame.question();

