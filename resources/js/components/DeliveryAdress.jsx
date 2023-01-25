function DeliveryAdress({courier}) {
    if(courier === true)
    return (
        <div className="delivery-form">
            <h5>Adress for delivery</h5>
            <div>
                <div className="d-flex flex-column gap-2">
                    <div className="label-input">
                        <label for="city">City:</label>
                        <input className="text-input" type="text" name="city"></input>
                    </div>
                    <div className="label-input">
                        <label for="city">Street:</label>
                        <input className="text-input" type="text" name="city"></input>
                    </div>
                    <div className="label-input">
                        <label for="street">Street number:</label>
                        <input className="number-input" type="text" name="street"></input>
                    </div>
                    <div className="label-input">
                        <label for="house">House number:</label>
                        <input className="number-input" type="text" name="house"></input>
                    </div>
                    <div className="label-input">
                        <label for="house">Flat number:</label>
                        <input className="number-input" type="text" name="house"></input>
                    </div>
                    <div className="label-input">
                        <label for="city">Post code:</label>
                        <input className="number-input" type="text" name="city"></input>
                    </div>
                    <div className="label-input">
                        <label for="message">Message:</label>
                        <textarea type="message" name="message" placeholder="Not necessary"></textarea>
                    </div>
                </div>
            </div>
        </div>
    )
    else {
        return null;
    }
}
export default DeliveryAdress;