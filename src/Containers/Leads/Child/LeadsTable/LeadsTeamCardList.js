import React, { Suspense } from 'react'
import { BundleLoader } from '../../../../Components/Placeholder'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LeadsTeamWarmcard from './LeadsTeamWarmcard';
import LeadsTeamColdCard from './LeadsTeamColdCard';
import LeadsTeamHotcard from './LeadsTeamHotcard';
import SearchedData from './SearchedData';



const LeadsTeamCardList = (props) => {
  return (
    <div>
       <Suspense fallback={<BundleLoader />}>
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
 translateText={props.translateText}
 selectedLanguage={props.selectedLanguage}
translatedMenuItems={props.translatedMenuItems}
/>
<LeadsTeamWarmcard
 translateText={props.translateText}
 selectedLanguage={props.selectedLanguage}
translatedMenuItems={props.translatedMenuItems}
/>
<LeadsTeamColdCard
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
