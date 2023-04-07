import Contexts from "@/components/Contexts";
import { useContext } from "react";

function DeliveryInfo({deliveryChoice, contactInfo, setContactInfo, orderStatus, setChangeContactOrder, orderId}){
    const {setMessage, zoomDOM} = useContext(Contexts.FrontContext);

    const changeAdress = () => {
        setChangeContactOrder({orderId:orderId, contactInfo:contactInfo, setContactInfo:setContactInfo, setMessage: setMessage, zoomDOM:zoomDOM});
    }

    if( contactInfo !== undefined && deliveryChoice === 1){
        return (
                <div className="order-delivery-info-box">
                    <div className="order-delivery-info">
                        <div>{contactInfo.street}  {contactInfo.street_nr}{contactInfo.flat_nr ? '-'+ contactInfo.flat_nr : ''},  {contactInfo.post_code},  {contactInfo.city}</div>
                        <div>Telephone number:  +370{contactInfo.telephone_number}</div>
                        <div>Message to courier: {contactInfo.message ? contactInfo.message : <i>no message</i>}</div>
                    </div>
                    <div>
                        {orderStatus < 2 ? <button className="one-color-btn green-btn" onClick={changeAdress}>Edit</button> : null}
                    </div>
                </div>
        )
    }
    else return null;
}
export default DeliveryInfo;