//Category Slider
//The purpose of this slider is to keep the category options neat and responsive to any number of categories
//Inspired from HP site

//Category Slider Controllers
const leftBtnCtgr = document.querySelector('.category__btn--left');
const rightBtnCtgr = document.querySelector('.category__btn--right');
const ctgrSlider = document.querySelector('.category__slider');

//Show/Hide controllers on category slider on start
function showControllers(){
    if(ctgrSlider.scrollWidth <= ctgrSlider.clientWidth){
        leftBtnCtgr.classList.add('hidden');
        rightBtnCtgr.classList.add('hidden');
    }else{
        leftBtnCtgr.classList.remove('hidden');
        rightBtnCtgr.classList.remove('hidden');
        toggleSlider();
    }
}

//Disable controllers on category slider
function toggleSlider(){
    if(ctgrSlider.scrollLeft == 0){
        leftBtnCtgr.classList.add('disabled');
        rightBtnCtgr.classList.remove('disabled');
        return;
    }
    else if((ctgrSlider.scrollWidth - ctgrSlider.clientWidth == Math.ceil(ctgrSlider.scrollLeft)) || (ctgrSlider.scrollWidth - ctgrSlider.clientWidth == Math.floor(ctgrSlider.scrollLeft))){
        leftBtnCtgr.classList.remove('disabled');
        rightBtnCtgr.classList.add('disabled');
        return;
    }
    leftBtnCtgr.classList.remove('disabled');
    rightBtnCtgr.classList.remove('disabled');
}

//Category Slider Functionality
function scrollToRight(){
    ctgrSlider.scrollBy(30,0);
}

function scrollToLeft(){
    ctgrSlider.scrollBy(-30,0);
}

//Apply functionality to buttons click and window resizing
showControllers()
window.addEventListener('resize', showControllers);
leftBtnCtgr.addEventListener('click', scrollToLeft);
rightBtnCtgr.addEventListener('click', scrollToRight);

//If the user tried to scroll either by buttons or by mouse
ctgrSlider.addEventListener('scroll', toggleSlider);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//category selection buttons
const allCtgrBtn = document.getElementsByClassName('category__btn');
const allCards = document.getElementsByClassName('card');
allBtn = document.querySelector('[category="all"]');

[...allCtgrBtn].forEach(btn => btn.addEventListener('click', function(e){
    const ctgr = e.target.getAttribute("category");
    console.log(ctgr)
    const selectedCards = document.querySelectorAll(`.card[category=${ctgr}]`);

    if(ctgr === "all"){
        showAllCards();
        return;
    }

    hideAllCards();
    e.target.classList.add('category__btn--selected');
    selectedCards.forEach(card => card.classList.remove('hidden'));
}))

function showAllCards(){
    [...allCards].forEach(card => card.classList.remove('hidden'));
    [...allCtgrBtn].forEach(btn => btn.classList.remove('category__btn--selected'));
    allBtn.classList.add('category__btn--selected');
}

function hideAllCards(){
    [...allCards].forEach(card => card.classList.add('hidden'));
    [...allCtgrBtn].forEach(btn => btn.classList.remove('category__btn--selected'));
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Handling cart and favs actions
const cartCounter = document.querySelector('.navlink__counter--cart');
const favCounter = document.querySelector('.navlink__counter--fav');
const allCartBtns = document.getElementsByClassName('card__btn-cart'); 
const allLoveBtns = document.getElementsByClassName('card__love');  

[...allLoveBtns].forEach(btn => {
    btn.addEventListener('click', function(){
        if(btn.getAttribute('status') === 'unloved'){
            btn.setAttribute('status', 'loved');
            favCounter.innerHTML++;
            btn.firstElementChild.firstElementChild.setAttribute('href', '/imgs/SVG/sprite.svg#icon-heart');
            return;
        }

        btn.setAttribute('status', 'unloved');
        favCounter.innerHTML--;
        btn.firstElementChild.firstElementChild.setAttribute('href', '/imgs/SVG/sprite.svg#icon-heart-outlined');
        
    })
});

[...allCartBtns].forEach(btn => {
    btn.addEventListener('click', () => {

        if(btn.getAttribute('role') === 'add'){
            cartCounter.innerHTML++;  
            btn.nextElementSibling.classList.remove("hidden");
            btn.classList.add('hidden');
            return;
        }

        cartCounter.innerHTML--;
        btn.previousElementSibling.classList.remove('hidden');
        btn.classList.add('hidden');
        return;
    })
})


