
import Contexts from "@/components/Contexts";
import Messages from "@/components/Messages";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import RestaurantCheckbox from "./RestaurantCheckbox";

function CreateDish() {

    const { setShouldCreate, shouldCreate, restaurants, setDishes, setMessage, messages, setMessages, zoomBack } = useContext(Contexts.BackContext);

    const [formData, setFormData] = useState({ restaurants: [],
        dish_name: '',
        price:'',
        picture:null,                                                            
      });

    const [checkBoxData, setCheckboxData] = useState([]);
            
    useEffect(() => {
        setFormData({...formData, restaurants:checkBoxData})
    }, [checkBoxData])

    if (shouldCreate === true) {

        const fillForm = (e) => {
            const name = e.target.name;
            let value;
            if(e.target.files && e.target.files[0]){
                value = e.target.files[0]
            }
            else if(e.target.value){
                value = e.target.value;
            }
            setFormData(values => ({...values, [name]:value}));
        }

        const createDish = () => {
            axios.post(route('dish-store'), formData, {headers:{Accept: "application/json", "Content-Type": "multipart/form-data"}})
            .then(res => {
                if(res.data.newDish){
                    const newestDish = {...res.data.newDish, restaurants:res.data.restaurants, show:true};
                    setDishes(allDishes => ([...allDishes.map((dish) => ({...dish, show:true})),  newestDish].sort((a, b) => b.id - a.id)))
                    closeModal()
                    setMessage(res.data.message);
                }
                else{
                    setMessages(res.data.messages)
                }
            })
        }
        const closeModal = () => {
            setCheckboxData([]);
            setMessages(null);
            setShouldCreate(false);
            setFormData(null);
            zoomBack();
        }
        return (
            <div className="modal-box">
                <div className="modal-mine" role="dialog">
                    <div role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Create new dish</h5>
                                <button type="button" className="close" onClick={closeModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <Messages messages={messages}/>
                            <div className="modal-body">
                                <form className="create-form d-flex flex-column gap-3">
                                    <div className="form-row d-flex gap-10">
                                        <div className="col-md-7">
                                            <label className="main-label" htmlFor="name">Name</label>
                                            <input id="name" type="text" className="form-control" name="dish_name" value={formData?.dish_name || ''} onChange={fillForm} required />
                                        </div>
                                        <div className="col-3">
                                            <label className="main-label" htmlFor="price">Price</label>
                                            <div className="d-flex gap-1 align-items-end">
                                                <input id="price" type="number" className="form-control" name="price" value={formData?.price || ''} onChange={fillForm} required />
                                                <span>eur.</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-">
                                            <label className="main-label"htmlFor="restaurant_id">Choose restaurant</label>
                                            <div className="restaurants-checkbox">
                                                {
                                                    restaurants.map((oneRestaurant, i) => <RestaurantCheckbox key={i} oneRestaurant={oneRestaurant} setCheckboxData={setCheckboxData} checkBoxData={checkBoxData}></RestaurantCheckbox>)

                                                }
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="d-flex gap-2">
                                            <label className="main-label" htmlFor="picture">Add picture</label>
                                            <input id="picture" type="file" name="picture"  accept="image/*" onChange={fillForm}/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="d-flex gap-3 justify-content-end">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={createDish}>Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return null;
}
export default CreateDish;