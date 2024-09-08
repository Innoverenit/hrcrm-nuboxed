
// import React, { useState } from 'react';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// const CustomerGoogleMap = ({ apiKey }) => {
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   console.log(selectedCountry)

//   const handleMapClick = (event) => {
    
//     const geocoder = new window.google.maps.Geocoder();
//     const latlng = {
//       lat: event.latLng.lat(),
//       lng: event.latLng.lng(),
//     };

//     geocoder.geocode({ location: latlng }, (results, status) => {
//       if (status === 'OK' && results[0]) {
//         const country = results[0].address_components.find(
//           (component) => component.types.includes('country')
//         );

//         if (country) {
//           setSelectedCountry(country.long_name);
//         }
//       }
//     });
//   };

//   return (
    
//       <GoogleMap
//       mapContainerStyle={{ height: '17.5rem',overflow:"hidden",marginTop:"0.2rem", width: '44rem' }}
//         zoom={4}
//         center={{ lat: 0, lng: 0 }}
//         onClick={handleMapClick}
//       >
//         {selectedCountry && (
//           <Marker position={{ lat: 0, lng: 0 }} label={selectedCountry} />
//         )}
//       </GoogleMap>
    
//   );
// };

// const mapStateToProps = ({ dashboard, auth }) => ({
  
//   address: auth.userDetails.address,

// });
// const mapDispatchToProps = (dispatch) => bindActionCreators({
//   // setDashboardViewType
// }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(CustomerGoogleMap);
import React, { useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { GoogleMap, LoadScript, Marker,InfoWindow } from '@react-google-maps/api';

const CustomerGoogleMap = (props) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const data = {
    address: [
      {
        latitude: "52.3791283",
        longitude: "4.900272"
      }
    ]
  };
  console.log(props.selectedCountry)
const{latitude,longitude}= data.address && data.address.length && data.address[0]
  const center = {
    lat: parseFloat(latitude),
    lng: parseFloat(longitude)
  };

  // const handleMapClick = (event) => {
  //   const geocoder = new window.google.maps.Geocoder();
  //   const latlng = {
  //     lat: event.latLng.lat(),
  //     lng: event.latLng.lng(),
  //   };

  //   geocoder.geocode({ location: latlng }, (results, status) => {
  //     if (status === 'OK' && results[0]) {
  //       const country = results[0].address_components.find(
  //         (component) => component.types.includes('country')
  //       );

  //       if (country) {
  //         setSelectedCountry(country.long_name);
  //         console.log(country.long_name)
  //       }
  //     }
  //   });
  // };

  return (
   
      <GoogleMap
        mapContainerStyle={{ height: '17.5rem', overflow: "hidden", marginTop: "0.2rem", width: '44rem' }}
        zoom={4}
        center={center}
        onClick={props.handleMapClick}
      >
        {/* Marker at the center */}
        <Marker position={center} />

        {/* Marker for selected country */}
        {props.setInfoWindowPosition && (
          <InfoWindow 
          options={{ disableAutoPan: true }}
          onCloseClick={() => props.setInfoWindowPosition(null)} 
          position={props.setInfoWindowPosition}>
            <div>{props.selectedCountry}</div>
          </InfoWindow>
        )}
      </GoogleMap>
  
  );
};
const mapStateToProps = ({ dashboard, auth }) => ({
  
  address: auth.userDetails.address,

});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  // setDashboardViewType
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerGoogleMap);









// import React, { useEffect, useState } from 'react';
// // import truck from "../../../../Assets/Images/trckColr.jpg";
// // import truckIconUrl from "../../../../Assets/Images/Frame.jpg";
// import { GoogleMap, Marker, Circle } from '@react-google-maps/api';

// const CustomerGoogleMap = (props) => {
//   const [center, setCenter] = useState(null);
//   const defaultCoordinates = { lat: 52.3676, lng: 4.9041 };
// //   useEffect(() => {
// //     const newCenter = shouldUseOrigin
// //       ? props.origin.location
// //       : props.latLngArray[0] || defaultCoordinates;

// //     setCenter(newCenter);
// //   }, [props.origin, props.latLngArray]);

// //   const shouldUseOrigin =
// //     props.latLngArray.length === 0 && props.origin && props.origin.location;

// //   const markers = shouldUseOrigin
// //     ? [
// //         props.origin.location && (
// //           <Marker
// //             key="origin-marker"
// //             position={props.origin.location}
// //             label="Origin"
// //           />
// //         ),
// //       ]
// //     : props.latLngArray.map((coord, index) => (
// //         <Marker
// //           key={index}
// //           position={coord}
// //           // label={(index + 1).toString()}
// //           icon={{
          
// //             // url: props.selectedMarker && props.selectedMarker.lat === coord.lat && props.selectedMarker.lng === coord.lng ? truck : truckIconUrl,
            
// //             scaledSize: new window.google.maps.Size(25, 25),
// //           }}
// //           onClick={() => props.handleMarkerClick(coord)}
// //         />
// //       ));

//   const mapOptions = {
//     zoom: 5,
//     center: center || defaultCoordinates, // Use center or defaultCoordinates
//     draggable: true,
//     zoomControl: true,
//   };

// //   const handleOnLoad = (map) => {
// //     const bounds = new window.google.maps.LatLngBounds();
// //     props.latLngArray.forEach((coord) => bounds.extend(coord));
// //     map.fitBounds(bounds);
// //   };
//   const radius = props.emptyTruckLoad ? props.emptyTruckLoad.radius * 1000 : 0;

  
  

 

//   return (
//     <GoogleMap 
//        mapContainerStyle={{ height: '17rem',overflow:"hidden",marginTop:"0.2rem", width: '44rem' }}
//       options={mapOptions}
//     //   onLoad={handleOnLoad}
//       center={center || defaultCoordinates} // Use center or defaultCoordinates
//     >
//       {/* {markers} */}
//       {/* {shouldUseOrigin && props.origin.location && (
//         <Marker position={props.origin.location} />
//       )} */}
//       <Circle
//         center={center || defaultCoordinates} // Use center or defaultCoordinates
//         radius={radius}
//         options={{
//           fillColor: 'blue',
//           fillOpacity: 0.2,
//           strokeColor: 'blue',
//           strokeOpacity: 0.8,
//           strokeWeight: 2,
//         }}
//       />
//     </GoogleMap>
//   );
// };

// export default CustomerGoogleMap;


