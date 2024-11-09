import React, { Suspense } from 'react'
import { BundleLoader } from '../../../../Components/Placeholder'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LeadsTeamWarmcard from './LeadsTeamWarmcard';
import LeadsTeamColdCard from './LeadsTeamColdCard';
import LeadsTeamHotcard from './LeadsTeamHotcard';
import SearchedData from './SearchedData';
import FWLogo1 from "../../../../../src/Assets/Images/cashShake.svg";


const LeadsTeamCardList = (props) => {
  return (
    <div>
       <Suspense fallback={ <div className="custom-loader">
          <div className="loader !block"> </div>
      <div className="custom-loader" ><img src={FWLogo1}   className="w-12 -mt-[5.5rem]"  alt="Loading..."  /></div>
    </div>}>
       {props.serachedData.length > 0 ? (
    <SearchedData
    serachedData={props.serachedData}
    translateText={props.translateText}
    selectedLanguage={props.selectedLanguage}
  translatedMenuItems={props.translatedMenuItems}
  fetchingLeadsInputSearchData={props.fetchingLeadsInputSearchData}
    />
  ) : (
        <>
<LeadsTeamHotcard
 handleCheckboxChange={props.handleCheckboxChange}
 selectedUser={props.selectedUser}
 showCheckboxes={props.showCheckboxes}
 selectedDeals={props.selectedDeals}
 translateText={props.translateText}
 selectedLanguage={props.selectedLanguage}
translatedMenuItems={props.translatedMenuItems}
/>
<LeadsTeamWarmcard
handleCheckboxChange={props.handleCheckboxChange}
selectedUser={props.selectedUser}
showCheckboxes={props.showCheckboxes}
selectedDeals={props.selectedDeals}
 translateText={props.translateText}
 selectedLanguage={props.selectedLanguage}
translatedMenuItems={props.translatedMenuItems}
/>
<LeadsTeamColdCard
handleCheckboxChange={props.handleCheckboxChange}
selectedUser={props.selectedUser}
showCheckboxes={props.showCheckboxes}
selectedDeals={props.selectedDeals}
 translateText={props.translateText}
 selectedLanguage={props.selectedLanguage}
translatedMenuItems={props.translatedMenuItems}
/>
        </>
            )}
       </Suspense>
    </div>
  )
}

const mapStateToProps = ({leads}) => ({
  serachedData:leads.serachedData,
});

const mapDispatchToProps = (dispatch) => bindActionCreators ({

},
dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(LeadsTeamCardList);
