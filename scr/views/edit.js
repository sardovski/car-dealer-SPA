import { html } from '../../node_modules/lit-html/lit-html.js';
import { getCarById, editCar } from '../api/data.js';


const editTemplate = (carInfo, onSubmit) => html`
<section id="edit-listing">
    <div class="container">

        <form @submit=${onSubmit} id="edit-form">
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" .value=${carInfo.brand}>

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" .value=${carInfo.model}>

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" .value=${carInfo.description}>

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" .value=${carInfo.year}>

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${carInfo.imageUrl}>

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" .value=${carInfo.price}>

            <hr>
            <input type="submit" class="registerbtn" value="Edit Listing">
        </form>
    </div>
</section>`;

export async function editPage(ctx) {
    const carId = ctx.params.id;
    const carInfo = await getCarById(carId);

    ctx.render(editTemplate(carInfo,onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const form = new FormData(event.target);

        const brand = form.get('brand').trim();
        const model = form.get('model').trim();
        const description = form.get('description').trim();
        const year = Number(form.get('year'));
        const imageUrl = form.get('imageUrl').trim();
        const price = Number(form.get('price'));

        if (!brand || !model || !description || !year || !imageUrl || !price) {
            return alert('All fields are required!');

        }else if((Number.isNaN(year) || year < 0) || (Number.isNaN(price) || price < 0)){
            return alert('Year and Price need\'s to be positive numbers!');
        }

        await editCar(carId,{
            brand,
            model,
            description,
            year,
            imageUrl,
            price
          });

        ctx.page.redirect('/details/' + carId);

    }
}
