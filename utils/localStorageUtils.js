class LocalStorageUtil {
    constructor() {
        this.id = 'id'; 
        this.keyName = 'catalog';
    }

    getCount(id) {
        const productsLocalStorage = localStorage.getItem(this.id + id);
        if (productsLocalStorage !== null) {
            return JSON.parse(productsLocalStorage);
        }
        return [];
    }

    getProducts() {
        const productsLocalStorage = localStorage.getItem(this.keyName);
        if (productsLocalStorage !== null) {
            return JSON.parse(productsLocalStorage);
        }
        return [];
    }

    putCount(count, id) {
        let cnt = this.getCount();
        let pushCount = false;
        const ind = cnt.indexOf(count);
        console.log('Kolvo' + ind);

        if (ind === -1){
            cnt.push(count);
            pushCount = true;
        }
        else {
            cnt.splice(index, 1);
        }
        localStorage.setItem((this.id + id), JSON.stringify(cnt));

        return{ pushCount, cnt}
    }

    delCount(id) {
        let cnt = this.getCount();
        cnt.splice(1, 1);
        localStorage.setItem((this.id + id), JSON.stringify(cnt));

        return cnt
    }

    putProducts(id) {
        let products = this.getProducts();
        let pushProduct = false;
        const index = products.indexOf(id);
        console.log('Tovar' + index);

        if (index === -1){
            products.push(id);
            pushProduct = true;
        }
        else {
            products.splice(index, 1);
        }
        localStorage.setItem(this.keyName, JSON.stringify(products));

        return{ pushProduct, products}
    }
}

const localStorageUtil = new LocalStorageUtil();
