import Contexts from "@/components/Contexts";
import FrontOrder from "@/components/frontOffice/order/FrontOrder";
import Paginator from "@/components/Paginator";
import PerPage from "@/components/PerPage";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import { useState, useEffect, useRef } from "react";

function FrontOrders(props) {
    //props
    const[orders, setOrders] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [asset, setAsset] = useState('');
    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const [deliveryChoices, setDeliveryChoices] = useState([]);
    const [amountOfPages, setAmountOfPages] = useState(0);
    const [perPg, setPerPg] = useState(0);

    const [requiredPage, setRequiredPage] = useState(0);
    //for modal
    const [changeContactOrder, setChangeContactOrder] = useState(null);
    const [modalInfo, setModalInfo] = useState(null);
    // messages
    const [message, setMessage] = useState(null);
    const [messages, setMessages] = useState(null);
    //dom
    const [zoomDOM, setZoomDOM] = useState(null);
    
    const zoomContainer = useRef();
    // animate
    const backgroundZoomTiming = {
        duration: 300,
        iterations: 1,
        fill:'forwards',
        easing: 'ease'
      };
    const smallerBackground = () => {
        zoomDOM?.animate([{ transform:'scale(0.9)'}], backgroundZoomTiming);
    }
    const normalBackground = () => {
        zoomDOM?.animate([{ transform:'scale(1)'}], backgroundZoomTiming);
    };
    //first render
    useEffect(() => {
        setOrders(props.orders.map((orderRestaurant, i) => ({...orderRestaurant, show:i < props.perPage ? true : false})));
        setAmountOfPages(props.amountOfPages)
        setPerPg(props.perPage)
        setZoomDOM(zoomContainer.current);
        setStatuses(props.statuses)
        setAsset(props.asset)
        setDeliveryChoices(props.deliveryChoices)
        setDeliveryPrice(props.deliveryPrice)
    }, [])

    function changePage(page){
        setOrders(ord => ord.map((oneOrder, i) => ({...oneOrder, show: i < (page + 1) * perPg && i >=  page * perPg ? true : false})));
        setRequiredPage(page)
    }

    function changePerPage(){
        if(perPg <= 0) return;
        const pagesCount = Math.ceil(Object.keys(orders).length / perPg)
        setAmountOfPages(pagesCount)
        changePage(0);
    }
    useEffect(() => {
        setTimeout(()=> {
                setMessage(null)
            }, 20000)
    }, [message])

    useEffect(() => {
        window.Echo.channel('scheduler.deleted.orders')
        .listen('OrdersDeleted', (e) => {
            setOrders(allOrders => allOrders.filter(oneOrder => e.ordersIds.includes(oneOrder.id)));
        })
    }, [])

    return (
        <Contexts.FrontContext.Provider value={{message, setMessage, orders, setOrders, changeContactOrder, setChangeContactOrder, zoomDOM, statuses, asset, deliveryPrice, deliveryChoices, setModalInfo, smallerBackground, normalBackground, messages, setMessages, perPg, requiredPage, setAmountOfPages, changePage}}>
            <Authenticated auth={props.auth} modalInfo={modalInfo} setModalInfo={setModalInfo} forOrders={true}>
                <Head title="Orders" />
                <div className="py-12 order front">
                    <div className="max-w-7xl mx-auto sm:px-0 ">
                        <div className="container" ref={zoomContainer}>
                            <div className="card-header">
                                <h2>Your Orders</h2>
                            </div>
                            <div className="info-box">
                                <div className="ïnfo">
                                    <div>!!! Dear customers, please save your invoices in two weeks period, after this time, your orders will be deleted automatically.</div>
                                    <div>!!! You can edit your delivery data until the start of delivering, after courier takes your order, we no longer change information.</div>
                                </div>
                            </div>
                            <div className="card-body">
                            {
                                orders.length > 1 ?
                                <div>
                                    <PerPage perPg={perPg} setPerPg={setPerPg} changePerPage={changePerPage}></PerPage>
                                    <Paginator amountOfPages={amountOfPages} requiredPage={requiredPage} changePage={changePage}></Paginator>
                                </div>
                                : null
                            }
                                <div>
                                    <div className="all-orders">
                                        {
                                            orders.length !== 0 ?
                                               orders.map((order, index) => order.show === true ? <FrontOrder key={index} order={order}></FrontOrder> : null)
                                            :
                                            <div className="no-data">
                                                <p>No dishes added in cart yet.</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                                {
                                    orders.length > 1 ?
                                        <div>
                                            <PerPage perPg={perPg} setPerPg={setPerPg} changePerPage={changePerPage}></PerPage>
                                            <Paginator amountOfPages={amountOfPages} requiredPage={requiredPage} changePage={changePage}></Paginator>
                                        </div>
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Authenticated>
        </Contexts.FrontContext.Provider>
    )
}
export default FrontOrders;