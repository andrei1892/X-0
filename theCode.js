
var grid = {
	positions: 9,
	positionsFree: 9 ,
	markedLocations: [ {locationsP1: []}, {locationsP2: []} ] ,
	xIsClick: false,
	oIsClick: false
			  
}

var gameResult = { 
	winnerX : function() { 
							
						},
	
	winner0 : function() { },
	
	draw: function () { if ( positionsFree == 0 ) { alert("It's a draw") } //sau <p> dedesubt cu mesajul </p>
						}

}


function checkEnd(obj) { 
						
}

 
 function xSide() { var cell = document.getElementsByTagName("td");
					for(var i=0; i<cell.length; i++)
				    {   cell[i].addEventListener("click", thexHandler)
						cell[i].addEventListener("click", playerTwo )   }
				}

 function oSide() { var cell = document.getElementsByTagName("td");
					for(var i=0; i<cell.length; i++)
				    {   cell[i].addEventListener("click", the0Handler)
						cell[i].addEventListener("click", playerTwo )   }
				}

				
  function thexHandler(obj) { 
	var cell = obj.target;
	cell.setAttribute("class" , "theXClass") ;
	cell.setAttribute("id" , grid.positionsFree);
	var marked = grid.markedLocations[0];
	marked.locationsP1.push(cell.id);
	grid.positionsFree = grid.positionsFree - 1;						
 }

 
function the0Handler(obj) { 
	var cell = obj.target;
	cell.setAttribute("class" , "the0Class") ;
	cell.setAttribute("id" , grid.positionsFree);
	var marked = grid.markedLocations[0];
	marked.locationsP1.push(cell.id);
	grid.positionsFree = grid.positionsFree - 1;						
 }


function playerTwo() {
	
		if(grid.xIsClick) { 
							var cell = document.getElementsByTagName("td");
							var i = Math.floor( Math.random() * 9);
							cell[i].setAttribute("class" , "the0Class");
							cell[i].setAttribute("id" , grid.positionsFree);
							var marked = grid.markedLocations[0];
							marked.locationsP1.push(cell.id);
							grid.positionsFree = grid.positionsFree - 1;	

						// check if it has id;

						}
	
	else if(grid.oIsClick) { 
							var cell = document.getElementsByTagName("td");
							var i = Math.floor( Math.random() * 9);
							cell[i].setAttribute("class" , "theXClass");
							cell.setAttribute("id" , grid.positionsFree);
							var marked = grid.markedLocations[0];
							marked.locationsP1.push(cell.id);
							grid.positionsFree = grid.positionsFree - 1;	
						}

}


 function init() { 	document.getElementById("but1").onclick = function(){	document.getElementById("but1").disabled = true;
																			document.getElementById("but2").disabled = true;
																			grid.xIsClick = true;
																			xSide() ;
																		};
																		
					document.getElementById("but2").onclick = function() {  document.getElementById("but1").disabled = true;
																			document.getElementById("but2").disabled = true;
																			grid.oIsClick = true;
																			oSide() ;
																		} ;	
				}	
					
window.onload =  addEventListener("load",init);

