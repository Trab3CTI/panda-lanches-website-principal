function loginErrorModal(){
    let loginModal = document.querySelector('.modalArea')
    loginModal.style.opacity = '1'
    loginModal.style.pointerEvents = 'visible'
    
    setInterval(() => {
        loginModal.style.opacity = '0'
        loginModal.style.pointerEvents = 'none'
        loginModal.style.textAlign = 'center'
    }, 1500);
}
  
var usersDB = [
    {
        email: 'admin',
        password:'admin'
    },
    {
        email: 'panda',
        password:'panda'
    }
]
 
//Logar Usuario
function loginUser(){
    let emailInput = document.querySelector('.emailInput').value
    let passInput = document.querySelector('.passInput').value
  
    for (let i = 0; i < usersDB.length ; i++) {
        if(emailInput === usersDB[i].email && passInput === usersDB[i].password){
            window.location.href = 'http://127.0.0.1:5500/index.html#'
        
        } else{
            loginErrorModal()
        }
    }

    localStorage.setItem('username', emailInput)
    let recorded = localStorage.getItem('username')
    document.querySelector('.userDetails h1').innerHTML += `${recorded}`
}

function registerUser(){
    let registerEmail = document.querySelector('.cadEmail').value
    let registerPassword = document.querySelector('.cadPass').value
        
    var newUser = {
        email: registerEmail,
        password: registerPassword
    }
  
    alert('Usuario Cadastrado')
    registerEmail = ''
    registerPassword = ''
    usersDB.push(newUser)
}

function setUser(){
    let recorded = localStorage.getItem('username')
    document.querySelector('.userDetails h1').innerHTML += recorded
}

function getUserLocation(){
    if (window.navigator.geolocation) {
        window.navigator.geolocation
        .getCurrentPosition(console.log, console.log);
    } 
}

