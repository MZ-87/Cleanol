"use strict";

// // Блок 8 этапов строительства (галерея карточек)
const mediaQueryMobile = window.matchMedia('(max-width: 424px)');
if (mediaQueryMobile.matches) {
    document.querySelector('.why-robot-cleaner__photo_first').src = '../images/why-robot/parking-lot-mobile.png';
    document.querySelector('.why-robot-cleaner__photo_second').src = '../images/why-robot/land-mobile.png';
    document.querySelector('.why-robot-cleaner__photo_third').src = '../images/why-robot/money-mobile.png';
}

new Swiper('.stages__slider', {
    navigation: {
        nextEl: '.stages__button_next',
        prevEl: '.stages__button_prev'
    },
    slidesPerView: 4,
    spaceBetween: 30,
    breakpoints: {
        200: {
            slidesPerView: 1.3,
            spaceBetweenSlides: 5,
        },
        768: {
            slidesPerView: 1.8,
            spaceBetweenSlides: 30,
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 15,
        }
    }
});

// // Конец Блок 8 этапов строительства

//banner slider
new Swiper('.banner-slider-container', {
    navigation: {
        nextEl: '.banner__nav-arrow_right',
        prevEl: '.banner__nav-arrow_left'
    },
    spaceBetween: 10,
})

const bannerMobile = window.matchMedia('(max-width: 768px)');

function changeImage(e) {
    if (e.matches) {
        /* the viewport is 768 pixels wide or less */
        document.querySelector('.banner__slide_1').src = '../images/banner/tab_slide_1.png';
        document.querySelector('.banner__slide_2').src = '../images/banner/tab_slide_2.png';
        document.querySelector('.banner__slide_3').src = '../images/banner/tab_slide_3.png';
        document.querySelector('.banner__nav-arrow_left').src = '../images/banner/arrow_left_white.svg';
        document.querySelector('.banner__nav-arrow_right').src = '../images/banner/arrow_right_white.svg';
    } else {
        /* the viewport is more than 600 pixels wide */
        document.querySelector('.banner__slide_1').src = '../images/banner/slider_1.png';
        document.querySelector('.banner__slide_2').src = '../images/banner/slider_2.png';
        document.querySelector('.banner__slide_3').src = '../images/banner/slider_3.png';
        document.querySelector('.banner__nav-arrow_left').src = '../images/banner/banner_arrow_left.svg';
        document.querySelector('.banner__nav-arrow_right').src = '../images/banner/banner_arrow_right.svg';
    }
}

bannerMobile.addEventListener('change', changeImage);

//vertical slider
const verticalSlider = new Swiper(".vertical-slider", {
    direction: "vertical",
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        bulletElement: 'div',
    },
});

const slider = document.querySelector('.vertical-slider').swiper;
slider.on('slideChange', () => {
    toggle();

    let index = slider.activeIndex;
    let numberItem = document.getElementById(`n${index}`);
    let lineItem = document.getElementById(`l${index}`);
    numberItem.classList.add('numbers-wrapper__item_active');
    lineItem.classList.add('lines-wrapper__item_active');
})

const toggle = () => {
    const numberItems = document.querySelectorAll('.numbers-wrapper__item');
    const lineItems = document.querySelectorAll('.lines-wrapper__item')

    for (let numberItem of numberItems) {
        if (numberItem.classList.contains('numbers-wrapper__item_active')) numberItem.classList.remove('numbers-wrapper__item_active')
    }

    for (let lineItem of lineItems) {
        if (lineItem.classList.contains('lines-wrapper__item_active')) lineItem.classList.remove('lines-wrapper__item_active')
    }
}

const smoothScroll = () => {
    const links = document.querySelectorAll('.menu-link')

    links.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault()
            const section = document.querySelector(link.getAttribute('href'))

            if (section) {
                seamless.scrollIntoView(section, {
                    behavior: "smooth",
                    block: "start",
                    inline: "center",
                });
            }
        })
    })
}

smoothScroll()

const formValidate = () => {
    const form = document.querySelector('#form')
    form.addEventListener('submit', (event) => {
        event.preventDefault()
    })
}

formValidate()

//popup
const openPopupButtons = document.querySelectorAll('.popup__open');
const closePopupButtons = document.querySelectorAll('.popup__close');

for (let openPopupButton of openPopupButtons) {
    openPopupButton.addEventListener('click', (event) => {
        const popupName = openPopupButton.getAttribute('id').replace('#', '');
        const currentPopup = document.getElementById(popupName);
        popupOpen(currentPopup);
        event.preventDefault;
    })
}

for (let closePopupButton of closePopupButtons) {
    closePopupButton.addEventListener('click', (event) => {
        popupClose(event.target.closest('.popup'));
        event.preventDefault;
    })
}

const popupOpen = (currentPopup) => {
    if (currentPopup) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        }
    }

    currentPopup.classList.add('open');
    currentPopup.addEventListener('click', (event) => {
        if (!event.target.closest('.popup-form')) {
            popupClose(event.target.closest('.popup'));
        }
    })
}
const popupClose = (popupActive) => {
    popupActive.classList.remove('open');
}

document.querySelector('#feedback').addEventListener('submit', (e) => {
    e.preventDefault();

    fetch('https://httpbin.org/post', {
            method: 'POST',
            body: new FormData(feedback)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => console.log(err));
})