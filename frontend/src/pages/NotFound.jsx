import { Link } from "react-router-dom";

export default function ErrorPage(){
    return(
        <>
        <h1>ERROR</h1>
        <p><Link to='/'>Back to HomePage</Link></p>
        </>
    )
}