import React, { Fragment } from 'react';
import './App.css';

//components

import CreateUser from './Components/CreateUser';
import ListUsers from './Components/ListUsers';


function App() {
  return (
   <Fragment>
     <div className="container">
     <CreateUser />
     <ListUsers />
       </div>
   </Fragment>
  )
}

export default App;
