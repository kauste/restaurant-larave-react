import Contexts from "@/components/Contexts";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import DishInOrder from "./DishInOrder";
import OrderAdress from "./OrderAdress";

function Order({ order}) {
    const { statuses, deliveryChoices, setMessage } = useContext(Contexts.BackContext);
    const [openDisplay, setOpenDisplay] = useState('none');
    const [statusColor, setStatusColor] = useState('black');
    const [styleOnDisplay, setStyleOnDisplay] = useState({});
    const [styleOnChevron, setStyleOnChevron] = useState({transform:'rotateX(0deg)'});
    const [statusValue, setStatusValue] = useState(order.status)
    const [statusChange, setStatusChange] = useState(order.status);

    useEffect(() => {

        if (statusChange == 1) {
            setStatusColor('red')
        }
        else if (statusChange == 2) {
            setStatusColor('blue')
        }
        else if (statusChange == 3) {
            setStatusColor('green')
        }
        else if (statusChange == 4) {
            setStatusColor('grey')
        }
    }, [statusChange])

    const toggle = () => {
        if (openDisplay === 'none') {
            setStyleOnDisplay({ transform: 'scale(1.1)', backgroundColor: '#f2f2f2', padding:'15px 30px', border:'none'})
            setOpenDisplay('block');
            setStyleOnChevron({animation:'spin-chevron 0.6s ease'})
        } else {
            setStyleOnDisplay({ borderLeft: 'none', transform: 'scale(1)', boxShadow:'none' })
            setOpenDisplay('none')
            setStyleOnChevron({animation:'spin-chevron 0.6s ease reverse'})

        }
    }
    useEffect(() => {
        if(styleOnChevron.animation === null || styleOnChevron.animation === undefined) return;
        setTimeout(() => {
            setStyleOnChevron(sCh => sCh.animation === 'spin-chevron 0.6s ease reverse' ? {transform:'rotateX(0)'} : {transform:'rotateX(540deg)'});
        }, 600)

    }, [styleOnChevron])
    const chooseSelect = (e) => {
        setStatusValue(e.target.value)
    } 

    const changeStatus = () => {
        axios.put(route('change-status') + '/' + order.id, {statusValue:statusValue})
        .then(res => {
            setStatusChange(statusValue)
            setMessage(res.data.msg);
        })
    }
    return (
        <div className="one-back-order" style={styleOnDisplay}>
            <div className="order-first-line" onClick={toggle}>
                <div>{order.created}</div>
                <div>{order.updated}</div>
                <div style={{ color: statusColor }}>{statuses[statusChange]}</div>
                <div >{deliveryChoices[order.delivery_choice]}</div>

                <div>{order.user.name}</div>
                <div>{order.user.email}</div>
                <div>{order.restaurant.restaurant_name}</div>
                <div>{order.totalPrice} eur.</div>
                <span className="p-0 sfs-chevron">
                    <svg className="ml-2 -mr-0.5 h-7 w-7 pb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={styleOnChevron}>
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </span>
            </div>
            <div className="order-second-line" style={{ display: openDisplay }}>
                {
                    order.dishes.map((dish, index) => <DishInOrder key={index} dish={dish}></DishInOrder>)
                }
                <div className="total-delivery-prices-status-box">
                    <div className="status-box">
                        <label>Change status: </label>
                        <select className="input-xs" value={statusValue} onChange={chooseSelect}>
                            {
                                Object.entries(statuses).map(([key, oneStatus], index) => <option key={index} value={key}>{oneStatus}</option>)
                            }
                        </select>
                        <button className="one-color-btn orange-btn btn-xs" onClick={changeStatus}>Change</button>
                    </div>

                    <div className="prices-box">
                        <div className="one-price">Delivery price: {order.deliveryPrice} eur.</div>
                        <div className="one-price">Total price: {order.totalPrice} eur.</div>
                    </div>
                </div>
                <div className="adress-box">
                    <OrderAdress adress={order.adress} />
                </div>
            </div>
        </div>
    )
}
export default Order;
