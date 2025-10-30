import { useNavigate } from "react-router-dom"

export function Header({name}){
    const navigate = useNavigate()
    async function logout (){
        try {
            const response = await fetch('/api/logout',{
            method:'POST',
            credentials:'include',
            headers:{
                "Content-type":"application/json"
            }
        })
        const result = await response.json()

        if (!response.ok){
            const err = result.message
            console.error('error: ', err)
            return;
        }
        navigate('/userform')

        } catch (error) {
            console.error('error logout: ', error)
        }
        console.log('render header')
    }
    return(
        <>
        <header>
            <div className="headerPage">
                <p>Hello, {name}.</p>
                    <div className="buttonBetween">
                    <button id="buttonADD" onClick={() => navigate('/contactform')}><i className="fa-solid fa-user-plus"></i></button> <button onClick={logout} id="buttonLOGOUT"><i className="fa-solid fa-right-from-bracket"></i></button>
            </div>
                
            </div>
        </header>
        </>
    )
}