import { useEffect, useState } from "react";

function RestaurantCheckbox ({oneRestaurant, checkBoxData, setCheckboxData}) {
    const [isChecked, setIsChecked] = useState(false);

    const checkboxChange = () => {
        setIsChecked(r => !r)
    }
    useEffect(() => {
        if(isChecked){
            setCheckboxData([...checkBoxData, oneRestaurant.id])
        }
        else {
            setCheckboxData(checkBoxData.filter(thisRestaurant => { return thisRestaurant != oneRestaurant.id}))
        }
    }, [isChecked])

    return (
        <div>
        <input id={oneRestaurant.id} type="checkbox" checked={isChecked} name="restaurant" value={oneRestaurant.id} onChange={checkboxChange}/>
        <label htmlFor={oneRestaurant.id}>{oneRestaurant.restaurant_name}</label>
    </div>
    );
}
export default RestaurantCheckbox;