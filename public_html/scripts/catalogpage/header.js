class Header {
    handleOpenShoppingPage() {
        shoppingPage.render();
    }

    render(count) {
        const html = `
            <div class="header-container" onclick="headerPage.handleOpenShoppingPage()">
                <div class="header-counter"">
                    ${count}
                </div>
            </div>
        `;

        ROOT_Header.innerHTML = html;
    }
}

const headerPage = new Header();

const productsStore = localStorageUtil.getProducts();

let cnt = 0;

for (const id of productsStore) {
    const cntOf1Item = localStorageUtil.getCount(id);
    cnt += cntOf1Item[0];
}

headerPage.render(cnt);
