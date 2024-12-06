import React, { useState,useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { opportunityMapSelector } from "../../../../OpportunitySelector";
import {  Button, } from "antd";
import Leaflet from "../../../../../../Components/Utils/Leaflet";
import L from "leaflet";
import RecruitmentMapPopUpmarker from "./RecruitmentMapPopUpmarker"
import { getSkillsCount, } from "../../../../OpportunityAction";
import NodataFoundPage from "../../../../../../Helpers/ErrorBoundary/NodataFoundPage";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const includesMulti = (elements, inArray) => {
  const unmatched = inArray.slice();
  for (const element of elements) {
    const matchIndex = unmatched.indexOf(element);
    if (matchIndex === -1) return false;
    unmatched.splice(matchIndex, 1);
  }
  return true;
};

function RecruitmentMap (props) {
  useEffect(() => {
    props.getSkillsCount(props.candidatePostData.recruitmentId,props.organizationId,);
    //props.getCountries();
       
  }, []);
  const [button, setButton] = useState([]);

  function handleButton(data) {
    const checkData = button.includes(data);
    if (!checkData) {
      setButton([...button, data]);
    }
  }

  const desc=props.skillsCount
  let result = Object.keys(desc).map(key => {
    return ({ name: key, id:key })
  }
  )
 
 


  console.log("desc",result)

 
  
    ////debugger;
    const {
      opportunityAdresses,
      candidatePostData,
      user: { address },
    } = props;
    const lat =
      (props.candidatePostData.address && props.candidatePostData.address.length && Number(props.candidatePostData.address[0].latitude)) ||
      Number(51.92301029999999);
    const lng =
      (props.candidatePostData.address && props.candidatePostData.address.length && Number(props.candidatePostData.address[0].longitude)) ||
      Number(4.470038700000032);
    // console.log(accountAdresses);
    console.log("address",opportunityAdresses);

    console.log("lat",lat);
    console.log("lng",lng);
    console.log("Map1",props.recruiter);
    if (props.fetchingAccountMapOnDashboardByUserIdError) {
      return <NodataFoundPage />;
    }
    const getIndexSkillData = props.recruiter.filter((data, index) => {
      if (button.length !== 0 && includesMulti(button, data.skillList)) {
        return data;
      }
    });
    const finalFilteredRecruiters=button.length > 0 ? getIndexSkillData : props.recruiter

    const newData=opportunityMapSelector(finalFilteredRecruiters)
    console.log("final",newData,props.opportunityAdresses)
    return (
      <>
          <Button type="primary" 
       onClick={()=>setButton([])}
      >
        Clear Search
      </Button>
      {result.map((item,i) => {
            return (
              <>
             
                <Button
                 onClick={()=>{
                  
                   handleButton(item.name)
                 
     }}
    //  key={item.id}
     
    style={{ backgroundColor: button.includes(item.name) ? "tomato" : "white" }}
                
           
                  >

                    {item.name}
                    </Button>
        
              </>
            );
          })}
        <Leaflet
            markers={newData}
           MyPopupMarker={RecruitmentMapPopUpmarker}
           candidatePostData={props.candidatePostData}
          zoom={lat && lng && 6}
          centerPosition={lat && lng && [lat, lng]}
        />

 
      </>
    );
  }

const mapStateToProps = ({ auth, account,opportunity }) => ({
  user: auth.userDetails,
  skillsCount:opportunity.skillsCount,
  organizationId: auth.userDetails.organizationId,
  opportunityAdresses: opportunityMapSelector(opportunity),
  //accountAdresses: accountMapSelector(account),
 // fetchingAccountMapOnDashboardByUserIdError: account.fetchingAccountMapOnDashboardByUserIdError
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSkillsCount
      //getAccountsMapOnDashboard,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(RecruitmentMap);

const MyPopupMarker = ({ mark }) => {
  console.log(mark);
  const { accountName, imageId, imageURL, address } = mark && mark.data;
  const image = new L.Icon({
    iconUrl:
      imageId || imageURL || require("leaflet/dist/images/marker-icon.png"),
    // shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    iconSize: mark.type === "Headquarters" ? [40, 40] : [25, 25], // size of the icon
    // shadowSize: [50, 50], // size of the shadow
    // iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    // shadowAnchor: [4, 62],  // the same for the shadow
    // popupAnchor: [-3, -76]// point from which the popup should open relative to the iconAnchor
  });

  
};
