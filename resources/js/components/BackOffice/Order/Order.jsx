function Order ({order, statuses, deliveryChoices}) {
    return (
        <div className="one-back-order">
            <div className="order-first-line">
                <div>{order.created}</div>
                <div>{order.updated}</div>
                <div>{statuses[order.status]}</div>
                <div>{order.user.name}</div>
                <div>{order.user.email}</div>
                <div>{order.restaurant.restaurant_name}</div>
                <div>{order.totalPrice} eur.</div>
                <span className="p-0 sfs-chevron">
                    <svg className="ml-2 -mr-0.5 h-7 w-7 pb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                </span>
            </div>
        </div>
    )
}
export default Order;
