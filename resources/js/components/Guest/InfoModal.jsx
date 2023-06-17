import { useContext, useEffect } from "react";
import Contexts from "../Contexts";

function InfoModal({}) {

    const {isRedirected, setIsRedirected, zoomDOM} = useContext(Contexts.FrontContext);
    if(isRedirected !== null && isRedirected !== undefined && isRedirected !== false){
        const backgroundZoomTiming = {
            duration: 300,
            iterations: 1,
            fill:'forwards',
            easing: 'ease'
          };
        useEffect(() => {
            zoomDOM.animate([{ transform:'scale(0.9)'}], backgroundZoomTiming)
        }, [])

        const close = () => {
            setIsRedirected(false)
            zoomDOM.animate([{ transform:'scale(1)'}], backgroundZoomTiming)

        }
        return (
            <div className="modal-box">
              <div className="modal-mine info" role="dialog">
                    <div role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Information</h5>
                                <button type="button" className="close" onClick={close}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>This is a fake restaurant created for educational purposes only. You cannot order any of the food, but you can get ideas for your dinner.</p> 
                                <small>&lowast; The developer takes no responsibility for your increased appetite or tremendous weight gain.</small>
                            </div>
                            <div className="d-flex gap-3 mr-3 justify-content-end">
                                <button type="button" className="one-color-btn white-outline-btn btn-lg" data-dismiss="modal" onClick={close}>Understood</button>
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
export default InfoModal;