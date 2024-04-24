import React, { useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { GoogleMap, LoadScript, Marker,InfoWindow } from '@react-google-maps/api';

const CustomerViewGoogleMap = (props) => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [infoWindowPosition, setInfoWindowPosition] = useState(null);
  
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
const{latitude,longitude}=props.address[0]
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
  
  );
};
const mapStateToProps = ({ dashboard, auth }) => ({
  
  address: auth.userDetails.address,

});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  // setDashboardViewType
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerViewGoogleMap);