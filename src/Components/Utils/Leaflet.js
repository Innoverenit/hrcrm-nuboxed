
import React, { Component } from "react";
import { Button } from "antd";


import L from "leaflet";
import { MapLayer, Map, TileLayer, withLeaflet,CircleMarker } from "react-leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import Routing from "./RoutingMachine";
class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      zoomedOut: false,
      isMapInit: false,
    };
  }
  toggleMapZoom = (bool) => this.setState({ zoomedOut: bool });
  componentDidMount() {
    setTimeout(() => {
      // this.mapRef.current.leafletElement.invalidateSize();
      this.setState({
        isMapInit: true,
      });
    }, 3000);
  }
  componentDidUpdate() {
    this.mapRef.current.leafletElement.invalidateSize();
  }
  saveMap = (map) => {
    this.map = map;
    this.setState({
      isMapInit: true,
    });
  };

  render() {
    const {
      markers,
      width,
      height,
      margin,
      zoom,
      centerPosition,
      MyPopupMarker,
      candidatePostData,
      userAddress,
      address,
      addresses,
    } = this.props;
    console.log("address",markers)
    console.log("prop",this.props)
    // console.log("prop1",this.props.candidatePostData)
    const { zoomedOut } = this.state;
    const position = centerPosition;
    const image = new L.Icon({
      iconUrl: "hello",
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
      // iconSize: mark.type === "Headquarters" ? [40, 40] : [25, 25], // size of the icon
      // shadowSize: mark.type === "Headquarters" ? [80, 60] : [50, 50], // size of the shadow
      // iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [15, 40], // the same for the shadow
      // popupAnchor: [-3, -76]// point from which the popup should open relative to the iconAnchor
    });
  
    // const waypoints = [];
    // let startLat;
    // let startLng;
    // let endLat = markers.length && markers[0].lat;
    // let endLng = markers.length && markers[0].lng;
    // console.log("end",endLat)
    // userAddress &&
    // userAddress.forEach((l) => {
    //     if (l.latitude && l.longitude) {
    //       startLat = parseFloat(l.latitude);
    //       startLng = parseFloat(l.longitude);
    //     }
    //   });
    // waypoints.push(L.latLng(startLat, startLng));
    // waypoints.push(L.latLng(endLat, endLng));
    // if (!markers) {
    //   return <p>No locations </p>;
    // }
    return (
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", right: 7, top: 2, zIndex: 401 }}>
          <Button.Group size="medium">
            {zoomedOut && (
              <Button
                style={{ border: "0.06em solid #aaa" }}
                onClick={() => this.toggleMapZoom(false)}
              >
                
               NEAR BY 
               
              </Button>
            )}
            {!zoomedOut && (
              <Button
                style={{ border: "0.06em solid #aaa" }}
                onClick={() => this.toggleMapZoom(true)}
              >
                 WORLD WIDE 
                
              </Button>
            )}
          </Button.Group>
        </div>
        <Map
          ref={this.mapRef}
          center={position || null}
       
          zoom={zoomedOut ? 2 : zoom}
          style={{
            width: width || "auto",
            height: height || "85vh",
            margin: margin || "0.125em",
            marginTop: "0.5em",
            border: "0.06em solid #ccc",
          }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <MyMarkersList markers={markers} />  */}
             {/* {waypoints[0] !== undefined ? (
            this.state.isMapInit && (
              <Routing map={this.mapRef.current} waypoints={waypoints} />
            )
          ) : ( */}
            <CircleMarker
           ref={this.bindCircle}
          center={position}
          color="green"
          fillColor="red"
          radius={20}
          fillOpacity={0.5}
          stroke={false}
        >
            <div style={{ display: "none" }}>
               {markers &&
                markers.map((mark, i) =>
                  MyPopupMarker ?   
                  <MyPopupMarker 
                    key={i} 
                    mark={mark} 
                    // position={position}
                    candidatePostData={candidatePostData}
                  /> : 
                  <></>
                 )}
            </div> 
            </CircleMarker>
          {/* )}  

          {/* {this.state.isMapInit && waypoints.length && <Routing map={this.map} waypoints={waypoints} />} */}
        </Map>
      </div>
    );
  }
}

export default MapContainer;


