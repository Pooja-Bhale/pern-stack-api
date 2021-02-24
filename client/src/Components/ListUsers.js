import React, { Fragment, useEffect, useState } from "react";
import EditUser from "./EditUser";
import SongList from "./SongList";

var ListUsers = () => {
  var [allUsers, setUsers] = useState([]);

  //Delete a user
  var deleteUser = async (id) => {
    try {
      var deleteUser = await fetch(
        `https://uf5dnq4e49.execute-api.ap-south-1.amazonaws.com/dev/DeleteUser/${id}`,
        {
          method: "DELETE",
        }
      );
      setUsers(allUsers.filter((user) => user.id !== id));
      console.log(deleteUser);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Get all Users
  var getUsers = async () => {
    try {
      var response = await fetch(
        "https://uf5dnq4e49.execute-api.ap-south-1.amazonaws.com/dev/Users"
      );
      var jsonData = await response.json();
      setUsers(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);


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
            <th>Media</th>
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
              <td>
              <SongList id={user.id}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListUsers;
