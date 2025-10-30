
export default function NextPrevious({pagination,onPage}){
    return(
        <div className="buttonBetween">
        {pagination.previousUrl && <button onClick={() => onPage(pagination.previousUrl)} id="nextprev">Previous</button>}
        <button onClick={() => onPage(pagination.nextUrl)} id="nextprev">Next</button>
        </div>
    )
}