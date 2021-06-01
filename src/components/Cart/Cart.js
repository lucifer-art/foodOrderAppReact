import classes from './Cart.module.css';
import Modal from '../UI/Modal/Modal';
import React, { useContext,useState } from 'react';
import axios from 'axios';
import CartContext from '../store/cart-context';
import CartItem from './CartItem/CartItem';
import Checkout from './Checkout/Checkout'

const Cart = props => {
    const [showCheckout, setshowCheckout] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false);
    const [didSubmit,setDidSubmit] = useState(false);
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

    const orderHandler = () => {
        setshowCheckout(true);
    }

    const submitOrderHandler = userData => {
        setSubmitting(true)
        axios.post('https://assignment-qwerty-default-rtdb.firebaseio.com/orders.json',{
            user: userData,
            orderItems: context.items
        }).then (response => {
            if(response.status === 200) {
                console.log(response);
                setSubmitting(false);
                setDidSubmit(true);
                context.clearItem();
            } else {
                setSubmitting(false);
            }
        }).catch(err=> {
            console.log(err);
            setSubmitting(false);
        })
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

    const modalActions = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHide}>Close</button>
        {context.items.length ? <button className={classes.button} onClick={orderHandler}>Order</button> : ''}
    </div>

    const cartModalContent = <React.Fragment>
        <ul className={classes['cart-items']}>
            {cartItems}
        </ul>
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{cartAmount}</span>
        </div>
        {showCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onHide} />}
        {!showCheckout && modalActions}
    </React.Fragment>

    const isSubmittingModal = <p>Sending order data...</p>

    const disSumittingModalCOntent = <React.Fragment>
        <p>Successfully sent the order!</p>
        <div className={classes.actions}>
            <button className={classes.button} onClick={props.onHide}>Close</button>
        </div>
    </React.Fragment>
    return (
        <Modal onHide={props.onHide}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModal}
            {!isSubmitting && didSubmit && disSumittingModalCOntent}
        </Modal>
    )
}

export default Cart;