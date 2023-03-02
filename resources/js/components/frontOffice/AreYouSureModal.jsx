function AreYouSureModal({modalInfo, setModalInfo}) {
    if(modalInfo !== null && modalInfo !== undefined){
        return (
            <div className="modal-box">
              <div className="modal-mine" role="dialog">
                    <div role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Are you sure?</h5>
                                <button type="button" className="close" onClick={()=> setModalInfo(null)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>{modalInfo.text}</p>
                            </div>
                            <div className="d-flex gap-3 justify-content-end">
                                <button type="button" className="btn btn-danger" onClick={modalInfo.confirm}>Confirm</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=> setModalInfo(null)}>Cancel</button>
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