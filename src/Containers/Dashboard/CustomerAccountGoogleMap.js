import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import useGoogleMapsLoader from '../../Components/CustomMap/useGoogleMapsLoader';
import { GoogleMap,  Marker,InfoWindow } from '@react-google-maps/api';

const CustomerGoogleMap = (props) => {
  const apiKey = "AIzaSyAQdQZU6zRL9w32DH2_9al-kkXnK38fnJY";
  const { isLoaded, error } = useGoogleMapsLoader(apiKey, 'places');
 
  const data = {
    address: [
      {
        latitude: "52.3791283",
        longitude: "4.900272"
      }
    ]
  };
  console.log(props.selectedCountry)

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
        onClick={props.handleMapClick}
      >
    
        <Marker position={center} />

        {props.setInfoWindowPosition && ( 
          <InfoWindow 
          options={{ disableAutoPan: true }}
          onCloseClick={() => props.setInfoWindowPosition(null)} 
          position={props.setInfoWindowPosition}>
            <div>{props.selectedCountry}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerGoogleMap);