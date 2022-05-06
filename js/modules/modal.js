function modal() {
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
}

module.exports = modal;