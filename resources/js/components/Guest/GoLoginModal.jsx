import { useEffect } from "react";

function GoLoginModal ({shouldShowModal, setShouldShowModal, zoomDOM}) {
    if(shouldShowModal !== null && shouldShowModal !== undefined && shouldShowModal !== false){
        const backgroundZoomTiming = {
            duration: 300,
            iterations: 1,
            fill:'forwards',
            easing: 'ease'
          };
        useEffect(() => {
            // console.log(modalInfo.zoomDOM);
            zoomDOM.animate([{ transform:'scale(0.9)'}], backgroundZoomTiming)
        }, [])

        const cancel = () => {
            setShouldShowModal(false)
            zoomDOM.animate([{ transform:'scale(1)'}], backgroundZoomTiming)
            // setTimeout(() => {
            //     setModalInfo(null)
            // }, 0.3)
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