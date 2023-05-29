function Paginator({amountOfPages, requiredPage, changePage}){

    return(
            amountOfPages > 1 ?
                <div className="paginator-box">
                    {
                        Array.from(Array(amountOfPages).keys()).map((page) => <div onClick={() => changePage(page)} className={requiredPage == page ? 'active one-color-btn orange-outline-btn' : 'one-color-btn orange-outline-btn'}key={page}>{page + 1}</div>)
                    }
                </div>
            : null
    )
}
export default Paginator;