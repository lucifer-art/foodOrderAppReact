import React from 'react';

const CartCoontext =  React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    clearItem:()=>{}
})

export default CartCoontext;