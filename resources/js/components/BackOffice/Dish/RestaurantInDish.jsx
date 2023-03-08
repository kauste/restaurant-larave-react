function RestaurantInDish({index, restaurant, allRestaurants}){ // ??? ar reikia iskelti i atskira komponenta
    return (
        <span className="d-inline-block">
            <a className="restaurant-have-dish" key={restaurant.id}>{restaurant.restaurant_name}
                <span className="tootlip">{restaurant.adress}, {restaurant.city}</span>
            </a>
            <span className="comma d-inline">{allRestaurants.length > index + 1 ? ',' : '.'}</span>
        </span>
    )
}
export default RestaurantInDish;
