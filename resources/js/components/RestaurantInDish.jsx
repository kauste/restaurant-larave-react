function RestaurantInDish({index, restaurant, allRestaurants, restaurantDishes}){ // ??? ar reikia iskelti i atskira komponenta
    return (
        <span className="d-inline-block">
            <i className="restaurant-have-dish" onClick={() => restaurantDishes(restaurant.id)} key={restaurant.id}>{restaurant.restaurant_name}</i>
            <span className="comma d-inline">{allRestaurants.length > index + 1 ? ',' : '.'}</span>
        </span>
    )
}
export default RestaurantInDish;
