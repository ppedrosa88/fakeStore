import { getData } from '../utils/index';
import { productsUrl } from '../utils/urls'

const currentUrl = new URL(document.location.href);

const productId = currentUrl.searchParams.get('productId');

async function getProductById() {

    const product = await getData(`${productsUrl}/${productId}`);
    console.log(product);

    const productDetail = document.getElementById('product-detail-container');

    productDetail.insertAdjacentHTML(
        'beforeend',
        `
        <div class="product">
            <div class="product__top">
                <p class="product__category">${product.category}</p> 
            </div>
            <div class="product__details">
                <div class="product__img-container">
                    <img src="${product.image}" alt="" class="product__img" />
                </div>
                <div class="product__details-info">
                    <p class="product__title">${product.title}</p>
                    <p class="product__price">${product.price}€</p>
                    <p class="product__rating">${product.rating.rate}⭐ (${product.rating.count})</p>
                    <p class="product__description">${product.description}</p>
                </div>
                <div class="sales-options">
                  <p class="sales__price">${product.price}€</p>
                  <div class="sales">
                    <select name="quantity" id="quantity" class="sales__quantity"></select>
                    <button class="sales__add-cart">Añadir al carrito</button>
                    <button class="sales__buy-now">Comprar ya</button>
                  </div>
                </div>
            </div>
        </div>
        `
    );

    const select = document.getElementById('quantity');
    setSelectTagOptions(select);
}

getProductById();

function setSelectTagOptions(select) {
    for (let i = 1; i < 10; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        select.append(option);
    }
}




