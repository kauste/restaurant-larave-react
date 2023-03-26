import Contexts from "@/components/Contexts";
import { useContext, useEffect } from "react";

function DeliveryAdress() {
    const {courier, setCourierData, courierData} = useContext(Contexts.FrontContext);

    useEffect(() => {
        if(courier === true){
            setCourierData({
                    city:null,
                    street:null,
                    streetNumber:null,
                    flat:null,
                    postCode:null,
                    telNr:null,
                    message:null
                })
        }
        else {
            setCourierData(null)
        }
    }, [courier]);

    if(courier === true){
        const fillForm = (event) => {
            const name = event.target.name;
            const value = event.target.value;
            setCourierData(values => ({...values, [name]:value }))
        }

        return (
            <div className="delivery-form">
                <h5>Adress for delivery</h5>
                <div>
                    <div className="d-flex flex-column gap-2">
                        <div className="label-input">
                            <label htmlFor="city">City:</label>
                            <input className="text-input" type="text" name="city" value={courierData?.city || ''} onChange={fillForm}></input>
                        </div>
                        <div className="label-input">
                            <label htmlFor="street">Street:</label>
                            <input className="text-input" type="text" name="street" value={courierData?.street || ''} onChange={fillForm}></input>
                        </div>
                        <div className="label-input">
                            <label htmlFor="street-number">Street number:</label>
                            <input className="number-input" type="text" name="streetNumber" value={courierData?.streetNumber || ''} onChange={fillForm}></input>
                        </div>
                        <div className="label-input">
                            <label htmlFor="flat">Flat number:</label>
                            <input className="number-input" type="text" name="flat" value={courierData?.flat || ''} onChange={fillForm}></input>
                        </div>
                        <div className="label-input">
                            <label htmlFor="post-code">Post code:</label>
                            <input className="number-input" type="text" name="postCode" value={courierData?.postCode || ''} onChange={fillForm}></input>
                        </div>
                        <div className="label-input">
                            <label htmlFor="telNr">Telephone number:</label>
                            <div className="telNr-input-box">
                                <span>+370</span>
                                <input className="text-input" type="text" name="telNr" value={courierData?.telNr || ''} onChange={fillForm}></input>
                            </div>
                        </div>
                        <div className="label-input">
                            <label htmlFor="message">Message:</label>
                            <textarea className="delivery--data" type="message" name="message" placeholder="Not necessary" value={courierData?.message || ''} onChange={fillForm}></textarea>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return null;
    }
}
export default DeliveryAdress;