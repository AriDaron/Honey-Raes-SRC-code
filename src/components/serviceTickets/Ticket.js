//responsible for rendering individual tickets 

import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"

export const Ticket = () => {
    const [ticket, set] = useState({})  // State variable for current ticket object
    const [employees, setEmployees] = useState([])
    const { ticketId } = useParams()  // Variable storing the route parameter
    const history = useHistory()

    //this useEffect runs only with the ticketId route param changed 
    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets/${ticketId}?_expand=customer&_expand=employee`)
                .then(res => res.json())
                .then((data) => {
                    set(data) //sets state when data come back fro API
                })
        },
        [ticketId]  // Above function runs when the value of ticketId change (GO GET THAT TICKET)
    )

    useEffect(
        () => {
            return fetch("http://localhost:8088/employees")
                .then(res => res.json())
                .then((data) => {
                    setEmployees(data)
                })
        },
        [] //Only run when initial JSX rendering is complete

    )
    //whenever user triggers an edit construct a new object with all keys and values to replace the one stored in the API, specicy all except the id
    const assignEmployee = (changeEvent) => {
        const newServiceTicketObj = {
            "customerId": parseInt(localStorage.getItem("honey_customer")),
            "employeeId": parseInt(changeEvent.target.value),
            "description": ticket.description,
            "emergency": ticket.emergency,
            "dateCompleted": ticket.dateCompleted
        }


        return fetch(`http://localhost:8088/serviceTickets/${ticketId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newServiceTicketObj)
        })
            .then(() => {
                history.push("/serviceTickets")
            })
    }

    return (
        <>
            <h2>Ticket Details </h2>
            <section className="ticket">
                <h3 className="ticket__description">{ticket.description}</h3>
                <div className="ticket__customer">Submitted by {ticket.customer?.name}</div>
                <div className="ticket__employee">
                    <select id="employee" onChange={assignEmployee}>
                        {
                            employees.map(
                                (employee) => {
                                    return <option value={employee.id} key={`employee--${employee.id}`}>
                                        {employee.name}
                                    </option>
                                }
                            )  //.map converts data in 1 array to a differnt form in another array 
                        }
                    </select>
                </div>
            </section>
        </>
    )
}