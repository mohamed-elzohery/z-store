const form = document.getElementById('contact')
const nameField = document.getElementById('username');
const emailBox = document.getElementById('email');
const phone = document.getElementById('phone');
let errors = {};

form.addEventListener('submit', function(e){
    e.preventDefault();
    removeAllAlerts();//to reset all past errors
    validateEmail(); 
    validateLength(phone, 11);
    validateRequired(nameField);
    reportAllErrors();
})

form.addEventListener('reset', removeAllAlerts)

function validateEmail(){
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let isValidEmail = emailBox.value.match(pattern);
    if(!validateRequired(emailBox)){
        return;
    }

    if(!isValidEmail){
        addInvalidateStyled(emailBox);
        throwError(emailBox, " is not valid");
        return;
    }
        addValidateStyles(emailBox)
        removeError(emailBox);
}


//Handlers
function validateRequired(input){
    if(input.value === ""){
        addInvalidateStyled(input)
        throwError(input, 'is required')
        return false;
    }
        addValidateStyles(input)
        removeError(input)
        return true;
}

function validateLength(input, length){

    if(!validateRequired(input)){
        return;
    }

    if(input.value.length <= length){
        addInvalidateStyled(input)
        throwError(input, `${length} chars at least`);
        return;
    }
        addValidateStyles(input)
        removeError(input)
}

function addValidateStyles(input){
    input.classList.remove('invalid')
    input.classList.add('valid')
}

function throwError(input, errMsg){
    errors[input.getAttribute("name")] = `${input.getAttribute("name")} ${errMsg}.`
}

function removeError(input){
    delete errors[input.getAttribute("name")];
}

function addInvalidateStyled(input){
    input.classList.remove('valid')
    input.classList.add('invalid')
}

function reportAllErrors(){
    Object.keys( errors).forEach((key) => {
        let labelField = document.querySelector(`[for='${key}']`);
        let alertElement = document.createElement('p');
        alertElement.innerText = errors[key];
        alertElement.classList.add('form__alert');
        labelField.parentElement.appendChild(alertElement);
    })
}


function removeAllAlerts(){
    const allAlerts = document.querySelectorAll(".form__alert")
    allAlerts.forEach(ele => ele.remove());
}
