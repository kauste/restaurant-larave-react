import Order from "@/components/BackOffice/Order/Order";
import Contexts from "@/components/Contexts";
import AuthenticatedBack from "@/Layouts/AuthenticatedBack";
import { Head } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";

function OrderList(props) {

    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState(null);
    const [statuses, setStatuses] = useState([]);
    const [deliveryChoices, setDeliveryChoices] = useState([]);

    useEffect(() => {
        setOrders(props.orders);
        setStatuses(props.statuses);
        setDeliveryChoices(props.deliveryChoices);
    })

    useEffect(() => {
        setTimeout(() => {
            setMessage(null);
        }, 20000)
    }, [message])



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