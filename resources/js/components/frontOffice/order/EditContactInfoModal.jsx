import Contexts from "@/components/Contexts";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

function EditContactInfoModal(){

    const {setChangeContactOrder, changeContactOrder, smallerBackground, normalBackground} = useContext(Contexts.FrontContext)
    const [courierData, setCourierData ] = useState({});

    useEffect(() => {
        if(changeContactOrder !== null && changeContactOrder !== undefined){
            smallerBackground();
            setCourierData({
                city: changeContactOrder.contactInfo.city,
                street: changeContactOrder.contactInfo.street,
                streetNumber: changeContactOrder.contactInfo.street_nr,
                flat: changeContactOrder.contactInfo.flat_nr,
                postCode: changeContactOrder.contactInfo.post_code,
                telNr: changeContactOrder.contactInfo.telephone_number,
                message: changeContactOrder.contactInfo.message
    
            });
        }
        else if(changeContactOrder !== undefined) {
            normalBackground();        }
    }, [changeContactOrder]);

    if(changeContactOrder !== null && changeContactOrder !== undefined){
        const fillForm = (event) => {
            const name = event.target.name;
            const value = event.target.value;
            setCourierData(values => ({...values, [name]:value }))
        }
        const updateOrder = () => {
            axios.put(route('update-order-adress') + '/' + changeContactOrder.orderId, courierData)
            .then(res => {
                changeContactOrder.setContactInfo({...changeContactOrder.contactInfo, ...courierData});
                const newData = {city:courierData.city, street:courierData.street, street_nr:courierData.streetNumber, flat_nr:courierData.flat, telephone_number:courierData.telNr, post_code:courierData.postCode, message:courierData.message}
                changeContactOrder.setContactInfo({...changeContactOrder.contactInfo, ...newData});
                setChangeContactOrder(null);
                changeContactOrder.setMessage(res.data.message);
            })
        }

        return (
            <div className="modal-box">
            <div className="modal-mine" role="dialog">
                <div role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Delivery</h5>
                            <button type="button" className="close" onClick={() => setChangeContactOrder(null)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form className="modal-body">
                                        <div className="delivery-form">
                <h5>Adress for delivery</h5>
                <div>
                    <div className="d-flex flex-column gap-2">
                        <div className="label-input">
                            <label htmlFor="city">City:</label>
                            <input className="text-input" type="text" name="city" value={courierData.city || ''} onChange={fillForm}></input>
                        </div>
                        <div className="label-input">
                            <label htmlFor="street">Street:</label>
                            <input className="text-input" type="text" name="street" value={courierData.street || ''} onChange={fillForm}></input>
                        </div>
                        <div className="label-input">
                            <label htmlFor="street-number">Street number:</label>
                            <input className="number-input" type="text" name="streetNumber" value={courierData.streetNumber || ''} onChange={fillForm}></input>
                        </div>
                        <div className="label-input">
                            <label htmlFor="flat">Flat number:</label>
                            <input className="number-input" type="text" name="flat" value={courierData.flat || ''} onChange={fillForm}></input>
                        </div>
                        <div className="label-input">
                            <label htmlFor="post-code">Post code:</label>
                            <input className="number-input" type="text" name="postCode" value={courierData.postCode || ''} onChange={fillForm}></input>
                        </div>
                        <div className="label-input">
                            <label htmlFor="telNr">Telephone number:</label>
                            <input className="text-input" type="text" name="telNr" value={courierData.telNr || ''} onChange={fillForm}></input>
                        </div>
                        <div className="label-input">
                            <label htmlFor="message">Message:</label>
                            <textarea type="message" name="message" placeholder="Not necessary" value={courierData.message || ''} onChange={fillForm}></textarea>
                        </div>
                    </div>
                </div>
            </div>
                        </form>
                        <div className="d-flex gap-3 justify-content-end">
                            <button type="button" className="one-color-btn orange-outline-btn" data-dismiss="modal" onClick={() => setChangeContactOrder(null)}>Cancel</button>
                            <button type="button" className="one-color-btn brown-btn" onClick={updateOrder}>Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
    else{
        return null;
    }
    
}
export default EditContactInfoModal;