import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyDVU5vxH8NVaH7MTrHAC_lENGFbc1DH0o0",
    authDomain: "project-bulls-and-cows.firebaseapp.com",
    databaseURL: "https://project-bulls-and-cows-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "project-bulls-and-cows",
    storageBucket: "project-bulls-and-cows.appspot.com",
    messagingSenderId: "241772917477",
    appId: "1:241772917477:web:2ecb11f8816bc8912f5a0c",
    measurementId: "G-N056QX9MEJ"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
function StoreDate(email)
{
    localStorage.setItem("email", email);
}

try{
$( "#btn1" ).click(function() {     
        email = document.getElementById('email_register').value;
        var password = document.getElementById('password_register').value;
        var username = document.getElementById('username_register').value;
        //setDoc -> Firestore
        setDoc(doc(db, "Users", email),{
            username: username,
            password: password,
            usor: 0,
            mediu: 0,
            greu: 0});
        // CreateUser -> Auth
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        StoreDate(email);
        window.location.href = 'home.html';
        
        })
        .catch((error) => {
            alert(error.message);
        });
});
}
catch(err){
    console.log(err);
}
class User {
    constructor (username, usor, mediu, greu, password, email) {
        this.username = username;
        this.usor = usor;
        this.mediu = mediu;
        this.greu = greu;
        this.password = password;
        this.email = email;
    }
}
const userConverter = {
    toFirestore: (user) => {
        return {
            username: user.username,
            usor: user.usor,
            mediu: user.mediu,
            greu: user.greu,
            password: user.password,
            email: user.email
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new User(data.username, data.usor, data.mediu, data.greu ,data.password, data.email);
    }
};
var user_data,ref;
var email;
try{
$( "#btn2" ).click(async function() {     
    email = document.getElementById('email_login').value;
    var password = document.getElementById('password_login').value;
    StoreDate(email);
    //singIn -> Auth
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        window.location.href = 'home.html';
    })
    .catch((error) => {
        alert(error.message);
    });

});
}
catch(err){
    console.log(err);
}

const loginForm = document.getElementById('Login');
const registerForm = document.getElementById('Register');
const switchToRegister = document.querySelector('#switch-to-register');
const switchToLogin = document.querySelector('#switch-to-login');
try{
switchToRegister.addEventListener('click', (event) => {
    event.preventDefault();
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
});

switchToLogin.addEventListener('click', (event) => {
    event.preventDefault();
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
});
}
catch(err){
    console.log(err);
}

export {db,collection,getDocs,setDoc, email};


// GamePlay 
async function UpdateScore()
{
    //Extract data from local storage
    
    email = localStorage.getItem("email");
    ref = doc(db, "Users", email).withConverter(userConverter);
    const docSnap = await getDoc(ref);
    user_data = docSnap.data();
    console.log(user_data.username);
    if(Difficulty == "Easy")
    {
        user_data.usor++;
    }
    else if(Difficulty == "Medium")
    {
        user_data.mediu++;
    }
    else if(Difficulty == "Hard")
    {
        user_data.greu++;
    }
    //Update user data in firestore
    setDoc(doc(db, "Users", email),{
        username: user_data.username,
        password: user_data.password,
        usor: user_data.usor,
        mediu: user_data.mediu,
        greu: user_data.greu
    });
}
var P2;
var over = false;
function GameOver(){
    over = false;
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
        if(GameMode == "RoboMode")
            UpdateScore();

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

try{
    document.getElementById('TryBtn').addEventListener('click', function(){
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
);
}
catch(err){
    console.log(err);
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