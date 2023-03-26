function OrderAdress({adress}){
    if(adress !== null){
        return(
        <div className="back-order-adress">
            <div>{adress.street} {adress.street_nr}{adress.flat_nr ? '-' + adress.flat_nr : ''}</div>
            <div>{adress.post_code} {adress.city}</div>
            <div>{adress.telephone_number}</div>
            <div>Message: {adress.message}</div>
        </div>
        )
    }
    else return null;
}
export default OrderAdress;