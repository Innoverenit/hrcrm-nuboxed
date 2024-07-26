import React, { } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Marker, Popup } from "react-leaflet";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import {Checkbox} from "antd";
import dayjs from "dayjs";
import { Link } from "../../../../../../Components/Common";
import {
  Title,
  Spacer,
} from "../../../../../../Components/UI/Elements";
import { LinkCandidateRecruit,LinkRecruitCandidate } from "../../../../OpportunityAction";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("../../../../../../Assets/Images/download.png"),
  iconUrl: require("../../../../../../Assets/Images/download.png"),
  shadowUrl: require("../../../../../../Assets/Images/download.png"),
  iconSize: [15, 25], // size of the icon
  shadowSize: [35, 25], // size of the shadow
  shadowAnchor: [15, 40],
});

 function RecruitmentMapPopUpMarker( props) {
  // const [selectedRowData, setSelectedRowData] = useState(data);
  // const [selectedSkillKeys, setSelectedSkilleys] = useState(data);

  function generateRandomColor() {
    let maxVal = 0xffffff;
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`;
  }


  
  function handleChange() {
    console.log(props.item)
    if (props.role === "USER" && props.user.department === "Recruiter") {
    props.LinkRecruitCandidate(
      {
        opportunityId: props.candidatePostData.opportunityId,
        stageId: props.candidatePostData.stageId,
        recruitOwner :props.userId,
        recruitmentProcessId: props.candidatePostData.recruitmentProcessId,

        recruitmentId: props.candidatePostData.recruitmentId,
        profileId: props.candidatePostData.profileId,
        candidateIds: props.mark.data.candidateId
      },
      props.opportunityId,
    );
  } else {
    props.LinkCandidateRecruit(
      {
        opportunityId: props.candidatePostData.opportunityId,
        stageId: props.candidatePostData.stageId,
        recruitOwner :props.userId,
        recruitmentProcessId: props.candidatePostData.recruitmentProcessId,

        recruitmentId: props.candidatePostData.recruitmentId,
        profileId: props.candidatePostData.profileId,
        candidateIds: props.mark.data.candidateId
      },
      props.opportunityId,
    );
  }
}

  
 
  // const {
  //   fullName,
  //   candidateId,
  //   availableDate,
  //   billing,
  //   workPreference,
  //   grandTotal,
  //   mode,
  //   currencyName,
  //   middleName,
  //   address,
  //   lastName,
  //   imageId,
  //   city,
  //   address1,
  //   state,
  //   pinCode,
  //   country,
  //   addresses,
  //   metaData,
  //   skillList,
  //   wonCount,
  //   lostCount,
  // } = mark && mark.data ;
  // const data=props.candidatePostData.filtercandidatetList===null?[]:props.candidatePostData.filtercandidatetList.map((item)=>{
  //   return item.candidateId
    
  // })

  const SkillDAta=props.mark.data.skillList===null?[]:props.mark.data.skillList.filter((skill)=>{
    return skill!==null&&skill!==""
   }
   )
   const newSkill=SkillDAta===null?[]:SkillDAta.map((item)=> {
    return { skillName:item,color: generateRandomColor()   };
      });
  
// console.log("props4",props)
// console.log("props8",props.candidatePostData)
// console.log("props9",data)

  // console.log("Mark",mark.fullName);
  // console.log("form1",props.candidatePostData)

  // const data=mark.address
  // const data1=data&&data.length&&data[0].latitude
  // const data2=data&&data.length&&data[0].longitude
  //  console.log("mark",mark);
  //  console.log("mark1",data);
  //  console.log("mark2",data1);
  //  console.log("mark3",data2);

  const image = new L.Icon({
    iconUrl: props.mark.timeToConnect
      ? require("../../../../../../Assets/Images/download.png")
      : require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    iconSize: props.mark.timeToConnect ? [25, 35] : [15, 25], // size of the icon
    shadowAnchor: [10, 40],
  });

  return (
    <Marker
  //  position={["0", "0"]}
  position={[props.mark.lat, props.mark.lng]}
   // position={[mark.address&&mark.address.length&&mark.address[0].latitude, mark.address&&mark.address.length&&mark.address[0].longitude]}
     // icon={image}
      // icon={<FontAwesomeIcon icon={solid('flag-checkered')} />}
     >
      <Popup className="!w-[18rem]">
      
            <div>
                 <Checkbox
                      // checked={props.rowSelection}
                      defaultValue={props.rowSelection}
                      onChange={handleChange}
                        // style={{ marginLeft: "auto" }}
                      >
                        {/* Both */}
                      </Checkbox>
                      </div>
        <div className="details">
   
          <Title
            fontSize="1.1rem"
            style={{ display: "flex", justifyContent: "center" }}
          >
                <Link
          toUrl={`candidate/${props.mark.data.candidateId}`}
          title=  {`${props.mark.data.fullName || ""} `} 
        />
           
          </Title>
       
           <div>
          {/* {(address1 && address1) || ""}&nbsp; */}
       
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
            <h3 style={{ color: "white" }}>Available</h3>
          
             {`${dayjs(props.mark.data.availableDate || "").format("l")} `} 
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
            {`${props.mark.data.workPreference}`} 
           
           
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
       
            {newSkill&&newSkill.map((option,i) => {
            return (
              <>
               <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
              }}
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
            {`${props.mark.billing}`} 
          </div>
         
        </FlexContainer>
      </Popup>
    </Marker>
  );
}

const mapStateToProps = ({ auth, account, opportunity }) => ({
  opportunityId: opportunity.opportunity.opportunityId,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      LinkCandidateRecruit,
      LinkRecruitCandidate,
    
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(RecruitmentMapPopUpMarker);

