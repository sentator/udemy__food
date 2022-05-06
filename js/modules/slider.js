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
    }

    document.querySelector('.carousel-indicators').addEventListener('click', (e) => {

        let activeSlideIndex = e.target.getAttribute('data-slide');

        if (e.target && e.target.matches('.dot')) {
            changeActiveDot(activeSlideIndex - 1);

            offset = +slideWidth.slice(0, (slideWidth.length - 2)) * (activeSlideIndex - 1);
            sliderInner.style.transform = `translateX(-${offset}px)`;
        }

        if (slides.length < 10) {
            slideNumCurrent.textContent = `0${activeSlideIndex}`;
        } else {
            slideNumCurrent.textContent = activeSlideIndex;
        }
    });
}

module.exports = slider;