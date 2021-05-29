import CartIcon from '../../../Cart/CartIcon';
import CartContext from '../../../store/cart-context';
import classes from './HeaderCartButton.module.css';
import { useContext } from 'react';

const HeaderCartButton = props => {

    const context = useContext(CartContext)
    const cartCount = context.items.reduce((curNum, item) => {
        return curNum + item.amount
    }, 0)

    return <button className={classes.button} onClick={props.onShow}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{cartCount}</span>
    </button>
}

export default HeaderCartButton;