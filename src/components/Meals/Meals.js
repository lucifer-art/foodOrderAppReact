import { Fragment } from 'react';
import MealsSummary from './MealsSummary/MealsSummary';
import AvailableMeals from './AvailabilityMeals/AvailableMeals';

const Meals = () => {
    return (
        <Fragment>
            <MealsSummary />
            <AvailableMeals />
        </Fragment>
    )
}

export default Meals;