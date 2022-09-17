import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/data.js';


const loginTemplate = (onSubmit) => html`
<section id="login">
<div class="container">
    <form @submit=${onSubmit} id="login-form">
        <h1>Login</h1>
        <p>Please enter your credentials.</p>
        <hr>

        <p>Username</p>
        <input placeholder="Enter Username" name="username" type="text">

        <p>Password</p>
        <input type="password" placeholder="Enter Password" name="password">
        <input type="submit" class="registerbtn" value="Login">
    </form>
    <div class="signin">
        <p>Dont have an account?
            <a href="/register">Sign up</a>.
        </p>
    </div>
</div>
</section>`;




export async function loginPage(ctx){

    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const form = new FormData(event.target);

        const userName = form.get('username').trim();
        const password = form.get('password').trim();

        if(userName == '' || password ==''){
            return alert('All field\'s are required!');
        }
        await login(userName,password);
        event.target.reset();
        ctx.setUserNav();
        ctx.page.redirect('/all-listing');
    }

}