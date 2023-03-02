import { useEffect, useState } from "react";
import DeliveryAdress from "./DeliveryAdress";
import axios from "axios";
import Messages from "../../Messages";

function ConfirmCartModal({ comfirmModalInfo, setComfirmModalInfo, cart, restaurant, setNewCart }) {

    if (comfirmModalInfo !== null && comfirmModalInfo != undefined) {
        const [messages, setMessages] = useState(null);
        const [courier, setCurier] = useState(false);
        const [courierData, setCourierData] = useState({});
        const [delivery, setDelivery] = useState(null);
        const [deliveryChoice, setDeliveryChoice] = useState('');
        const onOptionChange = (e) => {
            setDeliveryChoice(e.target.value);
            e.target.value === '1' ? setCurier(true) : setCurier(false);
          }
        
          const confirmCart = () => {
            const deliveryInfo = {deliveryChoice: deliveryChoice, courierData: deliveryChoice === '1' ? courierData : null}
            setDelivery(deliveryInfo)
        }
        useEffect(()=> {
            if(delivery === null) return;
            axios.post(comfirmModalInfo.confirmCartUrl, {restaurantId:comfirmModalInfo.restaurantId, deliveryData:delivery})
            .then(res => {
                if(res.data.errors !== undefined){
                    setMessages(res.data.errors);
                    setTimeout(()=> {
                        setMessages(null)
                    }, 50000)
                }
                else{
                    setNewCart(cart.filter((r) => r.cartInfo[0].restaurant_id !== restaurant.cartInfo[0].restaurant_id));
                    setDelivery(null);
                    setComfirmModalInfo(null);
                    localStorage.setItem('message', res.data.message)
                    window.dispatchEvent(new Event('storage'));
                }
            })
        }, [delivery])
        
        return (
            <div className="modal-box">
                <div className="modal-mine" role="dialog">
                    <div role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Delivery</h5>
                                <button type="button" className="close" onClick={() => setComfirmModalInfo(null)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <Messages messages={messages}></Messages>
                            <form className="modal-body">
                                <div className="modal-radios">
                                    <div >
                                        <input type="radio" id="self" name="self" value="0" checked={deliveryChoice === '0'} onChange={onOptionChange}/>
                                        <label htmlFor="self">Self delivery</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="courier" name="courier" value="1" checked={deliveryChoice === '1'} onChange={onOptionChange}/>
                                        <label htmlFor="courier">Delivery by courier ({comfirmModalInfo.deliveryPrice} eu.)</label>
                                    </div>
                                </div>
                                <DeliveryAdress courier={courier} setCourierData={setCourierData} courierData={courierData}></DeliveryAdress>
                            </form>
                            <div className="d-flex gap-3 justify-content-end">
                                <button type="button" className="btn btn-danger" onClick={confirmCart}>Confirm</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setComfirmModalInfo(null)}>Cancel</button>
                            </div>
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
export default ConfirmCartModal;