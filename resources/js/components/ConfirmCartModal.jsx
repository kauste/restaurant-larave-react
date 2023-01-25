import { useState } from "react";
import DeliveryAdress from "./DeliveryAdress";

function ConfirmCartModal({ comfirmModalInfo, setComfirmModalInfo }) {

    if (comfirmModalInfo !== null && comfirmModalInfo != undefined) {
        const [courier, setCurier] = useState(false);

        const [deliveryChoice, setDeliveryChoice] = useState('');
        const onOptionChange = e => {
            setDeliveryChoice(e.target.value);
            e.target.value == 1 ? setCurier(true) : setCurier(false);
          }

        
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
                            <form className="modal-body">
                                <div className="modal-radios">
                                    <div >
                                        <input type="radio" id="self" name="self" value="0" checked={deliveryChoice === '0'} onChange={onOptionChange}/>
                                        <label for="self">Self delivery</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="courier" name="courier" value="1" checked={deliveryChoice === '1'} onChange={onOptionChange}/>
                                        <label for="courier">Delivery by courier ({comfirmModalInfo.deliveryPrice} eu.)</label>
                                    </div>
                                </div>
                                <DeliveryAdress courier={courier}></DeliveryAdress>
                            </form>
                            <div className="d-flex gap-3 justify-content-end">
                                <button type="button" className="btn btn-danger" onClick={comfirmModalInfo.confirm}>Confirm</button>
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