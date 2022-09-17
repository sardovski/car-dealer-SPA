import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';

const registerTemplate =(onSubmit)=>html`
<section id="register">
<div class="container">
    <form @submit=${onSubmit} id="register-form">
        <h1>Register</h1>
        <p>Please fill in this form to create an account.</p>
        <hr>

        <p>Username</p>
        <input type="text" placeholder="Enter Username" name="username">

        <p>Password</p>
        <input type="password" placeholder="Enter Password" name="password">

        <p>Repeat Password</p>
        <input type="password" placeholder="Repeat Password" name="repeatPass">
        <hr>

        <input type="submit" class="registerbtn" value="Register">
    </form>
    <div class="signin">
        <p>Already have an account?
            <a href="/login">Sign in</a>.
        </p>
    </div>
</div>
</section>`;

export async function registerPage(ctx){

    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const form = new FormData(event.target);

        const userName = form.get('username').trim();
        const password = form.get('password').trim();
        const repeatPass = form.get('repeatPass').trim();


        if(userName == '' || password ==''){
            return alert('All field\'s are required!');
        }
        
        if(repeatPass !== password){
            return alert('Passwords not match!');
        }

        await register(userName,password);
        event.target.reset();
        ctx.setUserNav();

        ctx.page.redirect('/all-listing');
    }

}