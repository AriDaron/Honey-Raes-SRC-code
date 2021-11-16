import React, {useEffect, useState} from "react"

export const CustomerList = () => {
    //useState()  set up a state variable to hold the state of customers from API in application state
   
    //useState sets a place to store state 
    
    const [customers, setCustomers] = useState([]) //useState returns an array when invoked  'customers'=initial state  'setCustomers'=transient sate useState([]) initial value =empty array
    const [TotalCustomerMessage, updateMessage] = useState("") 

    //useEffect() When state changes it invokes a function. like an event listener. used to watch specific state variables and define logic that should run when that state changes 
    //go get data from API and pull it into application state with fetch 
    // Single responsibiltiy observe customers state
    useEffect(
        () => {
            fetch ("http://localhost:8088/customers")
            .then(res => res.json())  // then convert JSON string into javascript  
            .then((customerArray) => {   //customerArray goes to get current info from Array 
                setCustomers(customerArray)  
            })
        },
        []
    )

    

// Single responsibiltiy observe message state

    useEffect(
        () => {
            if (customers.length===1) {
                updateMessage("You have 1 customer")   
            }
            else {
                updateMessage(`You have ${customers.length} customers`)
            }

        },
        [customers]
    )

    // you can only return 1 element (one scope)
    return (
        <>
        <div>{TotalCustomerMessage}</div>
        {
            customers.slice(0,5).map(
                (customerObject)=> {
                    return <p key= {`customer--${customerObject.id}`}> {customerObject.name} </p>
                }
            )
        }
        </>
    )
}