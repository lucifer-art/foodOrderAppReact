import { Fragment} from 'react';
import HeaderCartButton from './HeaderCartButtton/HeaderCartButton';
import classes from './Header.module.css';
import meal from '../../../assets/meals.jpg';

const Header = props => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1 style={{paddingLeft:'5%'}}>ReactMeals</h1>
                <HeaderCartButton onShow={props.onShow} />
            </header>
            <div className={classes.main_image}>
                <img src={meal} alt="meals background" />
            </div>
        </Fragment>
    )
}

export default Header;