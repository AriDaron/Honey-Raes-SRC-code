// responsibility to determine which view of app should be renedered depending on what URL in browser is 
//works in tandem with NavBar
//listen for URL to change , when it does change evaluate each route , whichever matches will render

import React from "react"
import { Route } from "react-router-dom"
import { CustomerList } from "./customers/CustomerList"
import { EmployeeList } from "./employees/EmployeeList"
import { TicketForm } from "./serviceTickets/TicketForm"
import { TicketList } from "./serviceTickets/TicketList"

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/customers">
                <CustomerList />
            </Route>

            <Route  path="/employees">
                <EmployeeList />
            </Route>
            <Route exact path="/tickets">
                <TicketList />
            </Route>
            <Route  path="/tickets/create">
                <TicketForm />
            </Route>
        </>
    )
}



//**RECAP **//
//need react router  dom 3rd party
//need Link component to define anchor tags, this broadcasts message that URL has changed 
//Route component listens for that even ten displays the appropriate component