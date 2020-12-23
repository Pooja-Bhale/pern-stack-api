import React, { Fragment, useEffect, useState } from "react";
import EditUser from "./EditUser";

var ListUsers = () => {
  var [allUsers, setUsers] = useState([]);

  //Delete a user
  var deleteUser = async (id) => {
    try {
        var deleteUser = await fetch(`http://localhost:5000/DeleteUser/${id}`, {
        method: "DELETE",
      });
      setUsers(allUsers.filter((user) => user.id !== id));
      console.log(deleteUser);
    } catch (err) {
      console.error(err.message);
    }
  };

  // GEt all Users
  var getUsers = async () => {
    try {
        var response = await fetch("http://localhost:5000/Users");
        var jsonData = await response.json();

      setUsers(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  console.log(allUsers);

  return (
    <Fragment>
      <h4 Style="margin-left:30px; ">All Users </h4>
      <table className="table" Style="margin-left:30px; margin-right:30px;">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Lame</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.FirstName}</td>
              <td>{user.LastName}</td>
              <td>
                <EditUser user={user} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListUsers;
