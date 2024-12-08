import React from "react";
import { Marker, Popup } from "react-leaflet";
import dayjs from "dayjs";
import {Title} from "../../Components/UI/Elements";
import { Link } from "../../Components/Common";
import L from "leaflet";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("../../Assets/Images/download.webp"),
  iconUrl: require("../../Assets/Images/download.webp"),
  shadowUrl: require("../../Assets/Images/download.webp"),
  iconSize: [15, 25], // size of the icon
  shadowSize: [35, 25], // size of the shadow
  shadowAnchor: [15, 40],
});

export default function PartnerMapPopUpMarker({ mark }) {
  console.log("Mark",mark.fullName);
  console.log("Mark3",mark.address)
  console.log("Mark1",mark.latitude)
  console.log("Mark1",mark.longitude)
  console.log("Mark2",mark)
  console.log("Mark4",mark.availableDate)
  
  const {
    
    name,
    partnerName,
    availableDate,
    grandTotal,
    mode,
    currencyName,
    middleName,
    address,
    lastName,
    imageId,
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
 

  const image = new L.Icon({
    iconUrl: mark.timeToConnect
      ? require("../../Assets/Images/download.webp")
      : require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    iconSize: mark.timeToConnect ? [25, 35] : [15, 25], // size of the icon
    shadowAnchor: [10, 40],
  });

  return (
    <Marker
  // position={["0", "0"]}
    position={[mark.lat, mark.lng]}
      icon={image}
     >
      <Popup className="!w-[18rem]">
        <div className="details">
          <Title
            fontSize="1.1rem"
            style={{ display: "flex", justifyContent: "center" }}
          >
             <Link
          toUrl={`partner/${mark.partnerId}`}
          title= {`${partnerName || ""} `} 
        />
          </Title>
           <div>
          <div>
          </div>
        </div>
        <div style={{ display: "flex" }}>
        </div>
      </div>

        <div class=" mt-3" />
        <div class=" flex justify-between w-full" >
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
            <h3 style={{ color: "white" }}>Available</h3>
           
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
            <h3 style={{ color: "white" }}>Skills</h3>
          </div>
     
        </div>
      </Popup>
    </Marker>
  );
}

