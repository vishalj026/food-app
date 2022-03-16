import { useEffect, useState } from 'react';

import classes from './AvailableMeals.module.css';
import MealItem from './MealItem';
import Card from '../UI/Card';


function AvailableMeals() {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(undefined);

    useEffect(() => {
        const fetchMeals = async () => {
            var response = await fetch('https://react-http-87900-default-rtdb.firebaseio.com/meals.json');

            if(!response.ok) {
                throw new Error('Something went wrong!');
            }

            var responseData = await response.json();
            const loadedMeals = [];

            for(const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                });
            }

            setMeals(loadedMeals);
            setIsLoading(false);    
        };

        fetchMeals().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
        
    }, []);


    if(isLoading) {
        return (<section className={classes.mealsLoading}>
            <p>Loading...</p>
        </section>);
    }

    if(httpError) {
        return (<section className={classes.mealsError}>
            <p>{httpError}</p>
        </section>);
    }
    const mealsList = meals.map(meal => {
        return <MealItem key={meal.id} {...meal} >{meal.name}</MealItem>
    })

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    );
}

export default AvailableMeals;