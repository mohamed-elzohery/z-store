const slidingInterval = 3000;
let isMoving;
let direction;
const slidingAuto = setInterval(swingLeft, slidingInterval);
const photosArray = document.getElementsByClassName('slider__img-container');
const photoContainer = document.querySelector('.slider__slide-container');
const rightBtn = document.querySelector('.controls__btn--right');
const leftBtn = document.querySelector('.controls__btn--left');
const playBtn = document.querySelector('.controls__btn--middle');

//Cotrollers Handler
rightBtn.addEventListener('click', swingLeft)
leftBtn.addEventListener('click', swingRight)

//Helper Functions
function applyAnimation(){
    if(direction == 'right'){
        photosArray[photosArray.length-1].classList.add('animateRightOut');
        photosArray[photosArray.length-2].classList.add('animateRightIn');
        return;
    }
    if(direction == 'left'){
        photosArray[photosArray.length-1].classList.add('animateLeftOut');
        photosArray[0].classList.add('animateLeftIn');
        return;
    }
}

function clearAnimation(){
    if(direction == 'right'){
        photosArray[0].classList.remove('animateRightOut');
        photosArray[photosArray.length-1].classList.remove('animateRightIn');
        isMoving = false;
        return;
    }

    if(direction == 'left'){
        photosArray[photosArray.length-1].classList.remove('animateLeftIn');
        photosArray[photosArray.length-2].classList.remove('animateLeftOut');
        isMoving = false;
        return;
    }
}

function orderList(){
    if(direction == 'right'){
        photoContainer.insertBefore(photosArray[photosArray.length-1], photosArray[0]);
        return;
    }if(direction == 'left'){
        photoContainer.appendChild(photosArray[0]);
        return;
    }   
}

function swingLeft(){
    if(isMoving){
        return;
    }
    isMoving = true;//Start moving
    direction = 'left';
    applyAnimation();
    setTimeout(orderList, 1000);
    setTimeout(clearAnimation, 1000);
}

function swingRight(){
    if(isMoving){
        return;
    }
    isMoving = true;//Start moving
    direction = 'right';
    applyAnimation();
    setTimeout(orderList, 1000);
    setTimeout(clearAnimation, 1000);
}