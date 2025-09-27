import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import { toast, ToastContainer,Bounce } from 'react-toastify';


     
export default function UserForm(){
    const navigate = useNavigate()
    useEffect(() =>{
        const fetchInfo = async() => {
        const response = await fetch('/api/auth')
        const data = await response.json()


        if(!response.ok) {
            console.error("error: ",data.message)
            navigate('/')
            return 
        }
        }
        fetchInfo() 
    },[])

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSignIn, setSignIn] = useState(false)
  const endpoint = isSignIn ? '/api/login' : '/api/users';

  const onSubmit = async (data) => {
    const payload = data
    try {
    const response = await fetch(endpoint, {
        method:"POST" , 
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(payload)
    })
    const result = await response.json()

    if(!response.ok){
        toast.error(result.message)
        throw new Error(result.message)
    }
    console.log('Response: ', result.message)

    if (response.ok && !isSignIn){
       toast('Account created')
       return setSignIn(prev => !prev)
    }

    navigate('/')
    


    } catch (error) {
        console.error("Error: ", result.message)
    }
    
  };
    return(
        <>
        <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
            <h1>{isSignIn ? "Login" : "Register"}</h1>
            <label>User</label>
            <input type="text" placeholder="User..." {...register("user",{required:true, maxLength:10})} className={errors?.user && "input-error"}/>
            {errors?.user?.type === 'required' && <p className='error-message'>User is required</p>}
            </div>

            <div className="form-group">
             <label>Password</label>
            <input type="password" placeholder="Password..." {...register("password",{required:true, minLength: 7})} className={errors?.password && "input-error"}/>
            {errors?.password?.type === 'required' && <p className='error-message'>Password is required</p>}
            {errors?.password?.type === 'minLength' && <p className='error-message'>Password must have 7 characters or more.</p>}
            </div>
            
           
            <div className="form-group">
            <button type='submit'>{isSignIn ? "Login" : "Register"}</button>
            <p>{ isSignIn ? "Don't you have an account?" : "Already have an account?" } <a onClick={() => setSignIn(prev => !prev)}>{isSignIn ? "sign-up" : "sign-in"}</a>.</p>
            </div>
            </form>

        </div>
        
        </>
    )
}
