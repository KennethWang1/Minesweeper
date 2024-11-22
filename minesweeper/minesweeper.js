//init
var height = 10;
var width = 10;
var bombs = 15;
var board = [];
var visited = [];
const adj = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[-1,-1],[1,-1]];
var started = false;
var flags = 0;
var lost = false;
restart();
var bombsLeftDisplay = document.getElementById("minesleft");
bombsLeftDisplay.innerHTML = Number(Number(bombs)-Number(flags));
var mineLoc = [];

function update(tile){
    width = document.getElementById("width").value;
    height = document.getElementById("height").value;

    if(tile.className == "flag"){
        return;
    }

    bombsLeftDisplay.innerHTML = Number(Number(bombs)-Number(flags));

    if(!started){
        const charX = Number(tile.id.substr(1).split("_")[0]);
        const charY = Number(tile.id.substr(1).split("_")[1]);
        bombs = document.getElementById("Mines").value;
        for(var i = 0; i < bombs; i++){
            var x, y;
            do{
                x = Math.round(Math.random()*(width-1));
                y = Math.round(Math.random()*(height-1));
            }while(board[y][x] == -1 || ("c" + x + "_" + y) == tile.id || (Math.abs(charX - x) < 2 && Math.abs(charY - y) < 2));
            
            for(var j = 0; j < 8; j++){
                if(Number(y)+Number(adj[j][0]) >= 0 && Number(y)+Number(adj[j][0]) < height && Number(x)+Number(adj[j][1]) >= 0 && Number(x)+Number(adj[j][1]) < width && board[y+adj[j][0]][x+adj[j][1]] != -1){
                    board[Number(y)+Number(adj[j][0])][Number(x)+Number(adj[j][1])] += 1;
                }
            }

            mineLoc.push("c" + x + "_" + y);

            board[y][x] = -1;
        }
        started = true;
    }
    
    var q = [];

    q.push(tile.id);

    while(q.length != 0){
        const loc = q.shift();
        const x = Number(loc.substr(1).split("_")[0]);
        const y = Number(loc.substr(1).split("_")[1]);

        visited[y][x] = true;

        var newClass;

        switch(board[y][x]){
            case 0:
                newClass = "empty";
                document.getElementById(loc).innerHTML = "";
                break;
            case 1:
                newClass = "one";
                document.getElementById(loc).innerHTML = "1";
                break;
            case 2:
                newClass = "two";
                document.getElementById(loc).innerHTML = "2";
                break;
            case 3:
                newClass = "three";
                document.getElementById(loc).innerHTML = "3";
                break;
            case 4:
                newClass = "four";
                document.getElementById(loc).innerHTML = "4";
                break;
            case 5:
                newClass = "five";
                document.getElementById(loc).innerHTML = "5";
                break;
            case 6:
                newClass = "six";
                document.getElementById(loc).innerHTML = "6";
                break;
            case 7:
                newClass = "seven";
                document.getElementById(loc).innerHTML = "7";
                break;
            case 8:
                newClass = "eight";
                document.getElementById(loc).innerHTML = "8";
                break;
            case -1:
                newClass = "bomb";
                document.getElementById(loc).className = newClass;
                bombsLeftDisplay.innerHTML = "You Lose!";
                for(var j = 0; j < mineLoc.length; j++){
                    document.getElementById(mineLoc[j]).className = "bomb";
                }
                lost = true;
                break;
        }

        document.getElementById(loc).className = newClass;

        if(board[y][x] == 0){
            for(var j = 0; j < 8; j++){
                if(Number(Number(y)+Number(adj[j][0])) >= 0 && Number(Number(y)+Number(adj[j][0])) < height && Number(Number(x)+Number(adj[j][1])) >= 0 && Number(Number(x)+Number(adj[j][1])) < width){
                    var newID = "c" + Number(Number(x)+Number(adj[j][1])) + "_" + Number(Number(y)+Number(adj[j][0]));
                    if(document.getElementById(newID).className == "unknown" && !visited[Number(Number(y)+Number(adj[j][0]))][Number(Number(x)+Number(adj[j][1]))]){
                        q.push("c" + Number(Number(x)+Number(adj[j][1])) + "_" + Number(Number(y)+Number(adj[j][0])));
                        visited[Number(Number(y)+Number(adj[j][0]))][Number(Number(x)+Number(adj[j][1]))] = true;
                    }
                }
            }
        }
    }
}

function restart(){
    width = document.getElementById("width").value;
    height = document.getElementById("height").value;
    bombs = Math.min(document.getElementById("Mines").value,Number(width*height-9));
    document.getElementById("Mines").value = bombs;
    flags = 0;
    mineLoc = [];
    started = false;
    lost = false;
    for(var i = 0; i < height; i++){
        board[i] = [];
        visited[i] = [];

        for(var j = 0; j < width; j++){
            board[i][j] = 0;
            visited[i][j] = false;
        }
    }

    const boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";
    boardDiv.style.gridTemplateColumns = "repeat(" + width + ",16px)";
    boardDiv.style.gridTemplateRows = "repeat(" + height + ",16px)";
    for(var i = 0; i < height; i++){
        for(var j = 0; j < width; j++){
            var cell = document.createElement("div");
            cell.className = "unknown";
            cell.id = "c" + j + "_" + i;
            (function(cell) {
                cell.addEventListener("click", function() {
                    if(!lost){
                        update(cell);
                    }
                });
            })(cell);

            (function(cell) {
                cell.addEventListener("contextmenu", function(event) {
                        if(lost){return;}
                        // Prevent the default context menu from showing
                        event.preventDefault();

                        //alert("Right-clicked!");
                        if(cell.className == "flag"){
                            cell.className = "unknown";
                            flags --;
                            bombsLeftDisplay.innerHTML = Number(Number(bombs)-Number(flags));
                            return;
                        }else if(cell.className != "unknown"){
                            return;
                        }
                        flags ++;
                        bombsLeftDisplay.innerHTML = Number(Number(bombs)-Number(flags));
                        cell.className = "flag";
                        if(Number(Number(bombs)-Number(flags)) == 0){
                            for(var i = 0; i < bombs; i++){
                                    if(document.getElementById(mineLoc[i]).className != "flag"){
                                    return;
                                }
                            }

                            bombsLeftDisplay.innerHTML = "You Win!";
                        }
                });
            })(cell);
            boardDiv.appendChild(cell);
        }
    }
}