'use strict';
document.addEventListener('DOMContentLoaded', () => {

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

});

// Modal

const modal = document.querySelector('.modal'),
    callButtons = document.querySelectorAll('[data-modal]');

let modalTimerId = setTimeout(() => {
    showModal(modal);
}, 60000);


function showModal(modalElement) {
    modalElement.classList.remove('hide');
    modalElement.classList.add('show');
    document.body.style.cssText = `overflow: hidden; padding-right: ${calcScrollWidth()}`;
    clearInterval(modalTimerId);
}

function hideModal(modalElement) {
    modalElement.classList.remove('show');
    modalElement.classList.add('hide');
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

callButtons.forEach(button => {
    button.addEventListener('click', () => {
        showModal(modal);
    });
});

document.addEventListener('keydown', (e) => {
    if (e.code == "Escape" && modal.classList.contains('show')) {
        hideModal(modal);
    }
});

modal.addEventListener('click', (e) => {
    let target = e.target;

    if (target && target.matches('.modal__close') || target && target === modal) {
        hideModal(modal);
    }
});

function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
        showModal(modal);
        window.removeEventListener('scroll', showModalByScroll);
    }
}

window.addEventListener('scroll', showModalByScroll);

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

new MenuCard(
    'img/tabs/vegy.jpg',
    'vagy',
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    '.menu__field>.container'
).render();

new MenuCard(
    "img/tabs/elite.jpg",
    'elite',
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    14,
    '.menu__field>.container',
    'menu__item'
).render();

new MenuCard(
    'img/tabs/post.jpg',
    'post',
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    21,
    '.menu__field>.container',
    'menu__item'
).render();