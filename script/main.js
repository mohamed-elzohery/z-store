//Navigation btn to scroll to the top of the page
const upBtn = document.querySelector('.navbtn');

upBtn.addEventListener('click', () => {
    document.body.scrollIntoView({behavior: "smooth"});
})
