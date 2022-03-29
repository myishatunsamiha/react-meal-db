const addToDb = id => {
    let shoppingCart = getStoredCart();

    // step-2: add quantity of the existing or new product 
    const quantity = shoppingCart[id];
    if (quantity) {
        shoppingCart[id] = quantity + 1;
    } else {
        shoppingCart[id] = 1;
    }

    // step-3: set the updated shoppingCart to the storage
    localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
}

const getStoredCart = () => {
    let shoppingCart = {};

    // step-1: get the shopping cart from the storage
    const storedCart = localStorage.getItem('shopping-cart');   // data received in string format
    if (storedCart) {
        shoppingCart = JSON.parse(storedCart);
    }

    return shoppingCart;
}

export {
    addToDb,
    getStoredCart
};