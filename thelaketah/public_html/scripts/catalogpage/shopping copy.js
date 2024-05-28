class Shopping {
    handleClear() {
        ROOT_Shopping.innerHTML = '';
    }

    render() {
        const productsStore = localStorageUtil.getProducts();
        let htmlCatalog = '';
        let sumCatalog = 0;

        SNEAKERS.forEach(({id, name, price}) => {
            if (productsStore.indexOf(id) !== -1) {
                htmlCatalog += `   
                    <tr>
                        <td class="shopping-element__name">${name}</td>
                        <td class="shopping-element__price">${(price*4).toLocaleString()} ₽</td>
                    </tr>
                `;
                sumCatalog += price;
            }
        });

        const html = `
            <div class="shopping-container">
                <div class="shopping-close" onclick="shoppingPage.handleClear()"></div>
                <table>
                    ${htmlCatalog}
                    <tr>
                        <td class="shopping-element__name">Сумма:</td>
                        <td class="shopping-element__price">${sumCatalog.toLocaleString()} ₽</td>
                    </tr>
                </table>
            </div>
        `;

        ROOT_Shopping.innerHTML = html;
    }
}

const shoppingPage = new Shopping();