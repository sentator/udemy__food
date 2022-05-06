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

module.exports = animations;