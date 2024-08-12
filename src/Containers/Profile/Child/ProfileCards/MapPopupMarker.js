import React from "react";
import {  Marker, Popup } from "react-leaflet";
import { AddressComponent } from "../../../../Components/Common";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("../../../../Assets/Images/download.png"),
  iconUrl: require("../../../../Assets/Images/download.png"),
  shadowUrl: require("../../../../Assets/Images/download.png"),
  iconSize: [15, 25], // size of the icon
  shadowSize: [35, 25], // size of the shadow
  shadowAnchor: [15, 40],
});

export default function MapPopupMarker({ mark }) {
  console.log(mark);
  const {
    firstName,
    middleName,
    lastName,
    imageId,
    address,
    metaData,
    wonCount,
    lostCount,
  } = mark && mark.data;
  const accountName =
    metaData && metaData.account && metaData.account.accountName;

  //   const actualFunnel = metaData.funnel.actualFunnel || "";
  //   const currency = metaData.funnel.currency || "";
  //   const Lost = lostCount ? lostCount : 0;
  //   const Won = wonCount ? wonCount : 0;
  console.log(mark.data);

  const image = new L.Icon({
    iconUrl: mark.timeToConnect
      ? require("../../../../Assets/Images/download.png")
      : require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    iconSize: mark.timeToConnect ? [25, 35] : [15, 25], // size of the icon
    shadowAnchor: [10, 40],
  });

  return (
    <Marker position={[mark.lat, mark.lng]} icon={image}>
      <Popup className="!w-[18rem]">
        <div className="details">
          <div
            fontSize="1.1rem"
            style={{ display: "flex", justifyContent: "center" }}
          >{`${firstName || ""} ${middleName || ""} ${lastName || ""}`}</div>
          <div
            fontSize="0.78rem"
            style={{ display: "flex", justifyContent: "center" }}
          >
            {accountName}
          </div>
          <div>
            {address &&
              address.map((components, i) => {
                if (
                  Number(components.latitude) === mark.lat &&
                  Number(components.longitude) === mark.lng
                ) {
                  return <AddressComponent components={components} key={i} />;
                }
              })}
          </div>
        </div>
        <div class=" mt-3" />    
      </Popup>
    </Marker>
  );
}
