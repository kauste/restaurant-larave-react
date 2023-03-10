import AuthenticatedBack from "@/Layouts/AuthenticatedBack";

function OrderList() {
    const [message, setMessage] = useState(null);
    useEffect(() => {
        setTimeout(() => {
            setMessage(null);
        }, 20000)
    },[message])


    return (
        <AuthenticatedBack auth={props.auth} message={message}>
        <Head title="Restaurants"/>
        <div className="py-12 order">
                <div className="max-w-7xl mx-auto sm:px-0 ">
                    <div className="container">
                        <div className="card-header">
                            <h2>Orders</h2>
                        </div>
                        {
                            // orders.map((order, index) => <FrontOrder key={index} order={order} setChangeContactOrder={setChangeContactOrder} statuses={props.statuses} asset={props.asset} deliveryPrice={props.deliveryPrice} deliveryChoices={props.deliveryChoices} getInvoiceUrl={props.getInvoiceUrl} setMessage={setMessage}></FrontOrder>)
                        }
                    </div>
                </div>
            </div>
        </AuthenticatedBack>
    );
}
export default OrderList;