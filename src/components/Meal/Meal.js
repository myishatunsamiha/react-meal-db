import React from 'react';
import './Meal.css';

const Meal = (props) => {
    const { addToOrder, meal } = props;
    const { strMealThumb, strInstructions, strMeal } = meal;

    const check = () => {
        console.log("check");
        addToOrder(meal);
    }
    return (
        <div className="meal">
            <img src={strMealThumb} alt="" />
            <div className="meal-info">
                <h4>{strMeal}</h4>
                <p>{strInstructions.slice(0, 100)}</p>
            </div>
            <button onClick={check}>Add To Order</button>
        </div>
    );
};

export default Meal;