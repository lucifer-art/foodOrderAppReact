import CartIcon from '../../../Cart/CartIcon';
import CartContext from '../../../store/cart-context';
import classes from './HeaderCartButton.module.css';
import { useContext,useEffect,useState } from 'react';

const HeaderCartButton = props => {
    const [itemAdd,setItemAdd] = useState(false);
    const context = useContext(CartContext)
    const cartCount = context.items.reduce((curNum, item) => {
        return curNum + item.amount
    }, 0)

    const btnClasses = `${classes.button} ${itemAdd ? classes.bump : ''}`;

    useEffect(() => {
        if(cartCount > 0) {
            setItemAdd(true);
        } else {
            return;
        }
        const timer = setTimeout(()=> {
            setItemAdd(false);
        },300)
        return ()=> {
            clearTimeout(timer);
        }
    }, [cartCount])

    return <button className={btnClasses} onClick={props.onShow}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{cartCount}</span>
    </button>
}

export default HeaderCartButton;