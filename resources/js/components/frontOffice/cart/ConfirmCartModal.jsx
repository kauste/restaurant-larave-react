import { useEffect, useState } from "react";
import DeliveryAdress from "./DeliveryAdress";
import axios from "axios";
import Messages from "../../Messages";

function ConfirmCartModal({ comfirmModalInfo, setComfirmModalInfo, cart, setCart, zoomDOM }) {

    if (comfirmModalInfo !== null && comfirmModalInfo != undefined) {
        const [messages, setMessages] = useState(null);
        const [courier, setCurier] = useState(false);
        const [courierData, setCourierData] = useState({});
        const [delivery, setDelivery] = useState(null);
        const [deliveryChoice, setDeliveryChoice] = useState('');
        const backgroundZoomTiming = {
            duration: 300,
            iterations: 1,
            fill:'forwards',
            easing: 'ease'
          };
          const cancel = () => {
              zoomDOM.animate([{ transform:'scale(1)'}], backgroundZoomTiming)
              setTimeout(() => {
                  setComfirmModalInfo(null)
              }, 0.3)
          }
          useEffect(() => {
              zoomDOM.animate([{ transform:'scale(0.9)'}], backgroundZoomTiming)
          }, [])

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
            axios.post(route('confirm-cart'), {restaurantId:comfirmModalInfo.restaurantId, deliveryData:delivery})
            .then(res => {
                zoomDOM.animate([{ transform:'scale(1)'}], backgroundZoomTiming)
                if(res.data.errors !== undefined){
                    setMessages(res.data.errors);
                    setTimeout(()=> {
                        setMessages(null)
                    }, 50000)
                }
                else{
                    setCart(cart.filter((r) => r.cartInfo[0].restaurant_id !== comfirmModalInfo.restaurantId));
                    setDelivery(null);
                    setComfirmModalInfo(null);
                    comfirmModalInfo.setMessage(res.data.message)
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
                                <button type="button" className="close" onClick={cancel}>
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
                                <button type="button" className="one-color-btn orange-outline-btn" data-dismiss="modal" onClick={cancel}>Cancel</button>
                                <button type="button" className="one-color-btn brown-btn" onClick={confirmCart}>Confirm</button>
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