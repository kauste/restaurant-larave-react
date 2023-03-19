function BackRestaurant({restaurants, restaurant, setForEditRestaurant, showRestaurantDishesUrl, deleteRestaurantUrl, setModalInfo, setRestaurants, setMessage, zoomSmaller, zoomDOM}){
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
        zoomSmaller();
        setModalInfo({text:'Are you sure you want to delete this restaurant?', confirm:confirm, 'zoomDOM':zoomDOM})
    }
    const showEditModal = () => {
        zoomSmaller()
        setForEditRestaurant(restaurant)
    }
    
    return(
        <ul className="restaurant-list-grid">
            <li className="restaurant-name">{restaurant.restaurant_name}</li>
            <li>{restaurant.city}</li>
            <li>{restaurant.adress}</li>
            <li>From {restaurant.work_starts}h to {restaurant.work_ends}h</li>
            <li className="controls">
                <div className="show-edit">
                    <a className="one-color-btn orange-outline-btn" href={showRestaurantDishesUrl + '/' + restaurant.id} title="Show restaurant dishes">Show dishes</a>
                    <button className="one-color-btn brown-outline-btn" title="Edit restaurant dishes" onClick={showEditModal}>Edit</button>
                    
                </div>
                <button className="one-color-btn orange-btn" onClick={showModal} title="Delete restaurant dishes">Delete</button>
            </li>
        </ul>
    )
}
export default BackRestaurant;