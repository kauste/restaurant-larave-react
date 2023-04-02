import Order from "@/components/BackOffice/Order/Order";
import Contexts from "@/components/Contexts";
import AuthenticatedBack from "@/Layouts/AuthenticatedBack";
import { Head } from "@inertiajs/inertia-react";
import axios from "axios";
import { useEffect, useState } from "react";

function OrderList(props) {
    //props
    const [orders, setOrders] = useState([]);
    const [állOrders, setAllOrders] = useState([]); // not changebla constant, used for search
    const [statuses, setStatuses] = useState([]);
    const [deliveryChoices, setDeliveryChoices] = useState([]);
    const [todayDate, setTodayDate] = useState('');
    const [beforeTwoWeeksDate, setBeforeTwoWeeksDate] = useState('');
    const [searchedDate, setSearchedDate] = useState('');
    const [message, setMessage] = useState(null);


    useEffect(() => {
        setOrders(props.orders);
        setAllOrders(props.orders);
        setStatuses(props.statuses);
        setDeliveryChoices(props.deliveryChoices);
        setTodayDate(props.todayDate);
        setBeforeTwoWeeksDate(props.beforeTwoWeeksDate);
    }, [])

    useEffect(() => {
        const messageSet = setTimeout(() => {
            setMessage(null);
        }, 20000)
        return () => {
            clearTimeout(messageSet);
        }
    },[message])

    const search = () => {
        axios.get(route('search-order-date') + '?date=' + searchedDate)
        .then(res => {
            setOrders(állOrders.filter(o => (res.data.ordersIds).includes(o.id)));
        })
    }
    const reset = () => {
        setOrders(állOrders);
    }

    return (
        <Contexts.BackContext.Provider value={{message, setMessage, statuses, deliveryChoices}}>
            <AuthenticatedBack auth={props.auth}>
                <Head title="Orders" />
                <div className="py-12">
                    <div className="order-back">
                        <div className="container">
                            <div className="card-header">
                                <h2>Orders</h2>
                            </div>
                            <div className="card-body-box">
                                <div className="order-card-body">
                                    <div className="info-box">
                                        <div className="ïnfo">After two weeks orders will be deleted automatically.</div>
                                    </div>
                                <div className="date-label-input-box">
                                    <label>Search date:</label>
                                    <input type="date"  max={todayDate} min={beforeTwoWeeksDate} onChange={e => setSearchedDate(e.target.value)}/>
                                    <button className="one-color-btn brown-outline-btn" onClick={search}>Search</button>
                                    <button className="one-color-btn brown-btn" onClick={reset}>Reset</button>
                                </div>
                                    <div className="one-back-order headings">
                                        <div className="order-first-line headings">
                                            <div>Created</div>
                                            <div>Updated</div>
                                            <div>Status</div>
                                            <div>Delivery choice</div>
                                            <div>User name</div>
                                            <div>User email</div>
                                            <div>Restaurant name</div>
                                            <div>Total price</div>
                                            <div></div>
                                        </div>
                                    </div>
                                    {
                                        orders.map((order, index) => <Order key={index} order={order}></Order>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedBack>
        </Contexts.BackContext.Provider>
    );
}
export default OrderList;