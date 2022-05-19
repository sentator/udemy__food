/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/animations.js":
/*!**********************************!*\
  !*** ./js/modules/animations.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function animations() {
    // Navigation to top
    const pepper = document.querySelector('.pepper > img');

    pepper.addEventListener('click', () => {
        animationInit(40, 1);
    });

    // Animation for navigation
    function animationInit(stepQuantity, intervalPeriod) {
        const destination = 0;
        let currentPositionY = document.documentElement.scrollTop;

        let animatedId = setTimeout(function animatedScroll() {
            if (destination <= currentPositionY) {
                window.scrollTo(0, currentPositionY);
                currentPositionY -= stepQuantity;
                animatedId = setTimeout(animatedScroll, intervalPeriod);
            } else {
                clearInterval(animatedId);
            }
        }, intervalPeriod);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (animations);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {
    // Menu card class
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.classes = 'menu__item';
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
    `;
            this.parent.append(element);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    // getResource('http://localhost:3000/menu')
    // .then(data => {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //     });
    // });

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");


function forms() {
    // Forms
    const forms = document.querySelectorAll('form');
    const messages = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо, мы с вами свяжемся!',
        failure: 'Что-то пошло не так'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = messages.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showModalThanks(messages.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showModalThanks(messages.failure);
                    statusMessage.remove();
                })
                .finally(() => form.reset());
        });
    }

    function showModalThanks(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)('.modal');

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.hideModal)('.modal');
        }, 4000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "calcScrollWidth": () => (/* binding */ calcScrollWidth),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "hideModal": () => (/* binding */ hideModal),
/* harmony export */   "showModal": () => (/* binding */ showModal)
/* harmony export */ });
let modalTimerId = setTimeout(() => {
    showModal('.modal');
}, 60000);

function showModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('hide');
    modal.classList.add('show');
    document.body.style.cssText = `overflow: hidden; padding-right: ${calcScrollWidth()}`;
    clearInterval(modalTimerId);
}

function hideModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.cssText = `overflow: visible; padding-right: 0px`;
}

function calcScrollWidth() {
    let div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflow = 'scroll';
    div.style.opacity = 0;
    div.style.visible = 'hidden';

    document.body.append(div);

    let scrollWidth = `${div.offsetWidth - div.clientWidth}px`;

    div.remove();

    return scrollWidth;
}

function modal(triggerSelector, modalSelector) {
    // Modal

    const modal = document.querySelector(modalSelector),
        callButtons = document.querySelectorAll(triggerSelector);

    callButtons.forEach(button => {
        button.addEventListener('click', () => {
            showModal(modalSelector);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.code == "Escape" && modal.classList.contains('show')) {
            hideModal(modalSelector);
        }
    });

    modal.addEventListener('click', (e) => {
        let target = e.target;

        if (target && target.matches('.modal__close') || target && target === modal) {
            hideModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            showModal(".modal");
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {
    // Slider
    const slider = document.querySelector('.offer__slider'),
        slides = slider.querySelectorAll('.offer__slide'),
        slideNumCurrent = slider.querySelector('#current'),
        slideNumTotal = slider.querySelector('#total'),
        prevBtn = slider.querySelector('.offer__slider-prev'),
        nextBtn = slider.querySelector('.offer__slider-next'),
        sliderWrapper = slider.querySelector('.offer__slider-wrapper'),
        sliderInner = slider.querySelector('.offer__slider-inner'),
        slideWidth = window.getComputedStyle(sliderWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    sliderInner.style.width = `${100 * slides.length}%`;
    sliderInner.style.display = 'flex';
    sliderInner.style.transition = 'all 0.5s';
    sliderWrapper.style.overflow = 'hidden';

    slides.forEach(slide => slide.style.width = slideWidth);

    if (slides.length < 10) {
        slideNumCurrent.textContent = `0${slideIndex}`;
        slideNumTotal.textContent = `0${slides.length}`;
    } else {
        slideNumCurrent.textContent = slideIndex;
        slideNumTotal.textContent = slides.length;
    }

    renderDots(slides.length);
    changeActiveDot(slideIndex - 1);

    nextBtn.addEventListener('click', () => {
        if (offset === +slideWidth.slice(0, (slideWidth.length - 2)) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +slideWidth.slice(0, (slideWidth.length - 2));
        }

        switchSlide('right');
    });

    prevBtn.addEventListener('click', () => {
        if (offset === 0) {
            offset = +slideWidth.slice(0, (slideWidth.length - 2)) * (slides.length - 1);
        } else {
            offset -= +slideWidth.slice(0, (slideWidth.length - 2));
        }

        switchSlide('left');
    });

    function switchSlide(direction) {
        if (direction === 'left') {
            if (slideIndex <= 1) {
                slideIndex = slides.length;
            } else {
                slideIndex--;
            }
        } else if (direction === 'right') {
            if (slideIndex >= slides.length) {
                slideIndex = 1;
            } else {
                slideIndex++;
            }
        }

        if (slides.length < 10) {
            slideNumCurrent.textContent = `0${slideIndex}`;
        } else {
            slideNumCurrent.textContent = slideIndex;
        }

        sliderInner.style.transform = `translateX(-${offset}px)`;
        changeActiveDot(slideIndex - 1);
    }

    function renderDots(quantity) {
        const dotsNavigation = document.createElement('ul');
        dotsNavigation.classList.add('carousel-indicators');

        sliderWrapper.append(dotsNavigation);

        for (let i = 0; i < quantity; i++) {
            dotsNavigation.insertAdjacentHTML('beforeend', `
                <li class="dot" data-slide="${i + 1}"></li>
            `);
        }
    }

    function changeActiveDot(activeDotNumber) {
        document.querySelectorAll('.dot').forEach(item => item.classList.remove('active'));
        document.querySelectorAll('.dot')[activeDotNumber].classList.add('active');
        slideIndex = activeDotNumber + 1;
    }

    document.querySelector('.carousel-indicators').addEventListener('click', (e) => {

        let activeSlideIndex = e.target.getAttribute('data-slide');

        if (e.target && e.target.matches('.dot')) {
            changeActiveDot(activeSlideIndex - 1);

            offset = +slideWidth.slice(0, (slideWidth.length - 2)) * (activeSlideIndex - 1);
            sliderInner.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                slideNumCurrent.textContent = `0${activeSlideIndex}`;
            } else {
                slideNumCurrent.textContent = activeSlideIndex;
            }
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {
    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.matches('.tabheader__item')) {

            tabs.forEach((item, i) => {
                if (target === item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {
    // Timer

    const deadline = '2022-05-07T11:34:00.000';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / (1000 * 60) % 60)),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            days,
            hours,
            minutes,
            seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.textContent = getZero(t.days);
            hours.textContent = getZero(t.hours);
            minutes.textContent = getZero(t.minutes);
            seconds.textContent = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    setClock('.timer', deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/animations */ "./js/modules/animations.js");









document.addEventListener('DOMContentLoaded', () => {

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_animations__WEBPACK_IMPORTED_MODULE_6__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map