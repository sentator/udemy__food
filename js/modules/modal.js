let modalTimerId = setTimeout(() => {
    showModal(modal);
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
            showModal(modal);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {showModal, hideModal, calcScrollWidth};