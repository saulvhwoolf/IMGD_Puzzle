// game.js for Perlenspiel 3.2.x

/*
Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
Perlenspiel is Copyright © 2009-17 Worcester Polytechnic Institute.
This file is part of Perlenspiel.

Perlenspiel is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Perlenspiel is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You may have received a copy of the GNU Lesser General Public License
along with Perlenspiel. If not, see <http://www.gnu.org/licenses/>.
*/

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
var randnum = PS.random(4);
var current = 0;

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

if (randnum === 1)
{
	grid = grid1;
}
else if(randnum === 2)
{
	grid = grid2;
}
else if(randnum === 3)
{
	grid = grid3;
}
else if(randnum === 4)
{
	grid = grid4;
}

function BLOCK(x, y){

	this.x = x;
	this.y = y;
	

	this.draw = function(){
		PS.color(this.x, this.y, 40, 210, 49);
		PS.radius(this.x, this.y, 13);
	}
	this.move = function(input){
		if(input == LEFT)
		{
			var newLoc = getLocation(this.x, this.y, -1, 0);
			this.x = newLoc[0];
			this.y = newLoc[1];
		}
		else if(input == RIGHT)
		{
			var newLoc = getLocation(this.x, this.y, 1, 0);
			this.x = newLoc[0];
			this.y = newLoc[1];
		}
		else if(input == UP)
		{
			var newLoc = getLocation(this.x, this.y, 0, -1);
			this.x = newLoc[0];
			this.y = newLoc[1];
		}
		else if(input == DOWN)
		{
			var newLoc = getLocation(this.x, this.y, 0, 1);
			this.x = newLoc[0];
			this.y = newLoc[1];
		}else if(input === PS.KEY_ENTER)
		{
			initializeGrid();
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
		console.log(newX, newY);
		newX += dx;
		newY += dy;
	}
	if(grid[newX+dx][newY+dy] == "g")
	{
		PS.statusText("yay!")
		if(grid.length > current+2){
			current=current+1;
		}
		else{
			current = 0;
		}
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
	initializeGrid();
	PS.gridSize( SCREEN_X, SCREEN_Y );
	PS.statusText("Use the arrow keys to move in the desired direction. Press enter if you want to reset the puzzle.");
	
	drawScreen();
	PS.timerStart ( 3, everyTick);


	// Add any other initialization code you need here
};
function initializeGrid()
{
	console.log(current);
	// grid = aGrid;
	grid = grids[current];
	SCREEN_X = grid.length;
	SCREEN_Y = grid[0].length;
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
			}
		}
	}

}


function everyTick()
{
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
			if(grid[c][r] == "b")
			{
				PS.color(c, r, 0, 0, 0);
				PS.border(c, r, 0 );

			}
			else if(grid[c][r] == "w")
			{
				PS.color(c, r, 59, 50, 10);
			}
			else if(grid[c][r] == "g")
			{
				PS.glyph(c, r, "G");
				PS.color(c, r, 167, 249, 34);
			}
			else if(grid[c][r] == "s")
			{
				PS.glyph(c, r, "S");
				PS.color(c, r, 167, 249, 34);
			}
			else if(c == MOUSE_LOC[0] && r == MOUSE_LOC[1])
			{
				// PS.radius(c, r, 20);
				// PS.color(c, r, 100, 10, 200);
				// PS.bgColor(c, r, 3, 144, 255);

			}
			else
			{
				PS.border(c, r, 0);
				PS.color(c, r, 255, 255, 255);
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

// PS.touch ( x, y, data, options )
// Called when the mouse button is clicked on a bead, or when a bead is touched
// It doesn't have to do anything
// [x] = zero-based x-position of the bead on the grid
// [y] = zero-based y-position of the bead on the grid
// [data] = the data value associated with this bead, 0 if none has been set
// [options] = an object with optional parameters; see documentation for details

PS.touch = function( x, y, data, options ) {
	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.touch() @ " + x + ", " + y + "\n" );

	// Add code here for mouse clicks/touches over a bead
	// if(grid[x][y] == "w")
	// {
	// 	grid[x][y] = 'g';
	// }
	// else if(grid[x][y] == "g")
	// {
	// 	grid[x][y] = 's';
	// }
	// else if(grid[x][y] == "s")
	// {
	// 	grid[x][y] = ' ';
	// }
	// else if(grid[x][y] == " ")
	// {
	// 	grid[x][y] = 'w';
	// }
	// drawScreen();

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
	block.move(key)
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