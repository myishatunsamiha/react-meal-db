import React from 'react';

const OrderList = (props) => {
    const { orders } = props;
    // console.log(orders);

    let totalOrders = 0;
    for (const order of orders) {       // orders in an array of objects
        // console.log(order);
        totalOrders += order.quantity;
    }

    return (
        <div>
            <h2>Order List</h2>
            <h4>Items Ordered: {totalOrders}</h4>
        </div>
    );
};

export default OrderList;