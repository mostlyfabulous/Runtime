import React from 'react';
import Sidebar from './app/Sidebar.js';
import Topbar from './app/Topbar.js';
import Main from './app/Main.js';

function App() {
  return (
    <div>
      <Topbar/>
      <Sidebar/>
      <Main/>
    </div>
  );
}
export default App;
