class Player{
    constructor(ans,guess,bulls,cows){
        this.ans = ans;
        this.guess = guess;
        this.bulls = bulls;
        this.cows = cows;
    }
    // Numarul de Bulls si de Cows 
    getResult(answer){
    this.cows = 0;
    this.bulls = 0;
    for(let i=0; i < 4; i++)
        for(let j=0; j < 4; j++)
            if(answer[i] == this.guess[j])
            {
                if(i == j) 
                    this.bulls++;
                else
                    this.cows++;
            }
    }
}
class Robot extends Player{
    constructor(ans,guess,bulls,cows,possib){
        super(ans,guess,bulls,cows);
        this.possib = possib;
    }
    // Robotul analizeaza hinturile tale    
    check(ans, guess){
        var tempBulls = this.bulls;
        var tempCows = this.cows;
        for(let i=0; i < 4; i++){
            for(let j=0; j < 4; j++)
                var ind = ans.indexOf(guess.charAt(i));
                if(ind == i) 
                    tempBulls--;
                else if(ind >= 0)
                    tempCows--;}
        return (tempBulls == 0) && (tempCows == 0);
    }
}
var Player1, Player2, Robo;
var GameMode;
Player1 = new Player(0,0,0,0);
// Alegerea modului de joc
document.getElementById("RoboMode").onclick = function(){
    GameMode = "RoboMode";
    console.log(GameMode);
    document.getElementById("RoboMode").style.filter = "grayscale(0%)";
    document.getElementById("RoboMode").style.boxShadow = "0px 0px 10px white";
    document.getElementById("FriendMode").style.filter = "grayscale(100%)";
    document.getElementById("FriendMode").style.boxShadow = "none";
    document.getElementById("StartJoc").style.display = "none";
    document.getElementById("Next-to-Difficulty").style.display = "block";
}
document.getElementById("FriendMode").onclick = function(){
    GameMode = "FriendMode";
    console.log(GameMode);
    document.getElementById("FriendMode").style.filter = "grayscale(0%)";
    document.getElementById("FriendMode").style.boxShadow = "0px 0px 10px white";
    document.getElementById("RoboMode").style.filter = "grayscale(100%)";
    document.getElementById("RoboMode").style.boxShadow = "none";
    document.getElementById("StartJoc").style.display = "block";
    document.getElementById("Next-to-Difficulty").style.display = "none";
}
var Difficulty;
// Pornirea jocului
function StartJoc(){
    alert("Jucatorul 1 trebuie sa isi seteze un numar!");
    document.getElementById("SelectLevel").style.display = "none";
    document.getElementById("SelectMode").style.display = "none";
    document.getElementById("setNumber").style.display = "block";
    if(GameMode == "RoboMode"){
        Robo = new Robot(0,0,0,0,init());
    }
    else if(GameMode == "FriendMode"){
        Player2 = new Player(0,0,0,0);
    }
}
document.getElementById("Next-to-Difficulty").onclick = function(){
    document.getElementById("SelectMode").style.display = "none";
    document.getElementById("SelectLevel").style.display = "block";
}
document.getElementById("Easy").onclick = function(){
    Difficulty = "Easy";
    document.getElementById("Easy").style.background="linear-gradient(to right, rgba(255,0,0,0) 0%, rgba(255,0,0,1) 50%, rgba(0,0,255,0) 100%)";
    document.getElementById("Medium").style.background="linear-gradient(to right, #03e9f400 0%, #03e9f4 50%, #03e9f400 100%)";
    document.getElementById("Hard").style.background="linear-gradient(to right, #03e9f400 0%, #03e9f4 50%, #03e9f400 100%)";
}
document.getElementById("Medium").onclick = function(){
    Difficulty = "Medium";
    document.getElementById("Easy").style.background="linear-gradient(to right, #03e9f400 0%, #03e9f4 50%, #03e9f400 100%)";
    document.getElementById("Medium").style.background="linear-gradient(to right, rgba(255,0,0,0) 0%, rgba(255,0,0,1) 50%, rgba(0,0,255,0) 100%)";
    document.getElementById("Hard").style.background="linear-gradient(to right, #03e9f400 0%, #03e9f4 50%, #03e9f400 100%)";
}
document.getElementById("Hard").onclick = function(){
    Difficulty = "Hard";
    document.getElementById("Easy").style.background="linear-gradient(to right, #03e9f400 0%, #03e9f4 50%, #03e9f400 100%)";
    document.getElementById("Medium").style.background="linear-gradient(to right, #03e9f400 0%, #03e9f4 50%, #03e9f400 100%)";
    document.getElementById("Hard").style.background="linear-gradient(to right, rgba(255,0,0,0) 0%, rgba(255,0,0,1) 50%, rgba(0,0,255,0) 100%)";
}
// Generarea tuturor posibilitatilor ce respecta regulile de joc
function init(){
    var possib = [];
    for (let a = 0; a <= 9; a++) { 
        for (let b = 0; b <= 9; b++) {
            if (b == a) continue;
            for (let c = 0; c <= 9; c++) {
                if (c == b || c == a) continue;
                for (let d = 0; d <= 9; d++) {
                    if (d == a || d == b || d == c) continue;
                    let cnt = ""+a+b+c+d;
                    possib.push(cnt);
                }
            }
        }
    }
    return possib;
}
// Citirea input-ului
function moveOnMax(field, nextFieldID) {
    if (field.value.length == 1) {
        document.getElementById(nextFieldID).focus();
    }
}
var input,a,b,c,d;
function read(i1,i2,i3,i4){
    a = document.getElementById(i1);
    b = document.getElementById(i2);
    c = document.getElementById(i3);
    d = document.getElementById(i4);
    input = a.value+b.value+c.value+d.value;
};
// Restrictiile input-ului
function checkInput(item)
{
    if(item.length != 4)
        return false;
    for(let i = 0; i < item.length; i++)
        for(let j = i+1; j < item.length; j++)
        if(item[i]==item[j])
                return false;
    return true;
}
// Golirea input-box
function clear(){
    a.value='';
    b.value='';
    c.value='';
    d.value='';
}
// Deschiderea tabelelor
function openTable(){
    document.getElementById('setNumber').style.display = 'none';
    var el = document.getElementsByClassName("Table");
    el[0].style.display='inline-block';
    el[1].style.display='inline-block';
    document.getElementById('Try').style.display = 'block';
    document.getElementById('flt').style.display = 'block';
}
// Playerul isi seteaza un numar
function setNumber(){
    if(checkInput(input)){
        if(GameMode == "RoboMode"){
            Player1.ans = input;
            Robo.ans = Robo.possib[Math.floor(Math.random()*Robo.possib.length)];
            console.log(Robo.ans);
            openTable();
        }
        else if(GameMode == "FriendMode"){
            if(Player1.ans == 0){
                Player1.ans = input;
                alert("Jucatorul 2 trebuie sa isi seteze un numar!");
            }
            else if(Player2.ans == 0){
                Player2.ans = input;
                openTable();
            }
        }
    }
    else{
        alert('Numarul introdus nu respecta regulile de joc!');
    }   
    clear();
}
// Setarea Modului de joc
function setMode(mode){
    GameMode = mode;
    if(GameMode == "FriendMode"){
        alert("Jucatorul 1 trebuie sa isi seteze un numar!");}
    document.getElementById("selectMode").style.display = 'none';
    document.getElementById('ReadNumber').style.display = 'block';
    console.log(GameMode); 
} 
// Adaugarea unei linii in tabel
function insertTable(Player, Opponent, idTable){
    const table = document.getElementById(idTable);
    const newRow = table.insertRow(-1); 
    const numberCell = newRow.insertCell(0);
    const noOfBulls = newRow.insertCell(1);
    const bullsCell = newRow.insertCell(2);
    const noOfCows = newRow.insertCell(3);
    const cowsCell = newRow.insertCell(4);
    Player.getResult(Opponent.ans);
    numberCell.innerHTML = Player.guess;
    numberCell.classList.add("NumberBox");
    noOfBulls.innerHTML = Player.bulls;
    noOfBulls.classList.add("NumberBox");
    noOfCows.innerHTML = Player.cows;
    noOfCows.classList.add("NumberBox");
    bullsCell.innerHTML = '<img src="Bull.png" alt="Bull" class="Bull">';
    cowsCell.innerHTML = '<img src="Cow.png" alt="Cow" class="Cow">';
}
// Functia de joc
function Try(){
    if(checkInput(input)){
        if(GameMode == "RoboMode"){
            Player1.guess = input;
            Robo.guess = Robo.possib[Math.floor(Math.random()*Robo.possib.length)];
            insertTable(Player1, Robo, "Player");
            insertTable(Robo, Player1, "Opponent");
            // Robo check
            let dif = 1;
            if(Difficulty == "Easy")
                dif = 0.1   ;
            else if(Difficulty == "Medium")
                dif = 0.3;
            console.log(Robo.possib.length)
            for(let i = 0; i < dif*Robo.possib.length; i++){
                if(!Robo.check(Robo.possib[i],Robo.guess)){
                    Robo.possib.splice(i,1);
                    i--;
                }
            }
        GameOver();
        }
        else if(GameMode == "FriendMode"){
            if(document.getElementById('Player').rows.length == document.getElementById('Opponent').rows.length){
                Player1.guess = input;
                insertTable(Player1, Player2, "Player");
                if(!over)   
                typeWriter("Rândul oponentului!","round");
            }
            else{
                Player2.guess = input;
                insertTable(Player2, Player1, "Opponent");  
                if(!over)
                typeWriter("Rândul meu!","round");
                GameOver();
            }
        }
    }
    else{
        alert('Numarul introdus nu respecta regulile de joc!');
    }
    clear();
    document.getElementById('i1').focus();
}
// TypeWriter
function typeWriter(text, id) {
    const container = document.getElementById(id);
    container.innerHTML = '';
    let i = 0;
    const typeWriter = setInterval(() => {
    container.innerHTML += text.charAt(i);
      i++;
      if (i > text.length - 1) {
        clearInterval(typeWriter);
      }
    }, 20);
}

var over = false;
function GameOver(){
    over = false;;
    if(GameMode == "RoboMode"){
        P2 = Robo;
    }
    else if(GameMode == "FriendMode"){
        P2 = Player2;
    }
    if(Player1.bulls == 4 && P2.bulls == 4){
        alert("Jocul s-a finalizat cu remiza!");
        over = true;
    }
    else if(Player1.bulls == 4){
        alert("Felicitari ai castigat jocul!");
        over = true;
    }
    else if(P2.bulls == 4){
        alert("Din pacate ai pierdut, de data aceasta oponentul tau a castigat jocul!");
        over = true;
    }
    if(over){
        document.getElementById('world').style.display = 'block';
                step();
                setTimeout(function(){document.getElementById('world').style.animation = 'none';}, 3000);
        document.getElementById('i1').style.display = 'none';
        document.getElementById('i2').style.display = 'none';
        document.getElementById('i3').style.display = 'none';
        document.getElementById('i4').style.display = 'none';
        document.getElementById('TryBtn').innerHTML = 'Acasa';
        document.getElementById('TryBtn').setAttribute('onclick', 'BackHome()');
    }
}
function BackHome(){
    window.location.href = 'home.html';
}



