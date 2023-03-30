import { useContext, useEffect, useState } from "react";
import DeliveryAdress from "./DeliveryAdress";
import axios from "axios";
import Messages from "../../Messages";
import Contexts from "@/components/Contexts";

function ConfirmCartModal() {
    
    const {comfirmModalInfo, setComfirmModalInfo, cart, setCart, setCurier, courierData, messages, setMessages, smallerBackground, normalBackground} = useContext(Contexts.FrontContext);
    const [delivery, setDelivery] = useState(null);
    const [deliveryChoice, setDeliveryChoice] = useState('');

    useEffect(() => {
        if(comfirmModalInfo !== null && comfirmModalInfo !== undefined){
            smallerBackground();        
        }
        else if(comfirmModalInfo !== undefined) {
            normalBackground();        
        }
    }, [comfirmModalInfo])

    const closeModal = () => {
        if(messages){
            setMessages(null);
        }
        setCurier(false);
        setDeliveryChoice('');
        setDelivery(null);
          setTimeout(() => {
              setComfirmModalInfo(null)
          }, 0.3)
      }

    useEffect(()=> {
        if(delivery === null) return;
        axios.post(route('confirm-cart'), {restaurantId:comfirmModalInfo.restaurantId, deliveryData:delivery})
        .then(res => {
            normalBackground();
            if(res.data.errors !== undefined){
                setMessages(res.data.errors);

            }
            else{

                setCart(cart.filter((r) => r.cartInfo[0].restaurant_id !== comfirmModalInfo.restaurantId));
                closeModal();
                comfirmModalInfo.setMessage(res.data.message)
            }
        })
    }, [delivery])



    if (comfirmModalInfo !== null && comfirmModalInfo != undefined) {

        const onOptionChange = (e) => {
            setDeliveryChoice(e.target.value);
            e.target.value === '1' ? setCurier(true) : setCurier(false);
        }
        
        const confirmCart = () => {
            const deliveryInfo = {deliveryChoice: deliveryChoice, courierData: courierData}
            setDelivery(deliveryInfo)
        }        
        
        return (
            <div className="modal-box">
                <div className="modal-mine" role="dialog">
                    <div role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Delivery</h5>
                                <button type="button" className="close" onClick={closeModal}>
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
                                <DeliveryAdress></DeliveryAdress>
                            </form>
                            <div className="d-flex gap-3 justify-content-end">
                                <button type="button" className="one-color-btn orange-outline-btn" data-dismiss="modal" onClick={closeModal}>Cancel</button>
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