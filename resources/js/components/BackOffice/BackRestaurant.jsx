function BackRestaurant({restaurant, setForEditRestaurant, showRestaurantDishesUrl, deleteRestaurantUrl}){

    return(
        <ul className="restaurant-list-grid">
            <li className="restaurant-name">{restaurant.restaurant_name}</li>
            <li>{restaurant.city}</li>
            <li>{restaurant.adress}</li>
            <li>From {restaurant.work_starts}h to {restaurant.work_ends}h</li>
            <li className="controls">
                <div className="show-edit">
                    <a className="btn btn-outline-danger" href={showRestaurantDishesUrl + '/' + restaurant.id} title="Show restaurant dishes">Show dishes</a>
                    <div className="btn btn-outline-success" title="Edit restaurant dishes" onClick={() => setForEditRestaurant(restaurant)}>Edit</div>
                    
                </div>
                <a className="btn btn-danger" href={deleteRestaurantUrl + '/' + restaurant.id} title="Delete restaurant dishes">Delete</a>
            </li>
        </ul>
    )
}
export default BackRestaurant;