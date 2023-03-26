import { useEffect } from "react";

function AreYouSureModal({modalInfo, setModalInfo}) {
    if(modalInfo !== null && modalInfo !== undefined){
        const backgroundZoomTiming = {
            duration: 300,
            iterations: 1,
            fill:'forwards',
            easing: 'ease'
          };
          
        useEffect(() => {
            // console.log(modalInfo.zoomDOM);
            modalInfo.zoomDOM.animate([{ transform:'scale(0.9)'}], backgroundZoomTiming)
        }, [])

        const cancel = () => {
            modalInfo.zoomDOM.animate([{ transform:'scale(1)'}], backgroundZoomTiming)
            setTimeout(() => {
                setModalInfo(null)
            }, 0.3)
        }
        return (
            <div className="modal-box">
              <div className="modal-mine" role="dialog">
                    <div role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Are you sure?</h5>
                                <button type="button" className="close" onClick={cancel}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>{modalInfo.text}</p>
                            </div>
                            <div className="d-flex gap-3 justify-content-end">
                                <button type="button" className="one-color-btn orange-outline-btn" data-dismiss="modal" onClick={cancel}>Cancel</button>
                                <button type="button" className="one-color-btn brown-btn" onClick={modalInfo.confirm}>Confirm</button>
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
export default AreYouSureModal;