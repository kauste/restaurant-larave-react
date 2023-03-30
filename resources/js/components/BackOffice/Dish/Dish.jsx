import Contexts from "@/components/Contexts";
import axios from "axios";
import { useContext } from "react";
import RestaurantInDish from "./RestaurantInDish";
function Dish({dish}) {
    
    const { asset, defaultPic, setNewestDishes, newestDishes, setModalInfo, setMessage, setDishForEdit, zoomDOM, zoomSmaller, zoomBack, setShouldEdit} = useContext(Contexts.BackContext);

    const deleteDish = () => {
        axios.delete(route('dish-delete') + '/' + dish.id)
        .then(res => {
            setNewestDishes(newestDishes.filter((oneDish) =>  oneDish.id != dish.id))
            setModalInfo(null);
            zoomBack();
            setMessage(res.data.message);
        })
    }
    
    const showModal = () => {
        setModalInfo({text: 'Are you sure you want to delete dish' + dish.dish_name, confirm:deleteDish, 'zoomDOM':zoomDOM})
    }

    const showEdit = () => {
        setShouldEdit(true)
        setDishForEdit(dish);
        zoomSmaller();
    }
    return (
        <li className="align-center">
            <ul className="one-dish">
                <li>
                    <img src={asset + dish.picture_path ?? asset + defaultPic} className="img"/>
                </li>
                <li className="dish-name">{dish.dish_name}</li>
                <li>{dish.price} eu.</li>
                <li>
                    <span className="bold">At: </span>
                    {
                        (dish.restaurants).map((restaurant, index) => <RestaurantInDish key={index} restaurant={restaurant} index={index} allRestaurants={dish.restaurants}></RestaurantInDish>)
                    }
                </li>
                <li className="d-flex gap-2">
                    <button className="one-color-btn orange-outline-btn btn-xs" onClick={showModal}>Delete</button>
                    <button className="one-color-btn brown-btn btn-xs" onClick={showEdit}>Edit</button>
                </li>
            </ul>
        </li>
    )



}
export default Dish;
