import React, { Suspense } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LeadsTeamWarmcard from './LeadsTeamWarmcard';
import LeadsTeamColdCard from './LeadsTeamColdCard';
import LeadsTeamHotcard from './LeadsTeamHotcard';
import SearchedData from './SearchedData';



const LeadsTeamCardList = (props) => {
  return (
    <div>
       <Suspense fallback={"Loading.."}>
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
