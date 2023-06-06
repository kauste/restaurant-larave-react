
import Contexts from "@/components/Contexts";
import Messages from "@/components/Messages";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import RestaurantCheckbox from "./RestaurantCheckbox";

function EditDish() {

    const {dishForEdit, setDishForEdit , restaurants, setDishes, setMessage, messages, setMessages, zoomBack, shouldEdit, setShouldEdit } = useContext(Contexts.BackContext);
    const [checkBoxData, setCheckboxData] = useState([]);
    const [checkedRestaurants, setCheckedRestaurants] = useState([]);

    useEffect(() => {
        if(shouldEdit === false) return;
        dishForEdit.picture = null;
        if(dishForEdit.restaurants !== null){
            dishForEdit.restaurants.forEach(restaurant => {
                setCheckedRestaurants(values => ([...values, restaurant.id]))
            });
        }
    }, [shouldEdit]);

    useEffect(() => {
        if(dishForEdit === null) return;
        setDishForEdit({...dishForEdit, restaurants:checkBoxData})
    }, [checkBoxData])

    if (shouldEdit === true && typeof(dishForEdit) === 'object' && dishForEdit !== null) {

        const fillForm = (e) => {
            const name = e.target.name;
            let value;
            if(e.target.files && e.target.files[0]){
                value = e.target.files[0]
            }
            else if(e.target.value){
                value = e.target.value;
            }

            setDishForEdit(values => ({...values, [name]:value}));
        }
        const closeModal = () => {
            setShouldEdit(false)
            setCheckboxData([]);
            setCheckedRestaurants([]);
            setDishForEdit(null)
            zoomBack();
        }
        const updateDish = () => {
            axios.post(route('dish-update'), { _method: 'PUT', ...dishForEdit}, {headers:{"Content-Type": "multipart/form-data", 'X-Requested-With': 'XMLHttpRequest'}})
            .then(res => {
                if(res.data.editedDish){
                    setMessages(null);
                    const editedDish = {...res.data.editedDish, restaurants:res.data.restaurants, index:dishForEdit.index, show:true, searchedAndFiltered: true}
                    setDishes(values => ([...values.filter(d => d.id !== editedDish.id), editedDish].map(d => {
                        d.searchedAndFiltered = true;
                        return d;
                    })).sort((a, b) => a.index - b.index))
                    closeModal();
                    setMessage(res.data.message);
                }
                else {
                    setMessages(res.data.messages)
                }
                
            })
        }

        return (
            <div className="modal-box">
                <div className="modal-mine" role="dialog">
                    <div role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit dish</h5>
                                <button type="button" className="close" onClick={closeModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <Messages messages={messages} />
                            <div className="modal-body">
                                <form className="create-form d-flex flex-column gap-3">
                                    <div className="form-row d-flex gap-10">
                                        <div className="col-md-7">
                                            <label className="main-label" htmlFor="name">Name</label>
                                            <input id="name" type="text" className="form-control" name="dish_name" value={dishForEdit?.dish_name || ''} onChange={fillForm} required />
                                        </div>
                                        <div className="col-3">
                                            <label className="main-label" htmlFor="price">Price</label>
                                            <div className="d-flex gap-1 align-items-end">
                                                <input id="price" type="number" className="form-control" name="price" value={dishForEdit?.price} onChange={fillForm} required />
                                                <span>eur.</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-">
                                            <label className="main-label"htmlFor="restaurant_id">Choose restaurant</label>
                                            <div className="restaurants-checkbox">
                                                {
                                                    restaurants.map((oneRestaurant, i) => <RestaurantCheckbox key={i} oneRestaurant={oneRestaurant} setCheckboxData={setCheckboxData} checkBoxData={checkBoxData} checkedRestaurants={checkedRestaurants}></RestaurantCheckbox>)

                                                }
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="d-flex gap-2">
                                            <label className="main-label one-color-btn gray-btn" htmlFor="picture">Add picture
                                            <input id="picture" type="file" name="picture"  accept="image/*" onChange={fillForm}/>
                                            </label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="d-flex gap-3 justify-content-end">
                                <button type="button" className="one-color-btn black-outline-btn"  onClick={updateDish}>Edit</button>
                                <button type="button" className="one-color-btn orange-btn"  data-dismiss="modal" onClick={closeModal}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return null;
}
export default EditDish;