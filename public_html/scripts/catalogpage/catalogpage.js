const ROOT_Limit = document.getElementById('limit');
const ROOT_Page = document.getElementById('pagecount');
const ROOT_PLeft = document.getElementById('leftbtn');
const ROOT_PRight = document.getElementById('rightbtn');
let pageCount = 1;

class Sneakers {
    constructor() {
        this.classNameActive = 'catalog-element__btn_active';
        this.arrowsActive = 'arrows_active'
        this.labelAdd = 'Добавить в корзину';
        this.counter = 0;
        this.labelRemove = 1;
        this.FromDesc = false; 
        this.limit = Number(ROOT_Limit.value) * Number(ROOT_Page.textContent);
        this.startID = (Number(ROOT_Page.textContent) - 1) * this.limit;
    }

    handleSetLocationStorage(element, id) {
        const b = document.getElementById('btn' + id);
        const l = document.getElementById('larw' + id);
        const r = document.getElementById('rarw' + id);
        const { pushProduct, products } = localStorageUtil.putProducts(id);
        if(!this.FromDesc)        
            localStorageUtil.putCount(1, id);
        else {
            localStorageUtil.putCount(0 ,id);
            this.FromDesc = false;
        }
        if (pushProduct) {
            element.classList.add(this.classNameActive);
            l.classList.add(this.arrowsActive);
            r.classList.add(this.arrowsActive);
            element.innerHTML = this.labelRemove;
            this.counter++;
        }
        else {
            element.classList.remove(this.classNameActive);
            l.classList.remove(this.arrowsActive);
            r.classList.remove(this.arrowsActive);
            element.innerHTML = this.labelAdd;
            this.counter--;
        }

        headerPage.render(this.counter);
    }

    addCounter(id) {
        const b = document.getElementById('btn' + id);
        b.innerHTML = Number(b.textContent) + 1;
        localStorageUtil.putCount(Number(b.textContent), id);
        this.counter++;
        headerPage.render(this.counter);
    }

    desCounter(id) {
        this.FromDesc = true;
        const b = document.getElementById('btn' + id);
        if (Number(b.textContent) > 1) {
            b.innerHTML = Number(b.textContent) - 1;
            localStorageUtil.putCount(Number(b.textContent), id);
            this.counter--;
            headerPage.render(this.counter);
        }
        else {
            localStorageUtil.putCount(0, id);
            this.handleSetLocationStorage(b, id.toLocaleString());
        }
    }

    render() {
        const productsStore = localStorageUtil.getProducts();
        let htmlCatalog = '';
        this.counter = 0;
        SNEAKERS.forEach(({ id, name, price, image, src }) => {
            const productsCount = localStorageUtil.getCount(id);
            let activeClass = '';
            let activeText = '';
            let activeArrows = '';
            if (productsStore.indexOf(id) === -1) {
                activeText = this.labelAdd;
            }
            else {
                activeClass = ' ' + this.classNameActive;
                activeArrows = ' ' + this.arrowsActive;
            }
            if (productsCount[0] !== 0 && productsCount.length !== 0) {
                activeText = productsCount[0];
                this.counter += productsCount[0];              
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
                    <div class="catalog-element__btnbox">
                        <button id="larw${id}" class="arrows${activeArrows}" onclick="sneakersPage.desCounter(${id})"><img class="larw" src="./assets/navigation/leftarw.svg"/></button>
                        <button id="btn${id}" class="catalog-element__btn${activeClass}" onclick="sneakersPage.handleSetLocationStorage(this, '${id}');">
                            ${activeText}
                        </button>
                        <button id="rarw${id}" class="arrows${activeArrows}" onclick="sneakersPage.addCounter(${id})"><img class="rarw" src="./assets/navigation/rightarw.svg"/></button>
                    </div>
                </li>
                `;
                    }
                    else {
                        htmlCatalog += `
                        <li class="catalog-element_working">
                        <img class="catalog-element__img" src="${image}"/>
                        <span class="catalog-element__name" onclick="window.location.href='${src}'">${name}</span>
                        <span class="catalog-element__price">
                            ${price.toLocaleString()} ₽
                        </span>
                        <div class="catalog-element__btnbox">
                            <button id="larw${id}" class="arrows${activeArrows}" onclick="sneakersPage.desCounter(${id})"><img class="larw" src="./assets/navigation/leftarw.svg"/></button>
                            <button id="btn${id}" class="catalog-element__btn${activeClass}" onclick="sneakersPage.handleSetLocationStorage(this, '${id}');">
                                ${activeText}
                            </button>
                            <button id="rarw${id}" class="arrows${activeArrows}" onclick="sneakersPage.addCounter(${id})"><img class="rarw" src="./assets/navigation/rightarw.svg"/></button>
                        </div>
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
    headerPage.render(sneakersPage.counter);
    sneakersPage.render();
});

ROOT_PRight.addEventListener('click', () => {
    pageCount = SNEAKERS.length / Number(ROOT_Limit.value);
    if (Number(ROOT_Page.textContent) < pageCount) {
        ROOT_Page.innerHTML = Number(ROOT_Page.textContent) + 1;
    }
    sneakersPage.limit = Number(ROOT_Limit.value) * Number(ROOT_Page.textContent);
    sneakersPage.startID = (Number(ROOT_Page.textContent) - 1) * Number(ROOT_Limit.value);
    headerPage.render(sneakersPage.counter);
    sneakersPage.render();
});

