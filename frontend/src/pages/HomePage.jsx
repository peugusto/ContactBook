import { useState } from "react";
import { Header } from "../layouts/Header";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import NextPrevious from "../components/NextPrevious";

export default function HomePage(){
    const navigate = useNavigate()
    const { contactsLoader, name, paginationLoader} = useLoaderData();

    const [contacts , setContact] = useState(contactsLoader)
    const [pagination, setPagination] = useState(paginationLoader)
    console.log(contacts)
    const fetchPage = async(url) =>{
      const endpoint = url ? `${url}` : '/api/contacts'
      try {
        const response = await fetch(endpoint)
        const result = await response.json()
        if (result){
          setContact(result.contacts)
          setPagination(result.pagination)
          window.scrollTo({
            top:0,
            behavior:'smooth'
          });
        }
      } catch (error) {
        console.log(error)
      }
    }
    const deleteContact = async(_id) =>{
      try {
        const response = await fetch('/api/contacts', {
        method: 'DELETE',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({_id})
      })
      const result = await response.json()

      if(!response.ok){
        toast.error('error: ',result.message)
        return console.error('error: ', result.message)
      }


      toast('Contact deleted!');
      navigate('.',{replace:true})

      } catch (error) {
        console.error('error: ', error)
        toast.error('error internal ')
      }
    }
    let content;

    if (!contacts || contacts.length === 0) {
    content = <p>You don't have any contact.</p>;
    } else {
    content = (
      <ul>
        {contacts.map(contact => (
          
          <li key={contact._id}>
            <div className="contactsContent">
                  <h2>{contact.name}</h2>
                  <p><i className="fa-solid fa-phone"></i> {contact.phone}</p>
                  <p><i className="fa-solid fa-location-dot"></i> {contact.address}</p>
                  <div className="buttonBetween">
                  <button onClick={() => navigate(`/contactform?id=${contact._id}`)}>EDIT</button><button onClick={() => deleteContact(contact._id)}>DELETE</button>
                  </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }
    return(
        <>
        <Header name={name}/>
        {content}
        {content && <NextPrevious pagination={pagination} onPage={fetchPage}/>}
        </>
    )
}