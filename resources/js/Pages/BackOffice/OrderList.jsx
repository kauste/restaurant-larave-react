import Order from "@/components/BackOffice/Order/Order";
import Contexts from "@/components/Contexts";
import Paginator from "@/components/Paginator";
import PerPage from "@/components/PerPage";
import AuthenticatedBack from "@/Layouts/AuthenticatedBack";
import { Head } from "@inertiajs/inertia-react";
import axios from "axios";
import { useEffect, useState } from "react";

function OrderList(props) {
    //props
    const [orders, setOrders] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [deliveryChoices, setDeliveryChoices] = useState([]);
    const [todayDate, setTodayDate] = useState('');
    const [beforeTwoWeeksDate, setBeforeTwoWeeksDate] = useState('');
    const [searchedDate, setSearchedDate] = useState('');
    const [message, setMessage] = useState(null);
    const backgroundColor = '#fff';
    const [amountOfPages, setAmountOfPages] = useState(0);
    const [requiredPage, setRequiredPage] = useState(0);
    const [perPg, setPerPg] = useState(0);

    useEffect(() => {
        setOrders(props.orders.map((order, i) => ({...order, show:i < props.perPage ? true : false, index:i, isFiltered:true})));
        setStatuses(props.statuses);
        setDeliveryChoices(props.deliveryChoices);
        setTodayDate(props.todayDate);
        setPerPg(props.perPage);
        setAmountOfPages(props.amountOfPages);
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

    useEffect(() => {
        const initialValue = 0;
        const sumOfFiltered = orders.reduce(
            (accumulator, ord) => ord.isFiltered === true ? accumulator + 1 : accumulator,
            initialValue
        );
        setAmountOfPages(Math.ceil(sumOfFiltered / perPg))
    }, [orders])

    function changePage(page){
        setOrders(ord => ord.map((oneOrder, i) => {
            oneOrder.show = (i < (page + 1) * perPg && i >=  page * perPg && oneOrder.isFiltered === true) ? true : false;
            return oneOrder;
        }));
        setRequiredPage(page)
    }
    function changePerPage(){
        const pagesCount = Math.ceil(Object.keys(orders).length / perPg)
        setAmountOfPages(pagesCount)
        changePage(0);
    }


    const search = () => {
        axios.get(route('search-order-date') + '?date=' + searchedDate)
        .then(res => {
            setOrders(ord => ord.map(o => {
                o.isFiltered = res.data.ordersIds.includes(o.id) ?  true : false;
                return o;
                }).sort((a, b) => b.isFiltered - a.isFiltered || a.index - b.index)
                .map((ord, i) =>{
                    ord.show = (i < perPg   && i >= 0 && ord.isFiltered === true) ? true : false;
                    return ord;
                }))

            })
    } 
    const reset = () => {
        setOrders(o => o.map(ord => {
            ord.isFiltered = true
            return ord;
        }));
        changePage(0)
    }
    useEffect(() => {
        window.Echo.channel('scheduler.deleted.orders')
        .listen('OrdersDeleted', (e) => {
            setOrders(allOrders => allOrders.filter(oneOrder => e.ordersIds.includes(oneOrder.id)));
        })
    }, [])

    
    return (
        <Contexts.BackContext.Provider value={{message, setMessage, statuses, deliveryChoices, setOrders}}>
            <AuthenticatedBack auth={props.auth} backgroundColor={backgroundColor}>
                <Head title="Orders" />
                    <div className="py-12 order-back">
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
                                    <button className="one-color-btn black-outline-btn" onClick={search}>Search</button>
                                    <button className="one-color-btn orange-btn" onClick={reset}>Reset</button>
                                </div>
                                    <PerPage perPg={perPg} setPerPg={setPerPg} changePerPage={changePerPage}></PerPage>
                                    <Paginator amountOfPages={amountOfPages} requiredPage={requiredPage} changePage={changePage}></Paginator>
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
                                        orders.map((order, index) => order.show ? <Order key={index} order={order}></Order> : null)
                                    }
                                <Paginator amountOfPages={amountOfPages} requiredPage={requiredPage} changePage={changePage}></Paginator>
                                <PerPage perPg={perPg} setPerPg={setPerPg} changePerPage={changePerPage}></PerPage>
                                </div>
                            </div>
                        </div>
                    </div>
            </AuthenticatedBack>
        </Contexts.BackContext.Provider>
    );
}
export default OrderList;