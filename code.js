var grid = {
	positions: 9,
	freeCells: 9,
	size: 3, 
	isXClick: false,
	is0Click: false,
	winner: "none",
	locationsP1: [],
	locationsP2: [],
	//winningCombinations: [ ["00","01","02"], ["10","11","12"], ["20","21","22"], ["00","10","20"], ["01","11","21"], ["02","12","22"], ["00","11","22"], ["02","11","21"] ]
}

var behaviour = {

	setSign: function(cell, theClass, theLocation ) { //function to reduce code redundancy; sets the specific class X or 0 and marks the location of the cell
			  cell.setAttribute("class" , theClass);
			  theLocation.push(cell.id);
			  grid.freeCells = grid.freeCells - 1;
	},
	
	placeX: function(obj) {   //the event handler for player1 when he plays X
		var cell = obj.target;
		if( !cell.classList.contains("theXClass") && !cell.classList.contains("the0Class")) {
				behaviour.setSign(cell, "theXClass", grid.locationsP1) ;
				if( behaviour.checkState() ) { 	behaviour.playerTwo(); }
			}

				
	},
	
	place0: function(obj) {    //the event handler for player1 when he plays 0
		var cell = obj.target;
		if( !cell.classList.contains("theXClass") && !cell.classList.contains("the0Class")) {
				behaviour.setSign(cell, "the0Class", grid.locationsP1) ;   
				if( behaviour.checkState() ) { 	behaviour.playerTwo(); } }
	},
	
	playerTwo: function() {    // the player two is represented by the computer , who randomly selects a cell to mark with the oposite sign;
		 if(grid.isXClick) { 
							var cells = document.getElementsByTagName("td");
							var i = Math.floor( Math.random() * 9);
							var cell = cells[i];
							if( !cell.classList.contains("theXClass") && !cell.classList.contains("the0Class")){ 
								behaviour.setSign(cell, "the0Class", grid.locationsP2);	
								behaviour.checkState();
								}
							else { if(grid.freeCells != 0) {  this.playerTwo();	} }	
						}
	else if(grid.is0Click) { 
							var cells = document.getElementsByTagName("td");
							var i = Math.floor( Math.random() * 9);
							var cell = cells[i];
							if( !cell.classList.contains("theXClass") && !cell.classList.contains("the0Class")) { 
								behaviour.setSign(cell, "theXClass", grid.locationsP2) ; 
								behaviour.checkState(); 
								}
							else { if(grid.freeCells != 0) {  this.playerTwo();	} }
						}

	},
		
	checkRow: function() {    //check for winner on row
	/*	var row = [ ["00","01","02"], ["10","11","12"], ["20","21","22"] ];
		var checkP1 = grid.locationsP1.sort();
		var checkP2 = grid.locationsP2.sort()
		for( let i=0; i < grid.locationsP1.length - 2; i++) {
			for(let j=0; j < row.length; j++) {
				 if (row[j][0] == checkP1[i] && row[j][1] == checkP1[i+1] && row[j][2] == checkP1[i+2]  )  { grid.winner = "Player won!"; return true; }
			else if (row[j][0] == checkP2[i] && row[j][1] == checkP2[i+1] && row[j][2] == checkP2[i+2]  )  { grid.winner = "Computer won!"; return true; }
			}
		}
		return false;*/
		var row = [ ["00","01","02"], ["10","11","12"], ["20","21","22"] ];
		var setRow;
				while( ( setRow = row.shift() ) !== undefined ) {
						var checkP1 = intersect( grid.locationsP1, setRow);
						var checkP2 = intersect( grid.locationsP2, setRow);
						if( checkP1 == 3 ) { grid.winner = "Player won!";    return true; }  
				   else if( checkP2 == 3 ) { grid.winner = "Computer won!";  return true; }  	
					}
	return false;
	},
	
	checkCol: function() {    //check for winner on column
		/*var col = [ ["00","10","20"], ["01","11","21"], ["02","12","22"] ];
		var checkP1 = grid.locationsP1.sort(  function (a,b) {   if( a.charAt(1) > b.charAt(1) ) { return 1 ;}
															else if( a.charAt(1) == b.charAt(1)) { return 0 ;}
															else if( a.charAt(1) < b.charAt(1) ) { return -1;}   }      
										   ); 
		var checkP2 = grid.locationsP2.sort(  function (a,b) {   if( a.charAt(1) > b.charAt(1) ) { return 1 ;}
															else if( a.charAt(1) == b.charAt(1)) { return 0 ;}
															else if( a.charAt(1) < b.charAt(1) ) { return -1;}     }    
										    ); 													
	for( let i=0; i < grid.locationsP1.length - 2; i++){
		   for(let j=0; j < col.length; j++)  {
				 if(col[j][0] == checkP1[i] && col[j][1] == checkP1[i+1] && col[j][2] == checkP1[i+2]  ) {  grid.winner = "Player won!";  return true;  }
			else if(col[j][0] == checkP2[i] && col[j][1] == checkP2[i+1] && col[j][2] == checkP2[i+2]  ) {  grid.winner = "Computer won!"; return true; }
			}
		}
	 return false; */
	var col = [ ["00","10","20"], ["01","11","21"], ["02","12","22"] ];
	var setCol;
				while( ( setCol = col.shift() ) !== undefined ) {
						var checkP1 = intersect( grid.locationsP1, setCol);
						var checkP2 = intersect( grid.locationsP2, setCol);
						if( checkP1 == 3 ) { grid.winner = "Player won!";    return true; }  
				   else if( checkP2 == 3 ) { grid.winner = "Computer won!";  return true; }  	
					}
	return false;
	},
	
	checkDiag: function () {
				var diag =  [ ["00","11","22"], ["02","11","20"] ] ; 
				var setDiag;
				while( ( setDiag = diag.shift() ) !== undefined ) {
						var checkP1 = intersect( grid.locationsP1, setDiag);
						var checkP2 = intersect( grid.locationsP2, setDiag);
						if( checkP1 == 3 ) { grid.winner = "Player won!";    return true; } 
				   else if( checkP2 == 3 ) { grid.winner = "Computer won!";  return true; }
					}
	return false;
	},
	
	checkDraw: function() {
		if( grid.freeCells == 0) { grid.winner ="It's a draw!"; return true;}
		else { return false;}		
	},
	
	checkState: function() {
		  if( behaviour.checkRow() )  { endGame(); return false}
	 else if( behaviour.checkCol() )  { endGame(); return false}
	 else if( behaviour.checkDiag() ) { endGame(); return false}
	 else if( behaviour.checkDraw() ) { endGame(); return false}
	 else { return true;}
	}	
};

function intersect(a, b) {
  var setA = new Set(a);
  var setB = new Set(b);
  var intersection = new Set([...setA].filter(x => setB.has(x)));
  return Array.from(intersection).length;
};

function endGame() { 
			var resett = document.createElement("button");
			var name = document.createTextNode("Restart");
			resett.className = "resetButton";	
			resett.type = "reset";
			resett.appendChild(name);
			resett.onclick = function() { location.reload(true)};
			document.getElementById("tableContainer").appendChild(resett);
			//<input type="button" value="Reload Page" onClick="window.location.reload()">
			document.getElementById("announce").innerHTML = "Game Over! " + grid.winner  ;
			var cells = document.getElementsByTagName("td");
			for(let i =0; i<cells.length; i++) {
				cells[i].removeEventListener("click",behaviour.placeX)
			    cells[i].removeEventListener("click",behaviour.place0)
			}	
}

function start() {
	var cells = document.getElementsByTagName("td");
	for(let i =0; i<cells.length; i++){
	     if(grid.isXClick) { cells[i].addEventListener( "click" , behaviour.placeX ) }
	else if(grid.is0Click) { cells[i].addEventListener( "click" , behaviour.place0 ) }
	}
};

function init() { 	document.getElementById("but1").onclick = function(){	document.getElementById("but1").disabled = true;
																			document.getElementById("but2").disabled = true;
																			grid.isXClick = true;
																			start();
																		};
																		
					document.getElementById("but2").onclick = function() {  document.getElementById("but1").disabled = true;
																			document.getElementById("but2").disabled = true;
																			grid.is0Click = true;
																			start();
																		} ;	
				}
				

window.onload = init;				
