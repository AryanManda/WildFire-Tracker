import { useState, useEffect } from 'react'

import React from 'react';
import Map from './components/Map'
import Loader from './components/Loader'


function App() {
  const [eventData, setEventData ] = useState([])
  const [loading, setLoading ] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const res = await fetch('https://eonet.gsfc.nasa.gov/api/v2.1/events');
      const { events } = await res.json();
  
      setEventData(events);
      console.log(events); // 👈 log here after data is fetched
  
      setLoading(false);
    };
  
    fetchEvents();
  }, []);
  

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <h1 className="app-header" style={{ textAlign: 'center', padding: '10px 0', backgroundColor: '#FF5349' }}>Wildfire Tracker: Powered by NASA</h1>
      {!loading ? <Map eventData={eventData} /> : <Loader/>}
    </div>
  );
}

export default App;
