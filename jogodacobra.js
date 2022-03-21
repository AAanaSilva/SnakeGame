const musfun = new Audio ("music/music.mp3");
const gameover = new Audio("music/gameover.mp3");
const musmov = new Audio("music/move.mp3");
const comer = new Audio("music/food.mp3");

var direcao = {x: 0, y: 0};
var cobra = [{ x: 5, y: 5 }]
var food = {
    x: Math.floor(Math.random() * 16)+1,
    y: Math.floor(Math.random() * 16) +1
}
var pontos = 0;
var utmvzatt = 0; 
var vlcdd = 5;

function principal(tempoAtual) {
    window.requestAnimationFrame(principal);
    if((tempoAtual - utmvzatt) / 1000 < 1 /vlcdd){
        return;
    }

    utmvzatt = tempoAtual;
    atualizaGame()
}

function verificarcol(){
    for(i = 1; i < cobra.length; i++){
        if(cobra[i].x == cobra[0].x && cobra[i].y == cobra[0].y){
            return true;
        }
    }

if(cobra[0].x >= 18 || cobra[0].x <= 0 || cobra[0].y >= 18 || cobra[0].y <= 0){
    return true;
} 
    return false;

}

function comeu(){
    if(cobra[0].x == food.x && cobra[0].y == food.y){
        comer.play();
        pontos = pontos + 10;
        pontuacao.innerHTML = pontos + " pontos";
        cobra.unshift(
            {x: cobra[0].x + direcao.x,
             y: cobra[0].y + direcao.y}
        )
    food.x = Math.floor(Math.random() * 16)+1
    food.y = Math.floor(Math.random() * 16)+1
    vlcdd = vlcdd + 0.10;
    }
}

function atualizaGame(){

    var colidiu = verificarcol ();
    if(colidiu == true){
        musfun.pause();
        gameover.play();
        alert("Vacilou feio hein senhor companheiro")
        cobra[i + 1] = [{ x: 5, y: 5 }]
        direcao.x = 0;
        direcao.y = 0;
        pontos = 0;
    }

    comeu();

    for(var i = cobra.length - 2; i >= 0; i--){
        cobra[i+1] = {...cobra[i]}
    }

    cobra[0].y += direcao.y;
    cobra[0].x += direcao.x;


    board.innerHTML = "";
    for(var i = 0; i < cobra.length; i++){
        var cobrapart = document.createElement('div');
        cobrapart.style.gridRowStart = cobra[i].y;
        cobrapart.style.gridColumnStart = cobra[i].x;

        if(i == 0){
            cobrapart.classList.add("head");
        }else{
            cobrapart.classList.add("snake");
        }
    board.appendChild(cobrapart);
    }
    var frutinha = document.createElement("div");
    frutinha.style.gridColumnStart = food.x;
    frutinha.style.gridRowStart = food.y;
    frutinha.classList.add("fruta");
    board.appendChild(frutinha)
}

function ClickDir(e) {
    musmov.play();
    switch(e.code){
        case "KeyW":
            direcao.x = 0
            direcao.y = -1;
            break;
        case "KeyA":
            direcao.x = -1
            direcao.y = 0;
            break;
        case "KeyS":
            direcao.x = 0
            direcao.y = 1;
            break;
        case "KeyD":
            direcao.x = 1
            direcao.y = 0;
            break;
        case "Enter":
            direcao.x = 1
            direcao.y = 0;
        musfun.play();
            break
    }
}

window.addEventListener("keydown", (e) => ClickDir(e))





principal(); 

