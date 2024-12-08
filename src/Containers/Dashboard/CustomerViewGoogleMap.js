import React, { useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import useGoogleMapsLoader from '../../Components/CustomMap/useGoogleMapsLoader'; // Custom hook for dynamic script loading
import { GoogleMap, Marker,InfoWindow } from '@react-google-maps/api';

const CustomerViewGoogleMap = (props) => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [infoWindowPosition, setInfoWindowPosition] = useState(null);

    const apiKey = "AIzaSyAQdQZU6zRL9w32DH2_9al-kkXnK38fnJY";
    const { isLoaded, error } = useGoogleMapsLoader(apiKey, 'places');
  
    const handleMapClick = (event) => {
      const geocoder = new window.google.maps.Geocoder();
      const latlng = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
  
      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const country = results[0].address_components.find(
            (component) => component.types.includes('country')
          );
  console.log(country)
          if (country) {
            setSelectedCountry(country.long_name);
            setInfoWindowPosition(latlng);
          }
        }
      });
    };
  const data = {
    address: [
      {
        latitude: "52.3791283",
        longitude: "4.900272"
      }
    ]
  };
  console.log(props.selectedCountry)
// const{latitude,longitude}=props.address[0]
  const center = {
    lat: parseFloat(47.3467),
    lng: parseFloat(43.789)
  };
  return (
    <>
          {!isLoaded ? (
      <div>Loading Google Maps...</div>
     ) : (
   
      <GoogleMap
        mapContainerStyle={{ height: '17.5rem', overflow: "hidden", marginTop: "0.2rem", width: '44rem' }}
        zoom={4}
        center={center}
        onClick={handleMapClick}
      >
        {/* Marker at the center */}
        <Marker position={center} />

        {/* Marker for selected country */}
        {infoWindowPosition && ( 
          <InfoWindow 
          options={{ disableAutoPan: true }}
          onCloseClick={() => setInfoWindowPosition(null)} 
          position={infoWindowPosition}>
            <div>{selectedCountry}</div>
          </InfoWindow>
        )}
      </GoogleMap>
      )}
      </>
  );
};
const mapStateToProps = ({ dashboard, auth }) => ({
  
  address: auth.userDetails.address,

});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  // setDashboardViewType
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerViewGoogleMap);



// import React, { useState, useEffect } from 'react';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
// import useGoogleMapsLoader from '../../Components/CustomMap/useGoogleMapsLoader'; // Custom hook for dynamic script loading

// const CustomerViewGoogleMap = (props) => {
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [infoWindowPosition, setInfoWindowPosition] = useState(null);

//   // Load Google Maps script dynamically
//   const apiKey = "AIzaSyAQdQZU6zRL9w32DH2_9al-kkXnK38fnJY";
//   const { isLoaded, error } = useGoogleMapsLoader(apiKey, 'places');

//   // Center from Redux props or fallback
//   const center = props.address?.[0]
//     ? {
//         lat: parseFloat(props.address[0].latitude),
//         lng: parseFloat(props.address[0].longitude),
//       }
//     : { lat: 47.3467, lng: 43.789 }; // Default center

//   const handleMapClick = (event) => {
//     if (!window.google?.maps?.Geocoder) {
//       console.error("Google Maps Geocoder is not loaded");
//       return;
//     }

//     const geocoder = new window.google.maps.Geocoder();
//     const latlng = {
//       lat: event.latLng.lat(),
//       lng: event.latLng.lng(),
//     };

//     geocoder.geocode({ location: latlng }, (results, status) => {
//       if (status === 'OK' && results[0]) {
//         const country = results[0].address_components.find((component) =>
//           component.types.includes('country')
//         );
//         if (country) {
//           setSelectedCountry(country.long_name);
//           setInfoWindowPosition(latlng);
//         }
//       } else {
//         console.warn("Geocoding failed:", status);
//       }
//     });
//   };

//   if (error) {
//     return <div>Error loading Google Maps: {error}</div>;
//   }

//   return (
//     <>
//       {!isLoaded ? (
//         <div>Loading Google Maps...</div>
//       ) : (
//         <GoogleMap
//           mapContainerStyle={{ height: '17.5rem', width: '44rem', marginTop: '0.2rem' }}
//           zoom={4}
//           center={center}
//           onClick={handleMapClick}
//         >
//           {/* Marker at the center */}
//           <Marker position={center} />

//           {/* InfoWindow for selected country */}
//           {infoWindowPosition && (
//             <InfoWindow
//               options={{ disableAutoPan: true }}
//               onCloseClick={() => setInfoWindowPosition(null)}
//               position={infoWindowPosition}
//             >
//               <div>{selectedCountry}</div>
//             </InfoWindow>
//           )}
//         </GoogleMap>
//       )}
//     </>
//   );
// };

// const mapStateToProps = ({ auth }) => ({
//   address: auth.userDetails?.address, // Fetch address dynamically
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       // Actions if any
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(CustomerViewGoogleMap);
