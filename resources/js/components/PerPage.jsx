function PerPage({perPg, setPerPg, changePerPage}){
        const changePage = (e) => {
            if(e.target.value < 4) return setPerPg(4)
            if(e.target.value > 20) return setPerPg(20)
            return setPerPg(e.target.value)
        }
        return (                    
        <div className="per-page-bin">
            <label htmlFor="perPage" className="per-page">Per page</label>
            <input type="number" className="amount-input" id="perPage"  min="4" max="20" value={perPg} onChange={changePage}></input>
            <button className="one-color-btn green-btn" onClick={changePerPage}>Go</button>
        </div>
        )     
}
export default PerPage;