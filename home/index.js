import { faker } from '@faker-js/faker';

import { getData, isLoggedIn } from "../utils/index.js";
import { categoriesUrl, productsByCategoryUrl, productsUrl } from "../utils/urls.js";

isLoggedIn();

const categoriesContainer = document.getElementById('categories-container');
const productsContainer = document.getElementById('products-container');

async function getCategories() {
    try {
        const categories = await getData(categoriesUrl);

        for (let category of categories) {
            categoriesContainer.insertAdjacentHTML(
                'beforeend',
                `
                    <li class="categories" data-id="${category}">${category}</li>
                `
            );

            const categoryMenu = document.querySelector(`[data-id="${category}"]`);
            categoryMenu.addEventListener('click', async function () {
                getProductsByCategory(categoryMenu.dataset.id);
                console.log(categoryMenu.dataset.id)
            });
        }

        categoriesContainer.insertAdjacentHTML(
            'beforeend',
            `
            <li class="categories" data-id="allCategories">Todos los productos</li>
            `
        );
        const categoryMenu = document.querySelector(`[data-id="allCategories"]`);
        categoryMenu.addEventListener('click', function () {
            productsContainer.innerHTML = '';
            getProducts();
        });

    } catch (error) {
        console.log(error);
    }
}

async function getProducts() {

    try {
        const products = await getData(productsUrl);

        console.log(products)
        for (let product of products) {

            productsContainer.insertAdjacentHTML(
                'beforeend',
                `
                    <div class="product-card" data-productId="${product.id}">
                        <div class="product-image">
                            <img class="image-for-product" src="${product.image}"/>
                        </div>
                        <h4 class="product-name">${product.title}</h4>
                    </div>
                `
            );


            const card = document.querySelector(`[data-productId="${product.id}"]`);
            card.addEventListener('click', function handleProductDetails() {
                window.location.href = `../productDetails/index.html?productId=${product.id}`;
            });
        }
    } catch (error) {
        console.log(error)
    }
}

getCategories();
getProducts();

async function getProductsByCategory(category) {
    try {
        const products = await getData(`${productsByCategoryUrl}/${category}`);
        console.log(products)

        productsContainer.innerHTML = '';

        for (let product of products) {
            const randomImage = faker.image.urlLoremFlickr({
                category: product.title
            });

            productsContainer.insertAdjacentHTML(
                'beforeend',
                `
                <div class="product-card" data-id="${product.id}">
                <div class="product-image">
                    <img class="image-for-product" src="${product.image}"/>
                </div>
                <h4 class="product-name">${product.title}</h4>
            </div>
                `
            );
        }

    } catch (error) {
    }
}
