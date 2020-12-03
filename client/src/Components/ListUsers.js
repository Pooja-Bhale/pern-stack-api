import React, { Fragment, useEffect, useState } from 'react';
import EditUser from './EditUser';

const ListUsers = () => {

    const [allUsers, setUsers] = useState([]);   

    //Delete a user
    const deleteUser = async (id)=> {
        try {
            const deleteUser = await fetch(`http://localhost:5000/DeleteUser/${id}`, {
            method: "DELETE"
        });
        setUsers(allUsers.filter(user => user.userid !== id));
        console.log(deleteUser);
        } catch (err) {
            console.error(err.message);
        }
    };
    
    // GEt all Users
    const getUsers =  async() => {
        try {
            const response = await fetch("http://localhost:5000/Users");
            const jsonData = await response.json();

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
            
              <h4>All Users </h4>
              <table class="table">
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Lame</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
        { allUsers.map(user => (
        <tr key={user.userid}>
        <td>{user.firstname}</td>
        <td>{user.lastname}</td>
        <td><EditUser user={user}/></td>
        <td><button className="btn btn-danger" onClick={() => deleteUser(user.userid)}>Delete</button></td>
      </tr>
        ))}
      
    </tbody>
  </table>
            </Fragment>
      
    );
};

export default ListUsers;
