import { redirect } from "react-router-dom"

export async function getContacts(){
    const response = await fetch('/api/contacts')
    const result = await response.json()
        
          if (!response.ok) {
           return redirect('/userform')
          }
          

          return{
            contacts: result.contacts,
            name: result.name
          }
}
