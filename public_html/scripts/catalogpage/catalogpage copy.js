const ROOT_Limit = document.getElementById('limit');
const ROOT_Page = document.getElementById('pagecount');
const ROOT_PLeft = document.getElementById('leftbtn');
const ROOT_PRight = document.getElementById('rightbtn');
let pageCount = 1;

class Sneakers {
    constructor() {
        this.classNameActive = 'catalog-element__btn_active';
        this.labelAdd = 'Добавить в корзину';
        this.labelRemove = 'Удалить из корзины';
        this.limit = Number(ROOT_Limit.value) * Number(ROOT_Page.textContent);
        this.startID = (Number(ROOT_Page.textContent) - 1) * this.limit;
    }

    handleSetLocationStorage(element, id) {
        const { pushProduct, products } = localStorageUtil.putProducts(id);

        if (pushProduct) {
            element.classList.add(this.classNameActive);
            element.innerHTML = this.labelRemove;
        }
        else {
            element.classList.remove(this.classNameActive);
            element.innerHTML = this.labelAdd;
        }

        headerPage.render(products.length);
    }

    render() {
        const productsStore = localStorageUtil.getProducts();
        let htmlCatalog = '';

        SNEAKERS.forEach(({ id, name, price, image, src }) => {
            let activeClass = '';
            let activeText = '';
            if (productsStore.indexOf(id) === -1) {
                activeText = this.labelAdd;
            }
            else {
                activeText = this.labelRemove;
                activeClass = ' ' + this.classNameActive;
            }
            if (id < this.limit) {
                if (id >= this.startID) {
                    if (src.length > 1) {
                        htmlCatalog += `
                <li class="catalog-element_working">
                    <img class="catalog-element__img" src="${image}" onclick="window.location.href='${src}'"/>
                    <span class="catalog-element__name" onclick="window.location.href='${src}'">${name}</span>
                    <span class="catalog-element__price">
                        ${price.toLocaleString()} ₽
                    </span>
                    <button id="btn${id}" class="catalog-element__btn${activeClass}" onclick="sneakersPage.handleSetLocationStorage(this, '${id}');">
                        ${activeText}
                    </button>
                </li>
                `;
                    }
                    else {
                        htmlCatalog += `
                    <li class="catalog-element">
                        <img class="catalog-element__img" src="${image}"/>
                        <span class="catalog-element__name">${name}</span>
                        <span class="catalog-element__price">
                            ${price.toLocaleString()} ₽
                        </span>
                        <button class="catalog-element__btn${activeClass}" onclick="sneakersPage.handleSetLocationStorage(this, '${id}');">
                            ${activeText}
                        </button>
                    </li>
                    `;
                    }
                }
            }
        });

        const html = `
        <ul class="catalog-container">
            ${htmlCatalog}
        </ul>
        `;

        ROOT_Sneakers.innerHTML = html;
    }
}

const sneakersPage = new Sneakers();
sneakersPage.render();

ROOT_Limit.addEventListener('change', () => {
    sneakersPage.limit = Number(ROOT_Limit.value);
    ROOT_Page.innerHTML = 1;
    sneakersPage.startID = 0;
    sneakersPage.render();
});

ROOT_PLeft.addEventListener('click', () => {
    if (Number(ROOT_Page.textContent) > 1) {
        ROOT_Page.innerHTML = Number(ROOT_Page.textContent) - 1;
    }
    sneakersPage.limit = Number(ROOT_Limit.value) * Number(ROOT_Page.textContent);
    sneakersPage.startID = (Number(ROOT_Page.textContent) - 1) * Number(ROOT_Limit.value);
    sneakersPage.render();
});

ROOT_PRight.addEventListener('click', () => {
    pageCount = SNEAKERS.length / Number(ROOT_Limit.value);
    if (Number(ROOT_Page.textContent) < pageCount) {
        ROOT_Page.innerHTML = Number(ROOT_Page.textContent) + 1;
    }
    sneakersPage.limit = Number(ROOT_Limit.value) * Number(ROOT_Page.textContent);
    sneakersPage.startID = (Number(ROOT_Page.textContent) - 1) * Number(ROOT_Limit.value);
    console.log(sneakersPage.startID);
    sneakersPage.render();
});

