import React from 'react';
import Sidebar from './Sidebar.js';
import Topbar from './Topbar.js';
import Main from './Main.js';

function App() {
  return (
    <div>
      <Topbar/>
      <Sidebar/>
      <Main/>
    </div>
  );
}


/*
const App = () => (
  <div>
    <Topbar/>
    <Sidebar/>
    <Main/>
  </div>
);

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
