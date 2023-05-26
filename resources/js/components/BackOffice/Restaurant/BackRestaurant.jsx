import Contexts from "@/components/Contexts"
import { useContext, useEffect } from "react"

function BackRestaurant({restaurant}){

    const { currPage, setRestaurantList, setMessage, zoomDOM, zoomSmaller, setForEditRestaurant, setModalInfo, changePage } = useContext(Contexts.BackContext);

    const confirm = () => {
        console.log(restaurantList)
        console.log(restaurant);
        axios.delete(route('restaurant-delete') + '/' + restaurant.id)
        .then(res => {
            setRestaurantList(rL => rL.filter((oneRestaurant) => oneRestaurant.id !== restaurant.id));
            changePage(currPage);
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
                    <a className="one-color-btn orange-outline-btn" href={route('restaurant-show-dishes') + '/' + restaurant.id} title="Show restaurant dishes">Edit dishes</a>
                    <button className="one-color-btn black-outline-btn" title="Edit restaurant dishes" onClick={showEditModal}>Edit</button>
                    
                </div>
                <button className="one-color-btn orange-btn" onClick={showModal} title="Delete restaurant dishes">Delete</button>
            </li>
        </ul>
    )
}
export default BackRestaurant;