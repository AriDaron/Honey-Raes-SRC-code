import React, { useState } from "react"
import { useHistory } from "react-router";

export const NewEmployeeForm = () => {

    const [employee, update] = useState({
        name: "",
        specialty: ""
    });

    const history = useHistory()

    // below is the object that we want to send to our API
    const saveNewHire = (event) => {
        event.preventDefault()

        const newHire = {
            name: employee.name,
            specialty: employee.specialty,
           
        }


        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newHire)   //send body of the request can only send strings so must strigify 
        }
        return fetch("http://localhost:8088/employees", fetchOption)
            .then(() => {
                history.push("/employees") //push to browser history and take user to tickets
            })
    }

    return (
        <form className="newHireForm">
            <h2 className="newHireForm__title">New Hire Enrollment </h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="New Hire Name"
                        onChange={
                            (evt) => {
                                const copy = { ...employee } //creates a copy of state 
                                copy.name = evt.target.value
                                update(copy) //make the copy the new state 
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
            <div className="form-group">
                    <label htmlFor="specialty">Specialty:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Specialty"
                        onChange={
                            (evt) => {
                                const copy = { ...employee } //creates a copy of state 
                                copy.specialty = evt.target.value
                                update(copy) //make the copy the new state 
                            }
                        } />
                </div>
            </fieldset>
            <button onClick={saveNewHire} className="btn btn-primary" >
                Hire Employee
            </button>
        </form>
    )
}
