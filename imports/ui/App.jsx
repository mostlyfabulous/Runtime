import React from 'react';
import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';
import Main from './Main.jsx';

const App = () => (
  <div>
    <h1 className='mainContent'>Runtime</h1>
    <Sidebar/>
    <Topbar/>
    <Main/>
  </div>
);

/*
const App = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <Hello />
    <Info />
    <Header />
    <Calendar />

  </div>
);
*/
export default App;
