import React from "react";
import {  Marker, Popup } from "react-leaflet";
import dayjs from "dayjs";
import { Link } from "../../Components/Common";
import {  Title} from "../../Components/UI/Elements";
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

export default function CandidateMapPopUpMarker({ mark }) {
  console.log("Mark",mark.fullName);
  console.log("Mark3",mark.address)
  console.log("Mark1",mark.latitude)
  console.log("Mark1",mark.longitude)
  console.log("Mark2",mark)
  console.log("Mark4",mark.availableDate)
  //console.log("Mark3",data)
  function generateRandomColor() {
    let maxVal = 0xffffff;
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`;
  }
  //const data=mark.address &&mark.address.length &&mark.address[0].state
  
  const {
    fullName,
    availableDate,
    billing,
    workPreference,
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
  const data=skillList===null?[]:skillList.filter((skill)=>{
    return skill!==null&&skill!==""
   }
   )
   const newSkill=data===null?[]:data.map((item)=> {
    return { skillName:item,color: generateRandomColor()   };
      });
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
  // console.log(mark.data);

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
             {/* {`${fullName || ""} `}  */}
             <Link
          toUrl={`candidate/${mark.candidateId}`}
          title=  {`${fullName || ""} `} 
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
        <div class=" flex" >
          {/* {(country && country) || ""}&nbsp;
          {(pinCode && pinCode) || ""}&nbsp; */}
        </div>
      </div>


        <div class=" flex justify-between w-full mt-3" >
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
            {/* <CurrencySymbol currencyType={currency} />{" "}
            {CurrencyCompressor(actualFunnel) || 0} */}
             {/* <CurrencySymbol currencyType={currencyName} />  */}
             {/* {grandTotal || 0}  */}
             {`${dayjs(availableDate || "").format("l")} `} 
          </div>
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
            <h3 style={{ color: "white" }}>workPreference</h3>
            
            {`${workPreference}`} 
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
       
            {/* <SkillsLoadMore
            skillList={data}
            /> */}

<>
          {newSkill&&newSkill.map((option,i) => {
            return (
              <>
               <div class=" flex flex-wrap w-full"
            >
             
                <div key={i} style={{
                    border: `1px solid ${option.color}`,
                    padding: "0px 0.4em",
                    textAlign: "center",
                    margin: "2px",
                    borderRadius: "0.4em",
                  }}>
                    {option.skillName}
                    </div>
                    </div>
         
              </>
            );
          })}
        </>
      
             {/* {`${mode}`}  */}
          </div>
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
            <h3 style={{ color: "white" }}>Cost</h3>
            {`${billing}`} 
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
        </div>
      </Popup>
    </Marker>
  );
}

