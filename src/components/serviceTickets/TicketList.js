import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"


export const TicketList = () => {
    const [tickets, changeTickets] = useState([])
    const [active, setActive] = useState("")
    const history= useHistory()
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
            const activeTicketCount =tickets.filter(t => t.dateCompleted ==="").length
            setActive(`There are ${activeTicketCount} open tickets to review`)
        },[tickets])


    return (
        // <> fragment putting all return elements into one JSX elemne t
        <>
            <button onClick={()=> history.push("/ticket/create")}> Create a New Ticket </button>
            {active}
            {
                //iterate locations and convert object to JXS 
                tickets.map(
                    (ticket) => {
                        return <div key={`ticket--${ticket.id}`}>
                            <p className={`ticket ${ticket.emergency ? 'emergency' : ''}`}>
                                {ticket.emergency ? "" : ""}
                                 {ticket.description} submitted by
                                {ticket.customer.name} and worked on by {ticket.employee.name} </p>
                        </div>
                    }
                )
            }
        </>
    )
}


