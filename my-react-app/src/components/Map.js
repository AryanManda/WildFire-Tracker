import GoogleMapReact from 'google-map-react';

import React from 'react';

const Map = ({ center, zoom, eventData }) => {
 

  let infoWindow = null; 

  const handleApiLoaded = (map, maps) => {
    
    eventData.forEach(ev => {
      if (ev.categories[0].id === 8) { 
        const [lng, lat] = ev.geometries[0].coordinates;
        
        const marker = new maps.Marker({
          position: { lat, lng },
          map,
          icon: {
            url: 'https://cdn-icons-png.flaticon.com/512/2271/2271138.png', 
            scaledSize: new maps.Size(30, 30) 
          }
        });

        marker.eventData = ev;

        marker.addListener('click', () => {
          if (infoWindow) {
            infoWindow.close();
          }

          infoWindow = new maps.InfoWindow({
            content: `
              <div>
                <h2>${ev.title}</h2>
                <p>Category: ${ev.categories[0].title}</p>
                <p>Date: ${new Date(ev.geometries[0].date).toLocaleDateString()}</p>
              </div>
            `,
          });

          infoWindow.open(map, marker);
        });
      }
    });
  };

  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'API KEY' }}
        defaultCenter={center}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals 
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)} 
      >
      </GoogleMapReact>
    </div>
  );
};

Map.defaultProps = {
  center: { lat: 42.3265, lng: -122.8756 },
  zoom: 6,
};

export default Map;
