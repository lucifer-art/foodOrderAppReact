import classes from './Cart.module.css';
import Modal from '../UI/Modal/Modal';

const Cart = props => {
    const cartItems = [{id:'c1',name:'Sushi',amount: 1,price: 12.99}].map(item => {
        return <li key={item.id}>{item.name}</li>
    });
    return (
        <Modal onHide={props.onHide}>
            <u className={classes['cart-items']}>
                {cartItems}
            </u>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>35.63</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onHide}>Close</button>
                <button className={classes.button}>Order</button>
            </div>
        </Modal>
    )
}

export default Cart;