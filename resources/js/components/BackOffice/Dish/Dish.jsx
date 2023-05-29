import Contexts from "@/components/Contexts";
import axios from "axios";
import { useContext } from "react";
import RestaurantInDish from "./RestaurantInDish";
function Dish({dish}) {
    
    const { asset, defaultPic, setDishes, setModalInfo, setMessage, setDishForEdit, zoomDOM, zoomSmaller, zoomBack, setShouldEdit, changePg, currPage} = useContext(Contexts.BackContext);

    const deleteDish = () => {

        axios.delete(route('dish-delete') + '/' + dish.id)
        .then(res => {
            setDishes(allDishes => allDishes.filter((oneDish) =>  oneDish.id != dish.id)
                                    .map((d) => {
                                        if(d.index > dish.id){
                                            d.index += 1;
                                        }
                                        return d;
                                    }).sort((a, b) => b.searchedAndFiltered - a.searchedAndFiltered || a.index - b.index));
            changePg(currPage)
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
        <li className="align-center one-dish-bin">
            <ul className="one-dish">
                <li>
                    <img src={asset + dish.picture_path ?? asset + defaultPic} className="img"/>
                </li>
                <li className="dish-name">{dish.dish_name}</li>
                <li>{dish.price} eu.</li>
                <li className="restaurants">
                    <span className="bold">At: </span>
                    {
                        (dish.restaurants).map((restaurant, index) => <RestaurantInDish key={index} restaurant={restaurant} index={index} allRestaurants={dish.restaurants}></RestaurantInDish>)
                    }
                </li>
                <li className="buttons-bin d-flex gap-4">
                    <button className="one-color-btn orange-outline-btn" onClick={showModal}>Delete</button>
                    <button className="one-color-btn black-btn" onClick={showEdit}>Edit</button>
                </li>
            </ul>
        </li>
    )



}
export default Dish;
