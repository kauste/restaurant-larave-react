import axios from "axios";
import { useEffect, useState } from "react";
import DeliveryInfo from "./DeliveryInfo";
import OrderDish from "./OrderDish";

function FrontOrder({ asset, order, deliveryPrice, statuses, deliveryChoices, setChangeContactOrder, setMessage }) {
    const [showBody, setShowBody] = useState('d-none');
    const [contactInfo, setContactInfo] = useState(order.contactInfo);

    const headerToggle = () => {
        let toggle = showBody === 'd-none' ? '' : 'd-none';
        setShowBody(toggle);
    }
    const getInvoice = () => {
        axios.get(route('get-invoice') + '/' + order.id, {responseType: 'blob'})
        .then(response => {
            let blob = new Blob([response.data], { type: 'application/pdf' })
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = 'INVOICE-'+ order.id +'.pdf'
            link.click()
        })
    }
    return (
        <div className="card order-restaurant">
            <div className="order-card-header" onClick={headerToggle}>
                <div className="created-updated">
                    <div>Created: {order.created}</div>
                    <div>Updated: {order.updated}</div>
                </div>
                <div className="middle">
                    <h3>{order.restaurantName}</h3>
                    <span className="p-0 sfs-chevron">
                        <svg className="ml-2 -mr-0.5 h-7 w-7 pb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </span>
                </div>
                <div className="right-corner">
                    <div className="status">Status: {statuses[order.status]}</div>
                    <div className="delivery-choice">Delivery: {deliveryChoices[order.delivery_choice]}</div>
                </div>
            </div>
            <div className={`card-body ${showBody}`}>
                <DeliveryInfo deliveryChoice={order.delivery_choice} orderId={order.id} contactInfo={contactInfo} setContactInfo={setContactInfo} orderStatus={order.status} setChangeContactOrder={setChangeContactOrder} setMessage={setMessage}></DeliveryInfo>
                <ul className="bold order-grid">
                    <li></li>
                    <li>Dish</li>
                    <li>Amount ordered</li>
                    <li>One dish price</li>
                    <li>All units price</li>
                </ul>
                {
                    order.dishes.map((orderDish, index) => <OrderDish key={index} orderDish={orderDish} asset={asset}></OrderDish>)
                }
                <ul className="grid-for-extra">
                    <li className="grid-item-invoice">
                        <div className="bold">Invoice:</div>
                        <div className="invoice-svg-box" onClick={getInvoice}>
                            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 109.33 122.88" xmlSpace="preserve">
                                <g>
                                    <path className="st0" d="M82.28,105.33h-10.8V90.47H56.14v14.86H44.99l18.64,17.54L82.28,105.33L82.28,105.33z M102.4,33.95H83.61 c-1.98,0-4.73-1.06-6.03-2.36c-1.3-1.3-2.09-3.65-2.09-5.61V6.95l0,0H25.83c-0.16,0-0.29,0.08-0.37,0.16 c-0.14,0.09-0.18,0.21-0.18,0.38v87.73c0,0.12,0.09,0.29,0.16,0.37c0.09,0.13,0.26,0.16,0.38,0.16h12.96 c-1.03,2.16-1.79,4.49-2.23,6.91H23.7c-1.46,0-2.76-0.58-3.73-1.55c-0.96-0.96-1.54-2.26-1.54-3.73V5.32 c0-1.46,0.59-2.76,1.54-3.73c0.97-0.97,2.31-1.55,3.73-1.55h55.31C79.13,0,79.25,0,79.38,0c0.58,0,1.18,0.25,1.59,0.62h0.08 c0.09,0.05,0.13,0.09,0.21,0.16l27.27,27.6c0.46,0.46,0.8,1.09,0.8,1.8c0,0.21-0.04,0.37-0.08,0.6c0,25.22,0,41.39,0,66.61 c0,1.46-0.59,2.77-1.55,3.73c-0.97,0.96-2.27,1.55-3.73,1.55H90c-0.44-2.43-1.19-4.75-2.23-6.91h14.07c0.16,0,0.16-0.09,0.25-0.16 c0.13-0.09,0.3-0.26,0.3-0.37C102.39,71.78,102.4,57.39,102.4,33.95L102.4,33.95z M81.72,25.43V8.12l19.49,19.74H84.15 c-0.67,0-1.26-0.29-1.72-0.71C82.01,26.73,81.72,26.1,81.72,25.43L81.72,25.43L81.72,25.43z" />
                                    <polygon className="st1" points="0,38.51 88.9,38.51 88.9,81.22 0,81.22 0,38.51" />
                                    <path className="st2" d="M12.07,48.62h11.77c2.56,0,4.48,0.61,5.75,1.82c1.27,1.22,1.91,2.94,1.91,5.18c0,2.3-0.69,4.1-2.09,5.4 c-1.39,1.3-3.51,1.94-6.37,1.94h-3.87v8.46h-7.11V48.62L12.07,48.62z M19.18,58.34h1.73c1.37,0,2.33-0.23,2.87-0.71 c0.55-0.47,0.83-1.07,0.83-1.81c0-0.72-0.24-1.33-0.72-1.82c-0.47-0.5-1.38-0.75-2.7-0.75h-2.02V58.34L19.18,58.34z M34.99,48.62 H45.5c2.07,0,3.75,0.28,5.02,0.84c1.27,0.56,2.32,1.36,3.16,2.41c0.83,1.05,1.43,2.27,1.81,3.66c0.37,1.39,0.56,2.86,0.56,4.42 c0,2.44-0.28,4.33-0.84,5.67c-0.55,1.34-1.33,2.47-2.32,3.38c-0.99,0.91-2.05,1.51-3.18,1.81c-1.55,0.41-2.96,0.62-4.22,0.62H34.99 V48.62L34.99,48.62z M42.06,53.79v12.45h1.73c1.48,0,2.53-0.16,3.16-0.49c0.62-0.32,1.11-0.9,1.47-1.71 c0.35-0.81,0.53-2.13,0.53-3.96c0-2.42-0.39-4.07-1.18-4.96c-0.79-0.89-2.11-1.34-3.94-1.34H42.06L42.06,53.79z M59.49,48.62h17.5 v4.9H66.6v3.98h8.87v4.6H66.6v9.32h-7.11V48.62L59.49,48.62z" />
                                </g>
                            </svg>
                        </div>
                    </li>
                    <li><b>Delivery price:</b></li>
                    <li>{order.delivery_choice === 1 ? deliveryPrice : '0'} eu.</li>
                    <li><b>Total price:</b></li>
                    <li>{order.totalPrice} eu.</li>
                </ul>
            </div>
            {/* <div className="d-flex justify-content-end gap-3 p-4">
            <button className="btn btn-outline-danger btn-lg" type="button" onClick={showModal}>Cancel</button>
            <button className="btn btn-danger btn-lg" type="button" onClick={confirmOrderModal}>Order</button>
        </div> */}
        </div>
    )
}
export default FrontOrder;