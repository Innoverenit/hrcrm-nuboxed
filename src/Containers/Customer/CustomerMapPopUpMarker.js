import React from "react";
import { Marker, Popup } from "react-leaflet";
import { FlexContainer } from "../../Components/UI/Layout";
import { base_url } from "../../Config/Auth";
import { Link } from "../../Components/Common";
import {
  Title,
  Spacer,
} from "../../Components/UI/Elements";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("../../Assets/Images/download.png"),
  iconUrl: require("../../Assets/Images/download.png"),
  shadowUrl: require("../../Assets/Images/download.png"),
  iconSize: [15, 25], // size of the icon
  shadowSize: [35, 25], // size of the shadow
  shadowAnchor: [15, 40],
  // iconSize: [50, 50],
  // iconAnchor: [25, 25],
});

export default function CustomerMapPopUpMarker({ mark }) {
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
 
  //  const addressdata3=address&&address===null?"":address&&address.length&&address[0].latitude;
  // const addressdata4=address&&address===null?"":address&&address.length&&address[0].longitude;
  //  console.log("Add",addressdata3)
  //  console.log("Add1",addressdata3)
  //  console.log("add3",mark.address&&mark.address.length&&mark.address[0].latitude)
  // const accountName =
  //   metaData && metaData.account && metaData.account.accountName;

  // const actualFunnel = metaData.funnel.actualFunnel || "";
  // const currency = metaData.funnel.currency || "";
  // const Lost = lostCount ? lostCount : 0;
  // const Won = wonCount ? wonCount : 0;
  console.log(mark.imageURL);
  let picture;
  if (imageId) {
    picture = `${base_url}/image/${imageId}`;
  } else if (imageURL) {
    picture = imageURL;
  } else {
    picture = require("leaflet/dist/images/marker-icon.png");
  }

  // const image = new L.Icon({
  //   iconUrl: picture,
  //   shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  //   iconSize: mark.timeToConnect ? [25, 35] : [15, 25], // size of the icon
  //   shadowAnchor: [10, 40],
  // });
  const image = new L.Icon({
    iconUrl: picture,
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    iconSize: mark.type === "Headquarters" ? [40, 40] : [25, 25], // size of the icon
    shadowSize: mark.type === "Headquarters" ? [80, 60] : [50, 50], // size of the shadow
    // iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [15, 40], // the same for the shadow
    // popupAnchor: [-3, -76]// point from which the popup should open relative to the iconAnchor
  });
  // const iconMarkup = renderToStaticMarkup(<i className=" fa fa-map-marker-alt fa-3x" />);
  // const customMarkerIcon = divIcon({
  //   html: iconMarkup,
  // });

  return (
    <Marker
  // position={["0", "0"]}
    position={[mark.lat, mark.lng]}
      icon={image}
      // icon={customMarkerIcon}
     >
      
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
          >
             <Link
              toUrl={`/customer/${mark.customerId}`}
              title={`${name || ""} `}
            
              // title={`${name || ""} `}
            />
          </Title>
          {/* <div>
            {addresses &&
              addresses.map((components, i) => {
                if (
                  Number(components.latitude) === mark.lat &&
                  Number(components.longitude) === mark.lng
                ) {
                  return <AddressComponent components={components} key={i} />;
                }
              })}
          </div> */}
           <div>
          {/* {(address1 && address1) || ""}&nbsp; */}
          <div>
            {/* {(city && city) || ""}
            {(state && state) || ""} */}
          </div>
        </div>
        <div style={{ display: "flex" }}>
          {/* {(country && country) || ""}&nbsp;
          {(pinCode && pinCode) || ""}&nbsp; */}
        </div>
      </div>

        <Spacer />
        <FlexContainer style={{ width: "100%" }} justifyContent="space-between">
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
            {/* <CurrencySymbol currencyType={currency} />{" "}
            {CurrencyCompressor(actualFunnel) || 0} */}
             {/* <CurrencySymbol currencyType={currencyName} />  */}
             {/* {grandTotal || 0}  */}
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
       
            {/* <SkillsLoadMore
            skillList={data}
            /> */}


      
             {`${sector}`} 
          </div>
          
          {/* <JumpStartBox
                noProgress
               
                value={actualFunnel || ""}
                title="Proposal"
                currencyType={currency}
                bgColor="#F3967E"
              />
              <JumpStartBox
                noProgress
                stringValue
               
                title="Win / Loss"
                bgColor="#24B47E"
              /> */}
        </FlexContainer>
      </Popup>
    
    </Marker>
  );
}

