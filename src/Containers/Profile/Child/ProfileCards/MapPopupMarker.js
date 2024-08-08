import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { Avatar } from "antd";
import {
  MultiAvatar,
  Title,
  SubTitle,
  JumpStartBox,
  
} from "../../../../Components/UI/Elements";
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
        {/* <div justifyContent="center" flexDirection="column">
          <div flexWrap="nowrap" alignItems="center">
            <div className="avatar-bg" style={{ borderRadius: "50%" }}>
              <MultiAvatar
                // primaryTitle={firstName || ''}
                minAvatarWidth="5em"
                imageId={imageId}
                className="avatar"
              />
              &nbsp;&nbsp;
            </div> */}
        <div className="details">
          <Title
            fontSize="1.1rem"
            style={{ display: "flex", justifyContent: "center" }}
          >{`${firstName || ""} ${middleName || ""} ${lastName || ""}`}</Title>
          <Title
            fontSize="0.78rem"
            style={{ display: "flex", justifyContent: "center" }}
          >
            {accountName}
          </Title>
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
        {/* <FlexContainer style={{ width: "100%" }} justifyContent="space-between">
          <div
            style={{
              width: "49%",
              padding: "0em 0em",
              textAlign: "center",
              background: "#6ba9f7",
              color: "white",
              border: "0.0625em solid #ddd",
              borderRadius: "0.3rem",
              boxShadow: "0 0.5em 0.375em -0.375em rgb(46,44,44)",
            }}
          >
            <h3 style={{ color: "white" }}>Proposal</h3>
             {actualFunnel || 0} 
          </div>
          <div
            style={{
              width: "49%",
              padding: "0em 0em",
              textAlign: "center",
              background: "#f7ae9b",
              color: "white",
              border: "0.0625em solid #ddd",
              borderRadius: "0.3rem",
              boxShadow: "0 0.5em 0.375em -0.375em rgb(46,44,44)",
            }}
          >
            <h3 style={{ color: "white" }}>Win Rate</h3>
            {`${Won || 0} / ${(Lost || 0) + (Won || 0) || 0}`} 
          </div>

        </FlexContainer> */}
      </Popup>
    </Marker>
  );
}
