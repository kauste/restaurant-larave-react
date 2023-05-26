function PerPage({perPg, setPerPg, changePerPage}){
        return (                    
        <div className="per-page-bin">
            <label htmlFor="perPage" className="per-page">Per page</label>
            <input type="number" className="amount-input" id="perPage"  min="4" max="20" value={perPg} onChange={(e) => setPerPg(e.target.value)}></input>
            <button className="one-color-btn green-btn" onClick={changePerPage}>Go</button>
        </div>
        )     
}
export default PerPage;