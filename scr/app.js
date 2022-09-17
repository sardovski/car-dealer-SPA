import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import { logout } from './api/data.js';

import { carsPage } from './views/allCars.js';
import { detailsPage } from './views/details.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/registration.js';
import { editPage } from './views/edit.js';
import {createPage} from './views/create.js';
import { myCarsPage } from './views/myCars.js';

const main = document.getElementById('site-content');
const nav = document.querySelector('nav');
document.getElementById('logoutBtn').addEventListener('click', logoutUser);

page('/', midWare, homePage);
page('/all-listing', midWare, carsPage);
page('/login', midWare, loginPage);
page('/register', midWare, registerPage);
page('/details/:id', midWare, detailsPage);
page('/edit/:id', midWare, editPage);
page('/create-page',midWare,createPage);
page('/my-listing',midWare,myCarsPage);

//page start
setUserNav();
page.start();

function midWare(ctx, next) {
    console.log(ctx);
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = () => setUserNav();
    next();
}

function setUserNav() {
    const user = sessionStorage.getItem('userName');

    if (user !== null) {
        nav.querySelector('#profile').style.display = 'block';
        nav.querySelector('#guest').style.display = 'none';
        nav.querySelector('nav #welcome-user').textContent = `Welcome ${user}`;

    } else {
        nav.querySelector('#profile').style.display = 'none';
        nav.querySelector('#guest').style.display = 'block';


    }
}

async function logoutUser() {
    const token = sessionStorage.getItem('authToken');
    await logout(token);
    setUserNav();
    page.redirect('/');

}