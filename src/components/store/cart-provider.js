import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0,
}

const cartReducer = (state,action) => {
    if(action.type === 'ADD_ITEM') {
        const updatedTotalAmount = state.totalAmount + (action.val.price * action.val.amount);
        
        const existingCartIndex = state.items.findIndex((item) => {
            return item.id === action.val.id;
        })

        const existingCartItem = state.items[existingCartIndex];
        let updatedItem;
        let updatedItems;

        if(existingCartItem) {
            updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.val.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingCartIndex] = updatedItem;
        } else {
            updatedItem = {
                ...action.item
            };
            updatedItems = state.items.concat(action.val);
        }
        
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    if(action.type === 'REMOVE_ITEM') {
        

        const existingCartIndex = state.items.findIndex((item) => {
            return item.id === action.id;
        })
        const existingCartItem = state.items[existingCartIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;
        let updatedItems;
        if(existingCartItem.amount === 1) {
            updatedItems = state.items.filter(item => {
            return item.id !== action.id
            })
        } else {
            const updatedItem = {...existingCartItem,amount: existingCartItem.amount - 1};
            updatedItems =  [...state.items];
            updatedItems[existingCartIndex] = updatedItem;
        }
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
            id:id
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