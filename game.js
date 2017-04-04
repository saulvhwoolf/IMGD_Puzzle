// game.js for Perlenspiel 3.2.x

// The "use strict" directive in the following line is important. Don't remove it!
"use strict";

// The following comment lines are for JSLint/JSHint. Don't remove them!

/*jslint nomen: true, white: true */
/*global PS */

var SCREEN_X = 10;
var SCREEN_Y = 10;
var BORDER = 1;
var MOUSE_LOC = [-1,-1];
var LEFT = 1005, UP = 1006, RIGHT = 1007, DOWN = 1008;
var grid = [];
var current = 0;
var waitCounter = 0;
var loadLevel = false;
var thisLevelTicks = 0;
var totalTicks = 0;
var numMoves = 0;
var showing = "level";

var grid1 = [["b","b","b","b","b","b","b","b","b","b"],
			 ["b"," ","s","w"," "," ","w"," "," ","b"],
			 ["b"," ","w"," "," "," ","w"," "," ","b"],
			 ["b"," "," "," ","w","g"," "," "," ","b"],
			 ["b"," ","w"," "," ","w"," "," "," ","b"],
			 ["b"," "," ","w"," "," "," "," "," ","b"],
			 ["b"," "," "," "," "," ","w"," "," ","b"],
			 ["b"," "," "," "," "," "," "," "," ","b"],
			 ["b"," "," "," ","w"," "," "," "," ","b"],
			 ["b","b","b","b","b","b","b","b","b","b"]];

var grid2 = [["b","b","b","b","b","b","b","b","b","b"],
   			 ["b"," "," "," ","w"," "," "," "," ","b"],
			 ["b"," ","w"," "," "," "," "," ","w","b"],
   			 ["b"," ","w"," "," ","w"," "," ","s","b"],
			 ["b"," "," "," "," "," ","w"," "," ","b"],
    		 ["b"," "," "," "," "," "," "," "," ","b"],
			 ["b"," "," ","w"," "," "," "," "," ","b"],
   			 ["b"," "," "," "," "," "," "," ","w","b"],
			 ["b","w"," "," "," "," ","w"," ","g","b"],
   			 ["b","b","b","b","b","b","b","b","b","b"]];

var grid3 = [["b","b","b","b","b","b","b","b","b","b"],
   			 ["b"," "," "," "," "," "," "," "," ","b"],
			 ["b"," ","w"," "," "," "," ","w"," ","b"],
			 ["b"," "," "," ","w"," "," "," ","s","b"],
    		 ["b"," "," "," ","w"," ","w"," "," ","b"],
    		 ["b"," "," ","g"," "," "," "," "," ","b"],
    		 ["b"," "," "," "," "," "," ","w"," ","b"],
    		 ["b"," ","w"," "," ","w"," ","w"," ","b"],
    		 ["b"," "," "," "," "," "," "," "," ","b"],
    		 ["b","b","b","b","b","b","b","b","b","b"]];

var grid4 = [["b","b","b","b","b","b","b","b","b","b"],
			 ["b"," ","w"," ","w"," ","w"," "," ","b"],
    		 ["b","s"," "," "," "," "," "," ","w","b"],
    		 ["b"," "," ","w"," ","w"," "," "," ","b"],
    		 ["b"," "," "," "," "," "," "," "," ","b"],
    		 ["b"," ","w"," ","w"," ","w"," "," ","b"],
    		 ["b"," "," "," ","w"," "," "," "," ","b"],
    		 ["b"," "," ","w"," "," "," ","w","w","b"],
    		 ["b","w","w"," "," ","w"," "," ","g","b"],
    		 ["b","b","b","b","b","b","b","b","b","b"]];

var grids = [grid1, grid2, grid3, grid4];


function BLOCK(x, y){

	this.x = x;
	this.y = y;
	this.move = [0,0];
	

	this.draw = function(){
		PS.color(this.x, this.y, 146, 57, 255);
		PS.radius(this.x, this.y, 13);
		if(this.move[0] == 0 && this.move[1] == 0)
		{
			if(grid[this.x-1][this.y] == ' ' || grid[this.x-1][this.y] == 'g')
			{
				if(this.x-1 == MOUSE_LOC[0] && this.y == MOUSE_LOC[1])
				{
					PS.glyphColor ( this.x-1, this.y, 150, 150, 40 );
				}
				PS.glyph(this.x-1, this.y, '↞');

			}
			if(grid[this.x+1][this.y] == ' ' || grid[this.x+1][this.y] == 'g')
			{
				if(this.x+1 == MOUSE_LOC[0] && this.y == MOUSE_LOC[1])
				{
					PS.glyphColor ( this.x+1, this.y, 150, 150, 40 );
				}
				PS.glyph(this.x+1, this.y, '↠');

			}
			if(grid[this.x][this.y+1] == ' ' || grid[this.x][this.y+1] == 'g')
			{
				if(this.x == MOUSE_LOC[0] && this.y+1 == MOUSE_LOC[1])
				{
					PS.glyphColor ( this.x, this.y+1, 150, 150, 40 );
				}
				PS.glyph(this.x, this.y+1, '↡');

			}
			if(grid[this.x][this.y-1] == ' ' || grid[this.x][this.y-1] == 'g')
			{
				if(this.x == MOUSE_LOC[0] && this.y-1 == MOUSE_LOC[1])
				{
					PS.glyphColor ( this.x, this.y-1, 150, 150, 40 );
				}
				PS.glyph(this.x, this.y-1, '↟');
			}
		}
	}
	this.setXY = function(x, y){
		this.x = x;
		this.y = y;
	}
	this.input = function(input){
		if(this.move[0] == 0 && this.move[1] == 0)
		{
			if(input == LEFT)
			{
				numMoves++;
				this.move = [-1, 0];
			}
			else if(input == RIGHT)
			{
				numMoves++;
				this.move = [1, 0];
			}
			else if(input == UP)
			{
				numMoves++;
				this.move = [0, -1];
			}
			else if(input == DOWN)
			{
				numMoves++;
				this.move = [0, 1];
			}
			else if(input === PS.KEY_ENTER || input === PS.KEY_S)
			{
				thisLevelTicks = 0;
				initializeGrid();
			}
			else
			{
				PS.statusText("Use Arrow Keys to Move!");
				waitCounter = 5;
			}
		}
		
	}
	this.mouseInput = function(x, y){
		if(this.move[0] == 0 && this.move[1] == 0)
		{
			if(this.x-1 == x && this.y ==y)
			{
				numMoves++;
				this.move = [-1, 0];
			}
			else if(this.x+1 == x && this.y ==y)
			{
				numMoves++;
				this.move = [1, 0];
			}
			else if(this.x == x && this.y-1 ==y)
			{
				numMoves++;
				this.move = [0, -1];
			}
			else if(this.x == x && this.y+1 ==y)
			{
				numMoves++;
				this.move = [0, 1];
			}
			else
			{
				PS.statusText("Use Arrow Keys to Move!");
				waitCounter = 5;
			}
		}
		
	}
	this.onTick = function()
	{
		var nextSpot = grid[this.x+this.move[0]][this.y+this.move[1]]
		if(nextSpot == ' ' || nextSpot == 's' || nextSpot == 't')
		{
			this.x += this.move[0];
			this.y += this.move[1];
		}
		else if(nextSpot == 'g')
		{
			this.x += this.move[0];
			this.y += this.move[1];
			PS.statusText("Nice One!");
			waitCounter = 15;
			loadLevel = true;
		}
		else
		{
			this.move = [0, 0];
		}
	}
}

function getLocation(x, y, dx, dy)
{
	var newX = x;
	var newY = y;
	// console.log()
	while(grid[newX+dx][newY+dy] == ' ' || grid[newX+dx][newY+dy] == 's')
	{
		// console.log(newX, newY);
		newX += dx;
		newY += dy;
	}
	if(grid[newX+dx][newY+dy] == "g")
	{
		showing = "not";
		PS.statusText("yay!")
		current++;
		initializeGrid();

		return [newX+dx, newY+dy]


	}
	return [newX, newY];
}
var block;
PS.init = function( system, options ) {
	// Use PS.gridSize( x, y ) to set the grid to
	// the initial dimensions you want (32 x 32 maximum)
	// Do this FIRST to avoid problems!
	// Otherwise you will get the default 8x8 grid
	
	block = new BLOCK(4, 4);
	grids = [generateMap(), generateMap(), generateMap(), generateMap(), generateMap(), generateMap(), generateMap(), generateMap(), generateMap(), generateMap()];
	initializeGrid();
	PS.gridSize( SCREEN_X, SCREEN_Y );
	// PS.statusText("Use the arrow keys to move in the desired direction. Press enter if you want to reset the puzzle.");
	
	drawScreen();
	PS.timerStart ( 3, everyTick);


	// Add any other initialization code you need here
};
function initializeGrid()
{
	showing = "level";
	PS.statusText("Level " + (current + 1) + "    |    Score:" + getScore());
	console.log("entering level " + current);
	// grid = aGrid;
	if(current%10 == 0)
	{
		grids = [generateMap(), generateMap(), generateMap(), generateMap(), generateMap(), generateMap(), generateMap(), generateMap(), generateMap(), generateMap()];
		console.log("reset Levels")
	}
	grid = grids[current%10];
	SCREEN_X = grid.length;
	SCREEN_Y = grid[0].length;
	PS.gridSize( SCREEN_X, SCREEN_Y );
	// for(var)
	var  r = 0;
	for(r = 0; r < SCREEN_Y; r +=1)
	{
		var c = 0;
		for(c = 0; c < SCREEN_X; c +=1)
		{
			if(grid[c][r] == "s")
			{
				block = new BLOCK(c, r);
				return;
			}
		}
	}
	block = new BLOCK(1, 1);

}

function getScore()
{
	var val = 1000-numMoves*20+current*500-totalTicks
	if(val < 0)
	{
		return 0;
	}
	return val;
}
function everyTick()
{
	thisLevelTicks++;
	
	// console.log(thisLevelTicks);
	if(thisLevelTicks%100 == 50){
		showing = "level";
		PS.statusText("Level " + (current + 1) + "    |    Score:" + getScore());
	}
	if(thisLevelTicks%300 == 299){
		showing = "not";
		PS.statusText("Press 'Enter' to reset level");
	}
	waitCounter--;
	if(waitCounter < 0)
	{
		if(showing == "level")
		{
			PS.statusText("Level " + (current + 1) + "    |    Score:" + getScore());
		}
		totalTicks++;
		if(loadLevel)
		{	
			thisLevelTicks = 0;
			current++;
			initializeGrid();
			loadLevel = false;
			block.move = [0, 0]
		}
		waitCounter = 0;
		block.onTick();
	}
	drawScreen();

}
function drawScreen()
{
	var  r = 0;
	// console.log(MOUSE_LOC)
	for(r = 0; r < SCREEN_Y; r +=1)
	{
		var c = 0;
		for(c = 0; c < SCREEN_X; c +=1)
		{
			PS.glyph(c, r, " ");
			PS.glyphColor ( c, r, 0, 0, 0 );
			if(grid[c][r] == "b")
			{
				PS.color(c, r, 52, 54, 232);
				PS.border(c, r, 0 );

			}
			else if(grid[c][r] == "w")
			{
				PS.border(c, r, 0);
				PS.color(c, r,70, 154, 255);
			}
			else if(grid[c][r] == "g")
			{

				PS.glyph(c, r, "G");
				PS.color(c, r, 25, 255, 170);
			}
			else if(grid[c][r] == "s")
			{
				PS.glyph(c, r, "S");
				PS.border(c, r, 0);
				// PS.color(c, r, 167, 249, 34);
				PS.color(c, r, 98, 217, 242);
			}
			else if(grid[c][r] == "t")
			{
				PS.border(c, r, 0);
				PS.color(c, r, 234, 52, 124);
			}
			else if(grid[c][r] == " ")
			{
				PS.border(c, r, 0);
				PS.color(c, r, 98, 217, 242);
			}
			else
			{
				PS.border(c, r, 0);
				PS.color(c, r, 150, 43, 152);
			}
			
		}
	}
	block.draw();
	// for()
}
function isBorder(c, r)
{
	if(r<BORDER || c < BORDER || c >=SCREEN_X-BORDER || r >= SCREEN_Y-BORDER )
	{
		return true;
	}
	else
	{
		return false;
	}
}
function gridString()
{
	var total = "";
	for(var r = 0; r < SCREEN_Y; r +=1)
	{ 
		total += "[";
		for(var c = 0; c < SCREEN_X; c +=1)
		{
			total+="\"" + grid[c][r] + "\",";
		}
		total += "],";
	}
	return total;
}



function generateMap(){
	var width = PS.random(10)+10;
	var height = PS.random(10)+10;
	var newGrid = new Array(width+2);
	PS.gridSize(width+2, height+2);

	for (var i = 0; i < width+2; i++) {
	  newGrid[i] = new Array(height+2);
	}
	for(var x = 0; x < width+2;x++){
		for(var y = 0; y < height+2; y++){
			if(x == 0 || y == 0 || y == height+2-1 || x == width+2-1){
				newGrid[x][y] = 'b';
			}
			else{
				newGrid[x][y] = ' ';
			}
		}
	}
	var bug = [PS.random(width), PS.random(height)]
	console.log(width + "," + height + ", " + bug)
	var bugDir = [1, 0]
	var start = [bug[0], bug[1]];
	newGrid[bug[0]][bug[1]] = "s";

	var num = Math.floor(width*height*10);
	for(var i = 0; i < num; i++)
	{
		var oldDir = bugDir;
		bugDir = getDirection(bugDir);//[0,1];//getPossibleDirection(bug[0], bug[1], newGrid);
		var newX = bug[0] + bugDir[0];
		var newY = bug[1] + bugDir[1];
		if(newGrid[newX][newY] == 'b' || newGrid[newX][newY] == 'w' )
		{
			var newBugDir = turn(bugDir);
			// if(!(bugDir[0] == newBugDir[0] && bugDir[1] == newBugDir[1])){
			var wx = bug[0] + newBugDir[0];
			var wy = bug[1] + newBugDir[1];
			if(newGrid[wx][wy] !== " " && newGrid[wx][wy] !== "b" && newGrid[wx][wy] !== "t")
			{
				// PS.debug(wx + ", " + wy + "\n");
				// PS.debug(i + ": " + "d");
				if(newGrid[wx][wy] != "b" && newGrid[wx][wy] != "b")
				{
					newGrid[wx][wy] = "w";
				}
			}
			bugDir = newBugDir;
		}
		else
		{	
			
			
			// if(newGrid[bug[0]][bug[1]] == "t")
			// {
			// 	bugDir = oldDir;
			// }

			if(oldDir != bugDir && newGrid[bug[0]+oldDir[0]][bug[1]+oldDir[1]] != "t")
			{
				if(newGrid[bug[0]+oldDir[0]][bug[1]+oldDir[1]] != "b" && newGrid[bug[0]+oldDir[0]][bug[1]+oldDir[1]] != "s")
				{
					newGrid[bug[0]+oldDir[0]][bug[1]+oldDir[1]] = "w";
				}
			}
			else if (newGrid[bug[0]+oldDir[0]][bug[1]+oldDir[1]] == "t")
			{
				bugDir = oldDir;
				newX = bug[0] + bugDir[0];
				newY = bug[1] + bugDir[1];
			}


			bug = [newX, newY];


			if(newGrid[newX][newY] != "s" )
			{
				// newGrid[newX][newY] = 't';
				newGrid[newX][newY] = "t";
			}
			
		}

	}
	newGrid[bug[0]][bug[1]] = "g";
	newGrid[start[0]][start[1]] = "s";
	
	for(var x = 0; x < width+2;x++){
		for(var y = 0; y < height+2; y++){
			if(newGrid[x][y] == "t")
			{
				newGrid[x][y] = " ";
			}
		}
	}

	return newGrid;
}

function getPossibleDirection(x, y, grid)
{
	var dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]];
	var dir = dirs[PS.random(4)];
	return dir;
}
function getDirection(dir)
{
	if(PS.random(4) <= 1)
	{
		dir = turn(dir);
	}
	return dir;

}
function turn(dir)
{
	if(PS.random(2) <=1)
	{
		dir = turnRight(dir[0], dir[1]);
	}
	else
	{
		dir = turnLeft(dir[0], dir[1]);
	}
	return dir;
}

function turnRight(dx, dy)
{
	return [-dy, dx];
}
function turnLeft(dx, dy)
{
	return [dy, -dx];
}

// PS.touch ( x, y, data, options )
// Called when the mouse button is clicked on a bead, or when a bead is touched
// It doesn't have to do anything
// [x] = zero-based x-position of the bead on the grid
// [y] = zero-based y-position of the bead on the grid
// [data] = the data value associated with this bead, 0 if none has been set
// [options] = an object with optional parameters; see documentation for details

PS.touch = function( x, y, data, options ) {
	block.mouseInput(x, y);

};

// PS.release ( x, y, data, options )
// Called when the mouse button is released over a bead, or when a touch is lifted off a bead
// It doesn't have to do anything
// [x] = zero-based x-position of the bead on the grid
// [y] = zero-based y-position of the bead on the grid
// [data] = the data value associated with this bead, 0 if none has been set
// [options] = an object with optional parameters; see documentation for details

PS.release = function( x, y, data, options ) {
	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.release() @ " + x + ", " + y + "\n" );


	// Add code here for when the mouse button/touch is released over a bead
};

// PS.enter ( x, y, button, data, options )
// Called when the mouse/touch enters a bead
// It doesn't have to do anything
// [x] = zero-based x-position of the bead on the grid
// [y] = zero-based y-position of the bead on the grid
// [data] = the data value associated with this bead, 0 if none has been set
// [options] = an object with optional parameters; see documentation for details

PS.enter = function( x, y, data, options ) {
	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch enters a bead
	MOUSE_LOC = [x, y];

};

// PS.exit ( x, y, data, options )
// Called when the mouse cursor/touch exits a bead
// It doesn't have to do anything
// [x] = zero-based x-position of the bead on the grid
// [y] = zero-based y-position of the bead on the grid
// [data] = the data value associated with this bead, 0 if none has been set
// [options] = an object with optional parameters; see documentation for details

PS.exit = function( x, y, data, options ) {

	
};

// PS.exitGrid ( options )
// Called when the mouse cursor/touch exits the grid perimeter
// It doesn't have to do anything
// [options] = an object with optional parameters; see documentation for details

PS.exitGrid = function( options ) {
	
};

// PS.keyDown ( key, shift, ctrl, options )
// Called when a key on the keyboard is pressed
// It doesn't have to do anything
// [key] = ASCII code of the pressed key, or one of the PS.KEY constants documented at:
// http://users.wpi.edu/~bmoriarty/ps/constants.html
// [shift] = true if shift key is held down, else false
// [ctrl] = true if control key is held down, else false
// [options] = an object with optional parameters; see documentation for details

PS.keyDown = function( key, shift, ctrl, options ) {
	// Uncomment the following line to inspect parameters
	// PS.debug( "DOWN: key = " + key + ", shift = " + shift + "\n" );
	block.input(key)
	// Add code here for when a key is pressed
	// console.log(gridString());
};

// PS.keyUp ( key, shift, ctrl, options )
// Called when a key on the keyboard is released
// It doesn't have to do anything
// [key] = ASCII code of the pressed key, or one of the PS.KEY constants documented at:
// http://users.wpi.edu/~bmoriarty/ps/constants.html
// [shift] = true if shift key is held down, false otherwise
// [ctrl] = true if control key is held down, false otherwise
// [options] = an object with optional parameters; see documentation for details

PS.keyUp = function( key, shift, ctrl, options ) {
	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.keyUp(): key = " + key + ", shift = " + shift + ", ctrl = " + ctrl + "\n" );

	// Add code here for when a key is released
};

// PS.input ( sensors, options )
// Called when an input device event (other than mouse/touch/keyboard) is detected
// It doesn't have to do anything
// [sensors] = an object with sensor information; see documentation for details
// [options] = an object with optional parameters; see documentation for details

PS.input = function( sensors, options ) {
	// Uncomment the following block to inspect parameters
	/*
	 PS.debug( "PS.input() called\n" );
	 var device = sensors.wheel; // check for scroll wheel
	 if ( device )
	 {
	 PS.debug( "sensors.wheel = " + device + "\n" );
	 }
	 */

	// Add code here for when an input event is detected
};

// PS.swipe ( data, options )
// Called when the player swipes a held-down mouse or finger across or around the grid.
// It doesn't have to do anything
// [data] = an object with swipe information; see documentation for details
// [options] = an object with optional parameters; see documentation for details

PS.swipe = function( data, options ) {

	// block1.drag(data)
	// Add code here for when a swipe event is detected
};

// PS.shutdown ( options )
// Called when the browser window running Perlenspiel is about to close
// It doesn't have to do anything
// [options] = an object with optional parameters; see documentation for details

PS.shutdown = function( options ) {

	// Add code here for when Perlenspiel is about to close
};
