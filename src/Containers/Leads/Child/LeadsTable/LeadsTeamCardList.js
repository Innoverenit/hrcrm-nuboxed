import React, { Suspense } from 'react'
import { BundleLoader } from '../../../../Components/Placeholder'
import { connect } from "react-redux";
import LeadsTeamWarmcard from './LeadsTeamWarmcard';
import LeadsTeamColdCard from './LeadsTeamColdCard';
import LeadsTeamHotcard from './LeadsTeamHotcard';



const LeadsTeamCardList = (props) => {
  return (
    <div>
       <Suspense fallback={<BundleLoader />}>
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
       </Suspense>
    </div>
  )
}

const mapStateToProps = () => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(LeadsTeamCardList);
