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

$( "#btn1" ).click(function() {     
        var email = document.getElementById('email_register').value;
        var password = document.getElementById('password_register').value;
        var username = document.getElementById('username_register').value;
        //setDoc -> Firestore
        setDoc(doc(db, "Users", email),{
            username: username,
            password: password,
            score: 0});
        // CreateUser -> Auth
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        window.location.href = 'home.html';
        })
        .catch((error) => {
            alert(error.message);
        });
});

$( "#btn2" ).click(async function() {     
    var email = document.getElementById('email_login').value;
    var password = document.getElementById('password_login').value;
    //Din Firestore extragem datele userului
    class User {
        constructor (username, score) {
            this.username = username;
            this.score = score;
        }
    }
    
    const userConverter = {
        toFirestore: (user) => {
            return {
                username: user.username,
                score: user.score,
                password: user.password
                };
        },
        fromFirestore: (snapshot, options) => {
            const data = snapshot.data(options);
            return new User(data.username, data.score, data.password);
        }
    };
    const ref = doc(db, "Users", email).withConverter(userConverter);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
        const user_data = docSnap.data();
      } else {
        console.log("No such document!");
      }
      
    const user_data = docSnap.data();
    
    //singIn -> Auth
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        window.location.href = 'home.html';
    })
    .catch((error) => {
        alert(error.message);
    });

});


const loginForm = document.getElementById('Login');
const registerForm = document.getElementById('Register');
const switchToRegister = document.querySelector('#switch-to-register');
const switchToLogin = document.querySelector('#switch-to-login');

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