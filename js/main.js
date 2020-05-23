// check on color local storage 
let mainColors = localStorage.getItem('myColors');

if (mainColors !== null) {
    document.documentElement.style.setProperty('--main-color', mainColors)
    document.querySelectorAll('.item').forEach(element => {
        element.classList.remove('fa-check-circle');
        element.classList.add('fa-circle');
        if (element.dataset.color === mainColors) {
            element.classList.add('fa-check-circle');
            element.classList.toggle('fa-circle');
        }
    });
}


// star random bg 
let landingPage =  document.querySelector('.landing-page');

// create empty erray
let imagesArray = [];

// loop for push the array
for(i=1; i<=5; i++) {
    let imgSrc = '0' + i + '.jpg';
    imagesArray.push(imgSrc);
};

// star random bg
let randomBackground = true;
let backgroundInterval;

//check on bg random local storage
let bgLocalStorage = localStorage.getItem('myBackground');
if (bgLocalStorage !== null) {
    // remove class active on all span 
    document.querySelectorAll('.random-bg span').forEach(element => {
        element.classList.remove('active');
    });
    if (bgLocalStorage === 'true') {
        randomBackground = true;
        document.querySelector('.random-bg .yes').classList.add('active');
    } else {
        randomBackground = false;
        document.querySelector('.random-bg .no').classList.add('active');
    }
}

function bgOption() {
    if (randomBackground === true) {
        backgroundInterval = setInterval(() => {
            // get random number
            let randomInt = Math.floor(Math.random() * imagesArray.length);
            // change the background image
            landingPage.style.backgroundImage = `url('images/header/${imagesArray[randomInt]}')`;
        }, 4000);
    }
}
bgOption();
// end random bg 

// =======star box setting========
let settingIcon = document.querySelector('.setting'),
    settingBox = document.querySelector('.setting-box'),
    settingContainer = document.querySelector('.setting-box .container-box'),
    listItem = document.querySelectorAll('.list-item .item');

//- open and closs setting box

// remove class open to setting box 
settingIcon.onclick = () => {
    settingBox.classList.toggle('open');
}
settingBox.onclick = (e) => {
    e.target.classList.toggle('open');
    settingContainer.onclick = (e) => {
        e.stopPropagation();
    }
}
// =======end box setting========

// ============star box of search==============
let iconSearch = document.querySelector('.search');
let boxSearch = document.querySelector('.box-search');
let iconCloss = document.querySelector('.box-search .top-box .closs');

document.addEventListener('click', (e) => { 
    if (e.target !== iconSearch && e.target !== boxSearch) {
        if (boxSearch.classList.contains('active')) {
            boxSearch.classList.toggle('active');
        }
    }
});

iconSearch.onclick = () => {
    boxSearch.classList.toggle('active');

}
iconCloss.onclick = () => {
    boxSearch.classList.toggle('active');

}
boxSearch.onclick = (e) => {
    e.stopPropagation();

}
// ============star box of search==============

// loop in item
listItem.forEach(item => {
    item.addEventListener('click', (e) => {
        let dataColor = e.target.dataset.color;
        // set the proprite css
        document.documentElement.style.setProperty('--main-color', dataColor);
        // loop in the item becuse remove there classs in all item
        e.target.parentElement.querySelectorAll('.item').forEach(element => {
            element.classList.remove('fa-check-circle');
            element.classList.add('fa-circle');

        });
        // change icon 
        e.target.classList.add('fa-check-circle');
        e.target.classList.toggle('fa-circle');

        // set the local storage 
        localStorage.setItem('myColors', dataColor);

    });
});

// random bg 
let randomBg = document.querySelectorAll('.random-bg span');
randomBg.forEach(span => {
    span.addEventListener('click', (e) => {
        hundleActive(e);
        // check random bg is true or false
        if (e.target.dataset.bg === "yes") {
            randomBackground = true;
            bgOption();
            localStorage.setItem('myBackground', true);
        } else {
            randomBackground = false;
            clearInterval(backgroundInterval); //clear the interval for random bg
            landingPage.style.backgroundImage = 'url(images/header/01.jpg)';
            localStorage.setItem('myBackground', false);
        }
    });
});

// star function handlw active class
function hundleActive(element) {
    element.target.parentElement.querySelectorAll('.active').forEach(el => {
        el.classList.remove('active');
    });
    element.target.classList.add('active');
}
// end function hundle active class
// end box setting







window.onscroll = function () {
    //star change style of nav on scroll
    const nav = document.querySelector('.navbar');
    if(this.scrollY > 71) {
        nav.classList.add('scroll');
    } else {
        nav.classList.remove('scroll');
    }
    //end change style of nav on scroll


    // star the animate section skills
    let ourSkills = document.querySelector(".our-skills");

    let skillsOffsetTop = ourSkills.offsetTop;

    let skillsoffsetHeight = ourSkills.offsetHeight;

    let windowInnerHeight = window.innerHeight;

    let windowPageYOffset = window.pageYOffset;

    if (windowPageYOffset > (skillsOffsetTop + skillsoffsetHeight) - windowInnerHeight) {
        let skillProgress = document.querySelectorAll('.card');
        skillProgress.forEach(car => {
            car.classList.add('show-progress');
        });
        
    }
    // end the animate section skills
};

// star popup 
let imagesBox = document.querySelectorAll('.images-box img');
let popupOverlay = document.querySelector('.popup-overlay');
let innerBox = document.querySelector('.popup-overlay .inner-box');
let clossPopup = document.querySelector('.popup-overlay .closs');
let imageInnerBox = document.querySelector('.popup-overlay .inner-box img');
let prevBtn = document.querySelector('.popup-overlay .left');
let nextBtn = document.querySelector('.popup-overlay .right');
imagesBox.forEach(img => {
    img.addEventListener('click', (e) => {

        popupOverlay.classList.add('open');

        imageInnerBox.src = img.src;

        // class popup on click to this popup
        popupOverlay.onclick = () => {
            popupOverlay.classList.toggle('open');
        }
        // class popup on click to icon times
        clossPopup.onclick = () => {
            popupOverlay.classList.toggle('open');
        }
        // stop this event on the box
        innerBox.onclick = (e) => {
            e.stopPropagation();
        }

    });
});
let index = 0,
imgArr = []; //create array
// loop for images array
for (let i = 0; i < imagesBox.length; i++) {
	imgArr.push(imagesBox[i]);
	// get index for this array onclick
	imagesBox[i].addEventListener('click', (e) => {
	    index = imgArr.indexOf(e.target);   
	});
}
// function select the next image
function nextImage() {
    index++;
    if (index == imagesBox.length) {
        index = 0;
    }    
    imageInnerBox.src =  imagesBox[index].src ;
}
// trigger the function
nextBtn.onclick = () => {
    nextImage();
}
// function select the prev image
function prevImage(){
    index--;
    if (index < 0) {
        index = imagesBox.length - 1;
    }
    imageInnerBox.src =  imagesBox[index].src ;
}
// trigger the function
prevBtn.onclick = () => {
    prevImage();
    
}
// event on click to keyboard
document.addEventListener("keydown", function (e) {
    if (e.keyCode === 27) { // btn esc
        popupOverlay.classList.toggle('open');
    }
    if (e.keyCode === 37){ // arraw right
        
        prevImage();
    }
    if (e.keyCode === 39) // arraw right
    {
        nextImage();
    }
});
// end popup 


// star the move to section
let allBullets = document.querySelectorAll('.nav-bullets .bullets');
let allLinks = document.querySelectorAll('.navigation li .link');
// function loop to the elment and scroll the section target
function theLoop(elments) {
    elments.forEach(el => {
        el.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(e.target.dataset.class).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
}
// trigger the function 
theLoop(allBullets);
theLoop(allLinks);
// end the move to section


// star random bullets 
let randomBullets = document.querySelectorAll('.random-bullets span');
let bulletsContainer = document.querySelector('.nav-bullets');

let checkOnBullets = localStorage.getItem('Bullets');
if (checkOnBullets !== null) {

    randomBullets.forEach(span => {
        span.classList.remove('active');
    });

    if (checkOnBullets === "block") {
        bulletsContainer.style.display = "block";
        document.querySelector('.random-bullets span.yes').classList.add('active');
    } else {
        bulletsContainer.style.display = "none";
        document.querySelector('.random-bullets span.no').classList.add('active');
    }
}
randomBullets.forEach(span => {
    span.addEventListener('click', (e) => {
        hundleActive(e);
        if (e.target.dataset.show === "no") {
            bulletsContainer.style.display = "none";
            localStorage.setItem('Bullets', "none");
        } else {
            bulletsContainer.style.display = "block";
            localStorage.setItem('Bullets', "block");
        }
    });
});
// end random bullets 

// reset localstorage
document.querySelector('.reset-option').onclick = () => {
    localStorage.clear();
    window.location.reload();
}
// reset localstorage


// toggle menu 
let toggleMenu = document.querySelector('.toggle-menu');
let navigation = document.querySelector('.navigation');
let navbar = document.querySelector('.navbar');

toggleMenu.onclick = () => {
    navigation.classList.toggle('open');
    navbar.classList.toggle('open');
    document.querySelector('body').classList.toggle('open');
}