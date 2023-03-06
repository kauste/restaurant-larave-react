function DeliveryInfo({deliveryChoice, contactInfo, setContactInfo, orderStatus, setChangeContactOrder, orderId, setMessage}){

    const changeAdress = () => {
        setChangeContactOrder({orderId:orderId, contactInfo:contactInfo, setContactInfo:setContactInfo, setMessage: setMessage});
    }
    if(deliveryChoice === 1){
        return (
                <div className="order-delivery-info-box">
                    <div className="order-delivery-info">
                        <div>{contactInfo.street}  {contactInfo.street_nr}{contactInfo.flat_nr ? '-'+ contactInfo.flat_nr : ''},  {contactInfo.post_code},  {contactInfo.city}</div>
                        <div>Telephone number:  +370{contactInfo.telephone_number}</div>
                        <div>Message to courier: {contactInfo.message ? contactInfo.message : <i>no message</i>}</div>
                    </div>
                    <div>
                        {orderStatus < 2 ? <button className="btn btn-outline-danger" onClick={changeAdress}>Edit</button> : null}
                    </div>
                </div>
        )
    }
    else return null;
}
export default DeliveryInfo;