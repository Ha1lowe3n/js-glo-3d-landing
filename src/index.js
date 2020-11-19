'use strict';

import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';


import btnScroll from './modules/btnScroll';
import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import addDots from './modules/addDots';
import slider from './modules/slider';
import switchImg from './modules/switchImg';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

// btn to scroll
btnScroll();
// Timer
countTimer();
// Menu
toggleMenu();
//POPUP Window
togglePopup();
//Tabs
tabs();
// add dots
addDots();
// Slider
slider();
// switch imgs
switchImg();
// calc
calc();
// send-ajax-form
sendForm();