import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ToastContainer,toast, Bounce } from 'react-toastify';

export default function ContactForm(){
  const { register, handleSubmit, formState: { errors },reset } = useForm();
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const [isEditing,setEditing] = useState(!!id);

  useEffect(() =>{
    const checkParams = async() =>{
        try {
        if (!id) return;
        const response = await fetch(`api/contacts/${id}`)
        const result = await response.json()

        if(!response.ok){
            console.error('error: ',result.message)

        }
        setEditing(true)
        reset(result.contact[0])
        

    } catch (error) {
        setEditing(false)
        console.error('error: ',error)
    }
    }
    checkParams();
    
  },[id,reset])

  const onSubmit = async (data) => {
    try {
    const response = await fetch(isEditing ? `/api/contacts/${id}`: '/api/contacts', {
        method: isEditing ? "PATCH" : "POST" , 
        headers: {"Content-Type":"application/json"},  
        body: JSON.stringify(data)
    })
    const result = await response.json()

    if(!response.ok){
        return console.error("Error: ", result.message)
    }
    navigate('/')
    toast(isEditing ? "Contact updated" : "Contact created ");
    } catch (error) {
        console.error("Error: ", error)

    }
  };
    return(
        <>
        <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
            <h1>{isEditing ? "Edit Contact" : "Add Contact"}</h1>
            <label>Name</label>
            <input maxLength={20}type="text" placeholder="Name..." {...register("name",{required:true,maxLength:12})} className={errors?.name && "input-error"}/>
            {errors?.name?.type === 'required' && <p className='error-message'>Name is required</p>}
            </div>

            <div className="form-group">
            <label>Phone</label>
            <input maxLength={12} type="number" step="any" placeholder="Phone..." {...register("phone",{required:true, minLength: 9})} className={errors?.phone && "input-error"}/>
            {errors?.phone?.type === 'required' && <p className='error-message'>Phone is required</p>}
            {errors?.phone?.type === 'minLength' && <p className='error-message'>Phone must have 9 characters or more.</p>}
            </div>

            <div className="form-group">
            <label>Address</label>
            <input maxLength={20}type="text" placeholder="Address..." {...register("address",{required:true, minLength:8})} className={errors?.address && "input-error"}/>
            {errors?.address?.type === 'required' && <p className='error-message'>Address is required</p>}
            {errors?.address?.type === 'minLength' && <p className='error-message'>Address must have 8 characters or more.</p>}
            </div>
            
           
            <div className="form-group">
            <div className="buttonBetween">
            <button type='button' id='cancelButton'onClick={() => navigate('/')}>Cancel</button><button type='submit'>{isEditing ? "Save":"Create"}</button>
            </div>
            </div>
            </form>
        </div>
        
        </>
    )
}
