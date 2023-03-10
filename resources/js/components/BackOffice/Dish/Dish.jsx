import axios from "axios";
import RestaurantInDish from "./RestaurantInDish";
function Dish({dish, asset, defaultPic, setNewestDishes, newestDishes, setModalInfo, setMessage, setDishForEdit}) {


    const deleteDish = () => {
        axios.delete(route('dish-delete') + '/' + dish.id)
        .then(res => {
            setNewestDishes(newestDishes.filter((oneDish) =>  oneDish.id != dish.id))
            setMessage(res.data.message)
            setModalInfo(null);
        })
    }
    
    const showModal = () => {
        setModalInfo({text: 'Are you sure you want to delete dish' + dish.dish_name, confirm:deleteDish})
    }

    const showEdit = () => {
        setDishForEdit(dish);
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
                <li className="d-flex gap-3">
                    <div className="btn btn-outline-danger" onClick={showEdit}>Edit</div>
                    <div className="btn btn-danger" onClick={showModal}>Delete</div>
                </li>
            </ul>
        </li>
    )



}
export default Dish;
