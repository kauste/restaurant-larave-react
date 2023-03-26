function DishInOrder ({dish}) {
    return (
        <div className="order-dish-grid">
            <div>{dish.dish_name}</div>
            <div>{dish.price} eur.</div>
            <div>{dish.pivot.amount} vnt.</div>
            <div>{dish.price * dish.pivot.amount} eur.</div>
        </div>
    );
}
export default DishInOrder;