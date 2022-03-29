import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Meal from '../Meal/Meal';
import OrderList from '../OrderList/OrderList';
import './Restaurant.css';

const Restaurant = () => {
    const [meals, setMeals] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=fish')
            .then(res => res.json())
            .then(data => setMeals(data.meals))
    }, []);

    // checking the dependency arrays' states
    useEffect(() => {
        if (meals.length > 0) {
            console.log('finished loading meals', meals);
        } else {
            console.log('trying to load meals', meals);
        }

        if (orders.length > 0) {
            console.log('finished loading orders', orders);
        } else {
            console.log('trying to load orders', orders);
        }

    }, [meals, orders])



    useEffect(() => {
        const storedOrder = getStoredCart();    // get cart data from local storage
        const savedOrder = [];

        for (const id in storedOrder) {
            const addedMeal = meals.find(meal => id === meal.idMeal);
            // console.log(addedMeal);
            if (addedMeal) {
                const quantity = storedOrder[id];
                addedMeal.quantity = quantity;          // adding the quantity of each ordered item got from the storage data
                addedMeal.addedNewKey = 'addedNewValue';
                savedOrder.push(addedMeal);
            }
        }
        setOrders(savedOrder);
    }, [meals]);

    const addToOrder = meal => {        // event handler 
        const existingMeal = orders.find(order => order.idMeal === meal.idMeal);

        let newOrders;
        if (existingMeal) {
            const rest = orders.filter(order => order.idMeal !== existingMeal.idMeal);
            // existingMeal.quantity += 1;
            existingMeal['quantity'] = existingMeal['quantity'] + 1;
            newOrders = [...rest, existingMeal];
        } else {
            meal['quantity'] = 1;
            newOrders = [...orders, meal];
        }

        setOrders(newOrders);
        addToDb(meal.idMeal);
    }

    return (
        <div className="restaurant">
            <div className="meal-container">
                {
                    meals.map(meal => <Meal key={meal.idMeal}
                        meal={meal}
                        addToOrder={addToOrder}></Meal>)
                }
            </div>

            <div className="order-list">
                <OrderList orders={orders}></OrderList>
            </div>
        </div>
    );
};

export default Restaurant;