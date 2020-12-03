import React, { Fragment, useState } from 'react';

const EditUser = ({user}) => {
    const [FirstName, setFirstName] = useState(user.firstname);

    //Edit user

    const UpdateUser = async (e) => {
        e.preventDefault();
        try {
            const body = { FirstName };
            const response = await fetch(`http://localhost:5000/UpdateUser/${user.userid}`, {
            method: "PUT",
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
        <button
          type="button"
          class="btn btn-success"
          data-toggle="modal"
          data-target={`#id${user.userid}`}
        >
          Edit
        </button>

        <div
          class="modal"
          id={`id${user.userid}`}
          onClick={() => setFirstName(user.firstname)}
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Edit User Details </h4>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  onClick={() => setFirstName(user.firstname)}
                >
                  &times;
                </button>
              </div>

              <div class="modal-body">
                <form>
                  <label>First Name </label>
                  <input
                    type="text"
                    value={FirstName}
                    className="form-control"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </form>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-success"
                  data-dismiss="modal"
                  onClick={(e) => UpdateUser(e)}
                >
                  Save
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  data-dismiss="modal"
                  onClick={() => setFirstName(user.firstname)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
};

export default EditUser;