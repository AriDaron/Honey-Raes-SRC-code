//responsible for rendering individual tickets 

import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const Employee = () => {
    const [employee, set] = useState({})  // State variable for current ticket object
    const { employeeDetailsId } = useParams()  // Variable storing the route parameter

    useEffect(
        () => {
            fetch(`http://localhost:8088/employees/${employeeDetailsId}`)
                .then(res => res.json())
                .then((data)=>{
                    set(data) //sets state when data come back fro API
                })
        },
        [ employeeDetailsId ]  // Above function runs when the value of ticketId change (GO GET THAT TICKET)
    )

    return (
        <>
        <h2>Employee Details </h2>
            <section className="employee">
                <h3 className="employee_name">{employee.name}</h3>
                <div className="ticket__customer">Employee Speciality: {employee.specialty}</div>
            </section>
        </>
    )
}

