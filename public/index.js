// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
  import { GoogleAuthProvider, getAuth, signInWithPopup, sendEmailVerification, GithubAuthProvider, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDjMpUcmVqQ-ov4N3Cq0EOqBktyrNNqpU8",
    authDomain: "fir-auth-x-90dfe.firebaseapp.com",
    projectId: "fir-auth-x-90dfe",
    storageBucket: "fir-auth-x-90dfe.firebasestorage.app",
    messagingSenderId: "176983286622",
    appId: "1:176983286622:web:9be015e81ef095f5b0e5cf"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const githubProvider = new GithubAuthProvider();


  function signUp(e) {
    e.preventDefault()
    const firstName = document.getElementById('first-name').value
    const lastName = document.getElementById('last-name').value
    const mail = document.getElementById('email').value
    const password = document.getElementById('password').value
    const userObject = {firstName, lastName, mail, password}
    const errorMsg = document.getElementById('error-message')

    if(firstName === '' || lastName === '' || mail === '' || password === ''){
      errorMsg.style.display = 'block'
    }else{
      errorMsg.style.display = 'none'
      console.log(userObject);

      createUserWithEmailAndPassword(auth, mail, password)
      .then((result) =>{
        const user = result.user
        console.log(user); 

      sendEmailVerification(auth.currentUser)
      .then((response)=>{
      console.log(`Email sent successfully`);
      })
      .catch((err)=>{
      console.log(`Error sending mail`, err);
      })

      user ? window.location.href = 'signin.html' : window.location.href = 'index.html'

      })
      .catch((error)=>{
        console.log(error.code);
        console.log(error.message);

        if(error.code === 'auth/password-does-not-meet-requirements') {
          alert('Password must have uppercase, lowercase, numeric and special characters')
        }

        if(error.code === 'auth/email-already-in-use'){
            alert('Account already exists')
        }
      })
    }

    
  }
  window.signUp = signUp


function signGoog() {
  // alert('yes i am working')
  signInWithPopup(auth, provider)
  .then((result)=>{
    const user = result.user
    console.log(user);
    sendEmailVerification(auth.currentUser)
    .then((response)=>{
      console.log(`Email sent successfully`);
    })
    .catch((err)=>{
      console.log(`Error sending mail`, err);
    })
    user ? window.location.href = 'dashboard.html' : window.location.href = 'index.html'
  })
  .catch((err)=>{
    console.log(`Error finding user`, err);
  })
}
window.signGoog = signGoog


function signGit(){
  // alert('yes i am working')
  signInWithPopup(auth, githubProvider)
  .then((result)=>{
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    const user = result.user
    console.log(user);
    sendEmailVerification(auth.currentUser)
    .then((response)=>{
      console.log(`Email sent successfully`);
    })
    .catch((err)=>{
      console.log(`Error sending mail`, err);
    })
    user ? window.location.href = 'dashboard.html' : window.location.href = 'index.html'
  })
  .catch((err)=>{
    console.log(err);
  })
}
window.signGit = signGit

