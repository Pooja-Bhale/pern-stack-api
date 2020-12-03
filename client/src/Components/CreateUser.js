import React, { Fragment, useState } from 'react';

const CreateUser = () =>{

    const [FirstName, setFirstName] = useState("");

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = { FirstName };
            const response = await fetch("http://localhost:5000/CreateUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
         console.log(response);
         window.location = "/";
        } catch (err) {
            console.error(err.message);

        }
    }

    return (
        <Fragment>
            <h1 className="text-center mt-5">
                New User
                </h1>

                <form onSubmit={ onSubmitForm } >
                    <label>First Name </label>
                    <input type="text" 
                           className="form-control" 
                           value= {FirstName}
                           onChange={e => setFirstName(e.target.value)} />
                        <button className="btn btn-success" >Add</button>
                    
                </form>
            </Fragment>
    );
};

export default CreateUser;