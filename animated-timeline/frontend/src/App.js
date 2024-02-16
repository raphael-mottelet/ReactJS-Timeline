import React from 'react';
import Timeline from './components/TimeLine/Timeline';
import eventsData from './components/data.json';
import './App.css'

function App() {
  return (
    <div className="App">
      <h1 className='apptitle'>non-responsive simple timeline app</h1>
      <Timeline events={eventsData} />
    </div>
  );
}

export default App;
