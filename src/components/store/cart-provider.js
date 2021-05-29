import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0,
}

const cartReducer = (state,action) => {
    if(action.type === 'ADD_ITEM') {
        const updatedItems = state.items.concat(action.val);
        const updatedTotalAmount = state.totalAmount + (action.val.price * action.val.amount);
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    return defaultCartState;
}

const CartProvider = props => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = item => {
        dispatchCartAction({
            type:'ADD_ITEM',
            val:item
        })
    }

    const removeCartHandler = id => {
        dispatchCartAction({
            type:'REMOVE_ITEM',
            val:id
        })
    }
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeCartHandler
    }
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;