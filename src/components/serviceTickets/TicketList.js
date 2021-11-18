import React, { useEffect, useState } from "react"


export const TicketList = () => {
    const [tickets, changeTickets] = useState([])
    const [totalServiceTickets, updateMessage] = useState("") 

    //useEffect() When state changes it invokes a function. like an event listener. 
    //used to watch specific state variables and define logic that should run when that state changes 
    //go get data from API and pull it into application state with fetch 

    useEffect(
        () => {
            fetch("http://localhost:8088/serviceTickets?_expand=employee&_expand=customer")
                .then(res => res.json())
                .then((data) => {
                    changeTickets(data)
                })
        },
        // leave DEPENDANCY ARRAY EMPTY , or infinite loop 
        []
    )

    useEffect(
        () => {
            if (tickets.length===1) {
                updateMessage("You have 1 open service ticket")   
            }
            else {
                updateMessage(`You have ${tickets.length} open Service tickets`)
            }
    
        },
        [tickets]
    )


    return (
        // <> fragment putting all return elements into one JSX elemne t
        <>
    <div>{totalServiceTickets}</div>
            {
                //iterate locations and convert object to JXS 
                tickets.map(
                    (ticket) => {
                        return <div key={`ticket--${ticket.id}`}>
                            <p> {ticket.description} submitted by
                                {ticket.customer.name} and worked on by {ticket.employee.name} </p>
                        </div>
                    }
                )
            }
        </>
    )
}


