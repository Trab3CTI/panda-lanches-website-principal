function loginErrorModal(){
    let loginModal = document.querySelector('.modalArea')
    loginModal.style.display = 'flex'
    
    setInterval(() => {
      loginModal.style.display = 'none'
    }, 1000);
}
  
var usersDB = [
    {
        email: 'admin',
        password:'panda0'
    },
    {
        email: 'panda',
        password:'panda0'
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

