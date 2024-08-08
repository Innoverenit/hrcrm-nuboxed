import React from "react";
import { Marker, Popup } from "react-leaflet";
import { base_url } from "../../../../Config/Auth";
import { Link } from "../../../../Components/Common";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("../../../../Assets/Images/download.png"),
  iconUrl: require("../../../../Assets/Images/download.png"),
  shadowUrl: require("../../../../Assets/Images/download.png"),
  iconSize: [15, 25], // size of the icon
  shadowSize: [35, 25], // size of the shadow
  shadowAnchor: [15, 40],
  // iconSize: [50, 50],
  // iconAnchor: [25, 25],
});

export default function LocationMapPopUpMarker({ mark }) {
  console.log("Mark",mark.fullName);
  console.log("Mark3",mark.address)
  console.log("Mark1",mark.latitude)
  console.log("Mark1",mark.longitude)
  console.log("Mark2",mark)
  console.log("Mark4",mark.availableDate)
  //console.log("Mark3",data)
 
  //const data=mark.address &&mark.address.length &&mark.address[0].state
  
  const {
    
    name,
    category,
    sector,
    availableDate,
    grandTotal,
    mode,
    currencyName,
    middleName,
    address,
    lastName,
    imageId,
    imageURL,
    city,
    address1,
    state,
    pinCode,
    country,
    addresses,
    metaData,
    skillList,
    wonCount,
    lostCount,
  } = mark && mark.data ;

  console.log("Mark",mark.fullName);
  console.log("Mark1",mark.lat)
  console.log("Mark4",mark.address)
  console.log("Mark2",mark)
 
  console.log(mark.imageURL);
  let picture;
  if (imageId) {
    picture = `${base_url}/image/${imageId}`;
  } else if (imageURL) {
    picture = imageURL;
  } else {
    picture = require("leaflet/dist/images/marker-icon.png");
  }

  const image = new L.Icon({
    iconUrl: picture,
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    iconSize: mark.type === "Headquarters" ? [40, 40] : [25, 25], // size of the icon
    shadowSize: mark.type === "Headquarters" ? [80, 60] : [50, 50], // size of the shadow
    // iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [15, 40], // the same for the shadow
    // popupAnchor: [-3, -76]// point from which the popup should open relative to the iconAnchor
  });

  return (
    <Marker
  // position={["0", "0"]}
    position={[mark.lat, mark.lng]}
      icon={image}
      // icon={customMarkerIcon}
     >
      
      <Popup className="!w-[18rem]">

    
        <div className="details">
          <div
            fontSize="1.1rem"
            style={{ display: "flex", justifyContent: "center" }}
          >
             <Link
              toUrl={`/customer/${mark.customerId}`}
              title={`${name || ""} `}
            
              // title={`${name || ""} `}
            />
          </div>     
           <div>  
          <div>        
          </div>
        </div>
        <div style={{ display: "flex" }}>
          {/* {(country && country) || ""}&nbsp;
          {(pinCode && pinCode) || ""}&nbsp; */}
        </div>
      </div>

        <mt-3 />
        <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto w-full ">
          <div
            style={{
              width: "49%",
              padding: "0px 0px",
              textAlign: "center",
              background: "#0073a8",
              color: "white",
              border: "0.06em solid #ddd",
              borderRadius: "0.3rem",
              boxShadow: "0 0.5em 0.37em -0.37em rgb(46,44,44)",
            }}
          >
            <h3 style={{ color: "white" }}>Category</h3>         
             {`${category || ""} `} 
           
          </div>
          <div
            style={{
              width: "49%",
              padding: "0px 0px",
              textAlign: "center",
              background: "#24b9fe",
              color: "white",
              border: "0.06em solid #ddd",
              borderRadius: "0.3rem",
              boxShadow: "0 0.5em 0.37em -0.37em rgb(46,44,44)",
            }}
          >
            <h3 style={{ color: "white" }}>Sector</h3>
                 
             {`${sector}`} 
          </div>
        </div>
      </Popup>
    
    </Marker>
  );
}

