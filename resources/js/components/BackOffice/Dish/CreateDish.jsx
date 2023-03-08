import axios from "axios";
import { useEffect, useState } from "react";
import RestaurantCheckbox from "./RestaurantCheckbox";

function CreateDish({ setShouldCreate, shouldCreate, restaurants, dishStoreUrl }) {
    if (shouldCreate === true) {
        const [formData, setFormData] = useState({});
        const [checkBoxData, setCheckboxData] = useState([]);
        const fillForm = (event) => {
            const name = event.target.name;
            let value;
            if(event.target.files && event.target.file[0]){
                console.log('labas')
                value = event.target.files[0]
                console.log(value);
            }
            else if(event.target.value != false){
                value = event.target.value
                console.log('ce');
            }


            setFormData(values => ({...values, [name]:value}));
        }
        useEffect(() => {
            setFormData({...formData, restaurant:checkBoxData})
        }, [checkBoxData])

        const createDish = () => {
            axios.post(dishStoreUrl, {formData:formData})

            // console.log(formData);
        }
        return (
            <div className="modal-box">
                <div className="modal-mine" role="dialog">
                    <div role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Create new dish</h5>
                                <button type="button" className="close" onClick={() => setShouldCreate(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form className="create-form d-flex flex-column gap-3">
                                    <div className="form-row d-flex gap-10">
                                        <div className="col-md-7">
                                            <label className="main-label" htmlFor="name">Name</label>
                                            <input id="name" type="text" className="form-control" name="dish_name" value={formData.dish_name || ''} onChange={fillForm} required />
                                        </div>
                                        <div className="col-3">
                                            <label className="main-label" htmlFor="price">Price</label>
                                            <div className="d-flex gap-1 align-items-end">
                                                <input id="price" type="number" className="form-control" name="price" value={formData.price || ''} onChange={fillForm} required />
                                                <span>eur.</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-">
                                            <label className="main-label"htmlFor="restaurant_id">Choose restaurant</label>
                                            <div className="restaurants-checkbox">
                                                {
                                                    restaurants.map((oneRestaurant, i) => <RestaurantCheckbox key={i} oneRestaurant={oneRestaurant} fillForm={fillForm} setCheckboxData={setCheckboxData} checkBoxData={checkBoxData}></RestaurantCheckbox>)

                                                }
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="d-flex gap-2">
                                            <label className="main-label" htmlFor="picture">Add picture</label>
                                            <input id="picture" type="file" name="picture"  accept="image/*" onChange={fillForm} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="d-flex gap-3 justify-content-end">
                                <button type="button" className="btn btn-danger" onClick={createDish}>Create</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShouldCreate(false)}>Cancel</button>
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