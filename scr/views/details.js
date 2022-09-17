import {html} from '../../node_modules/lit-html/lit-html.js';
import {getCarById,deleteCar} from '../api/data.js';


const detailsTemplate = (carInfo,onDelete,isOwner) =>html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src="${carInfo.imageUrl}">
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${carInfo.brand}</li>
            <li><span>Model:</span>${carInfo.model}</li>
            <li><span>Year:</span>${carInfo.year}</li>
            <li><span>Price:</span>${carInfo.price}$</li>
        </ul>

        <p class="description-para">
        ${carInfo.description}
        </p>

        <div class="listings-buttons">
            ${isOwner ? html`<a href="/edit/${carInfo._id}" class="button-list">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button-list">Delete</a>` : ''}

        </div>
    </div>
</section>`;


export async function detailsPage(ctx) {
    const carId = ctx.params.id;
    const carInfo = await getCarById(carId);
    const isOwner = sessionStorage.getItem('userId') == carInfo._ownerId;
    
    ctx.render(detailsTemplate(carInfo,onDelete,isOwner));

    async function onDelete(event) {
        event.preventDefault();
        const confirmed = confirm('Are you sure you want to delete it?');

        if(confirmed){
           await deleteCar(carId);
           ctx.page.redirect('/all-listing');
        }

    }
}