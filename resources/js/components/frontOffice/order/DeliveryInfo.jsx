function DeliveryInfo({deliveryChoice, contactInfo, orderStatus, setChangeContactOrder, orderId}){

    const changeAdress = () => {
        setChangeContactOrder({orderId:orderId, contactInfo:contactInfo});
    }
    if(deliveryChoice === 1){
        return (
                <div className="order-delivery-info-box">
                    <div className="order-delivery-info">
                        <div>{contactInfo.street}  {contactInfo.street_nr}{contactInfo.flatNr ? '-'+ contactInfo.flatNr : ''},  {contactInfo.post_code},  {contactInfo.city}</div>
                        <div>Telephone number:  {contactInfo.telephone_number}</div>
                        <div>Message to courier {contactInfo.message}</div>
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