function BackRestaurant({restaurants, restaurant, setForEditRestaurant, showRestaurantDishesUrl, deleteRestaurantUrl, setModalInfo, setRestaurants, setMessage}){
    const confirm = () => {
        axios.delete(deleteRestaurantUrl + '/' + restaurant.id)
        .then(res => {
            const newRestaurantList = restaurants.filter((oneRestaurant) => {
                                                            return oneRestaurant.id !== restaurant.id
                                                        })
            setRestaurants(newRestaurantList)
            setMessage(res.data.message)
            setModalInfo(null);
        })
    }
    const showModal = () => {
        setModalInfo({text:'Are you sure you want to delete this restaurant?', confirm:confirm})
    }
    
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
                <div className="btn btn-danger" onClick={showModal} title="Delete restaurant dishes">Delete</div>
            </li>
        </ul>
    )
}
export default BackRestaurant;