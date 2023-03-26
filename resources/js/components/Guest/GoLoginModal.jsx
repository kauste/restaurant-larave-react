import { useContext, useEffect } from "react";
import Contexts from "../Contexts";

function GoLoginModal () {
    const {shouldShowModal, setShouldShowModal, zoomDOM} = useContext(Contexts.FrontContext);
    if(shouldShowModal !== null && shouldShowModal !== undefined && shouldShowModal !== false){
        const backgroundZoomTiming = {
            duration: 300,
            iterations: 1,
            fill:'forwards',
            easing: 'ease'
          };
        useEffect(() => {
            zoomDOM.animate([{ transform:'scale(0.9)'}], backgroundZoomTiming)
        }, [])

        const cancel = () => {
            setShouldShowModal(false)
            zoomDOM.animate([{ transform:'scale(1)'}], backgroundZoomTiming)

        }
        return (
            <div className="modal-box">
              <div className="modal-mine" role="dialog">
                    <div role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Unidentified user</h5>
                                <button type="button" className="close" onClick={cancel}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>You have to login to make an order.</p>
                            </div>
                            <div className="d-flex gap-3 justify-content-end">
                                <button type="button" className="one-color-btn orange-outline-btn" data-dismiss="modal" onClick={cancel}>Cancel</button>
                                <a href={route('login')} type="button" className="one-color-btn brown-btn">Login</a>
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
export default GoLoginModal;