import Contexts from "@/components/Contexts";
import { useContext, useState } from "react";

function DishInRestaurant({dish}) {

    const {asset, defaultPic, restaurant, setMessage, setModalInfo, zoomDOM, zoomBack} = useContext(Contexts.BackContext);
    const [thisDish, setDhisDish] = useState(dish);

    const confirmAdd = () => {
        axios.put(route('add-dish-to-restaurant') + '/' + restaurant.id, {dishId:dish.id})
        .then(res => {
                setDhisDish(values => ({...values, isAdded:true}))
                setModalInfo(null)
                zoomBack();
                setMessage(res.data.message)
        })
    }
    const confirmRemove = () => {
        axios.put(route('remove-dish-from-restaurant') + '/' + restaurant.id, {dishId:dish.id})
        .then(res => {
                setDhisDish(values => ({...values, isAdded:false}))
                setModalInfo(null)
                zoomBack()
                setMessage(res.data.message)
        })
    }
    const add = () => {
        setModalInfo({text: 'Are you sure you want to add  ' + dish.dish_name + ' to ' + restaurant.restaurant_name + '?', confirm:confirmAdd, zoomDOM:zoomDOM});
    }
    const remove = () => {
        setModalInfo({text: 'Are you sure you want to remove  ' + dish.dish_name + ' from ' + restaurant.restaurant_name + '?', confirm:confirmRemove, zoomDOM:zoomDOM});
    }
    return (
        <li className="align-center">
            <ul className="one-dish">
                <li>
                    <img src={asset + thisDish.picture_path ?? asset + defaultPic} className="img" style={{filter : thisDish.isAdded ? '' : 'saturate(20%)'}}/>
                </li>
                <li className="dish-name">{thisDish.dish_name}</li>
                <li>{thisDish.price} eu.</li>
                <li className="form">
                {
                     thisDish.isAdded ?
                    <button className="one-color-btn orange-btn" type="button" onClick={remove}>Remove</button>
                    :
                    <button className="one-color-btn orange-outline-btn" type="button" onClick={add}>Add</button>
                }
                </li>
            </ul>
        </li>
    )



}
export default DishInRestaurant;