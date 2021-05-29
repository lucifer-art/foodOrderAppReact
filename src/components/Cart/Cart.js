import classes from './Cart.module.css';
import Modal from '../UI/Modal/Modal';
import { useContext } from 'react';
import CartContext from '../store/cart-context';
import CartItem from './CartItem/CartItem';

const Cart = props => {

    const context = useContext(CartContext);

    const cartAmount = `$${context.totalAmount.toFixed(2)}`;

    const cartItemRemoveHandler = id => {
        context.removeItem(id)
    }

    const cartItemAddHandler = item => {
        context.addItem({
            ...item,amount:1
        });
    }

    const cartItems = context.items.map(item => {
        return <CartItem 
        key={item.id}
        id={item.id}
        name={item.name} 
        price={item.price} 
        amount={item.amount} 
        onRemove={cartItemRemoveHandler.bind(null,item.id)} 
        onAdd={cartItemAddHandler.bind(null,item)} />
    });
    return (
        <Modal onHide={props.onHide}>
            <ul className={classes['cart-items']}>
                {cartItems}
            </ul>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{cartAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onHide}>Close</button>
                {context.items.length ? <button className={classes.button}>Order</button> : ''}
            </div>
        </Modal>
    )
}

export default Cart;