import React from 'react';
import Timeline from './components/TimeLine/Timeline';
import eventsData from './components/data.json';

function App() {
  return (
    <div className="App">
      <h1>My Timeline App</h1>
      <Timeline events={eventsData} />
    </div>
  );
}

export default App;
