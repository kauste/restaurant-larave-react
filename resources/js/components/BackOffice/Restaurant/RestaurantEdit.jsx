import axios from "axios";

function RestaurantEdit({restaurants, forEditRestaurant, setForEditRestaurant, updateRestaurantUrl, setRestaurants, setMessage}) {
    if (forEditRestaurant) {
    const fillForm = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setForEditRestaurant(values => ({...values, [name]:value}))
    }

    const updateRestaurant = () => {
        axios.put(updateRestaurantUrl, forEditRestaurant)
        .then(res => {
            const removedRestaurant = restaurants.filter((restaurant) => {return restaurant.id !== forEditRestaurant.id});
            setRestaurants([forEditRestaurant, ...removedRestaurant]);
            setMessage(res.data.message)
            setForEditRestaurant(null);
        })
    }

        return (
            <div className="modal-box">
                <div className="modal-mine" role="dialog">
                    <div role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit restaurant</h5>
                                <button type="button" className="close" onClick={() => setForEditRestaurant(null)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form className="d-flex flex-column gap-2"method="post" action="{{route('restaurant-store')}}">
                                    <div className="form-row align-items-center d-flex gap-2">
                                        <label className="col-3"htmlFor="inputAddress">Name</label>
                                        <input type="text" className="form-control" name="restaurant_name" value={forEditRestaurant.restaurant_name || ''} onChange={fillForm} required/>
                                    </div>
                                    <div className="form-row align-items-center d-flex gap-2">
                                        <label className="col-5" htmlFor="inputAddress">Work start hour</label>
                                        <input type="time" min="00:00" max="23:59" className="form-control" name="work_starts" value={forEditRestaurant.work_starts || ''} onChange={fillForm} required/>
                                    </div>
                                    <div className="form-row align-items-center d-flex gap-2">
                                        <label className="col-5" htmlFor="inputAddress">Work end hour</label>
                                        <input type="time" min="08:00" max="23:59" className="form-control" name="work_ends" value={forEditRestaurant.work_ends || ''} onChange={fillForm}required/>
                                    </div>
                                    <div className="form-row align-items-center d-flex gap-2">
                                        <label className="col-3" htmlFor="inputCity">City</label>
                                        <input type="text" className="form-control" id="inputCity" name="city" value={forEditRestaurant.city || ''} onChange={fillForm}required/>
                                    </div>
                                    <div className="form-row align-items-center d-flex gap-2">
                                        <label className="col-3" htmlFor="inputAddress2">Address</label>
                                        <input type="text" className="form-control" id="inputAddress2" name="adress" value={forEditRestaurant.adress || ''} onChange={fillForm}required/>
                                    </div>
                                </form>
                            </div>
                            <div className="d-flex gap-3 justify-content-end">
                                <button type="button" className="btn btn-danger"onClick={updateRestaurant}>Edit</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setForEditRestaurant(null)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div >
            </div >

        )
    }
    return null;
}
export default RestaurantEdit;