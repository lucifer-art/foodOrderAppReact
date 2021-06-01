import { useEffect,useState } from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../../UI/Card/Card';
import MealItem from '../MealItem/MealItem';
import axios from 'axios';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [httpError,setHttpError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios.get('https://assignment-qwerty-default-rtdb.firebaseio.com/meals.json').then(response => {
      if (response.status === 200) {
        const loadedMeals = [];
        for (const key in response.data) {
          loadedMeals.push({
            id: key,
            name: response.data[key].name,
            description: response.data[key].description,
            price: response.data[key].price,
          })
        }
        setMeals(loadedMeals);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }).catch(err => {
      console.log("sdfsdf",err);
      setHttpError(err.toString());
      setIsLoading(false);
      return;
    })
    // return () => {
    //   cleanup
    // }
  },[])

    if(isLoading) {
      return <section>
        <p style={{color:'#fff',textAlign:'center'}}>Loading...</p>
      </section>
    }

    if(httpError) {
      return <section>
        <p style={{color:'red',textAlign:'center'}}>{httpError}</p>
      </section>
    }

    const mealsList = meals.map(meal => {
        return <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />
    });
    console.log(mealsList)
    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    )
        
};

export default AvailableMeals;