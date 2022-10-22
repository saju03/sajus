var errorName = document.getElementById('name')
var errorEmail = document.getElementById('email')
var errorPassword = document.getElementById('password')

function validateName() {
    const name = document.getElementById('Name').value;
    if (name == "") {
        errorName.innerHTML = 'Enter your Name'
        return false
    }
    if (!name.match(/^[a-zA-Z ]*$/)) {
        errorName.innerHTML = 'Number are not allowed'
        return false
    }
     if (name.match(/^[ ]*$/)) {
        errorName.innerHTML = 'enter a valid name'
        return false
    }
    errorName.innerHTML = null
    return true
}
function validEmail() {
    const email = document.getElementById('Email').value
    if (email == "") {
        errorEmail.innerHTML = "enter you email address"
        return false
    }
    if (!email.match(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/)) {
        errorEmail.innerHTML = 'enter a proper email address'
        return false
    }
    errorEmail.innerHTML = null
    return true
}
function validPassowrd() {
    const psd = document.getElementById('Password').value
    if (psd == "") {
        errorPassword.innerHTML = "enter a password"
        return false
    }
    if (psd.match(/^[ ]*$/)) {
        errorPassword.innerHTML = 'enter a valid password'
        return false
    }

    if (psd.length < 2) {
       
        errorPassword.innerHTML = "password should be more than 3 characters"
        return false
    }
    errorPassword.innerHTML = null
    return true
}


 

    function check(){
          let validatearray =[!validateName() , !validEmail() , !validPassowrd() ]

          return validatearray.every(validation)
         

    }



function validation() {
    if (!validateName() || !validEmail() || !validPassowrd() ) {
        return false
    }
    return true
}
