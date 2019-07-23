import React from 'react';
import Sidebar from './app/Sidebar.js';
import Topbar from './app/Topbar.js';
import MainContainer from './app/Main.js';

function App() {
  return (
    <div>
      <Topbar/>
      <Sidebar/>
      <MainContainer/>
    </div>
  );
}
export default App;
