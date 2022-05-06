'use strict';
import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import animations from './modules/animations';

document.addEventListener('DOMContentLoaded', () => {

    tabs();
    modal('[data-modal]', '.modal');
    timer();
    cards();
    forms();
    slider();
    animations();
});