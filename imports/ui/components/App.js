import React from 'react';
import Sidebar from './app/Sidebar.js';
//import Topbar from './app/Topbar.js';
import Main from './app/Main.js';
import TopBarContainer from '../containers/TopBarContainer.js';

function App() {
  return (
    <div>
      <TopBarContainer/>
      <Sidebar/>
      <Main/>
    </div>
  );
}
export default App;
