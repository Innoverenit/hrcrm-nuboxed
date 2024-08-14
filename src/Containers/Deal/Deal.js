import React, {Suspense, lazy,useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader} from "../../Components/Placeholder";
import {handleDealModal}from "./DealAction";
const DealsTeamCardList=lazy(()=>import ("./DealsTeamCardList"));
const DealsBoard=lazy(()=>import ("./Child/DealsBoard"));
const DealHeader = lazy(()=>import("./Child/DealHeader"));
const DealCardList = lazy(()=>import("./Child/DealTable/DealCardList"));
const CreateDealModal = lazy(() => import("./Child/CreateDealModal"));
const DealWonCard=lazy(()=>import ("./Child/DealTable/DealWonCard"));
const DealsAllCardList = lazy(()=>import("./Child/DealDetail/Dealcards/DealsAllCardList"));
const DealDeletedCard=lazy(()=>import ("./DealDeletedCard"));
const DealLostCard=lazy(()=>import ("./Child/DealTable/DealLostCard"));

function Deal (props) {
  const [viewType, setViewType] = useState(null);
  const [teamsAccessInd, setTeamsAccessInd] = useState(props.teamsAccessInd);
  const setDealViewType = (viewType) => {
    setViewType(viewType);
    setTeamsAccessInd(false);
  };
   const {
    opencreateDealModal,
      handleDealModal,
      // viewType,
      // setDealViewType
    } = props;
        return (
     
            <React.Fragment>
                     <Suspense fallback={<BundleLoader />}>
                       <DealHeader 
                        selectedLanguage={props.selectedLanguage}
                        translateText={props.translateText}
                       viewType={viewType}
                       teamsAccessInd={teamsAccessInd}
                       setDealViewType={setDealViewType}
                       opencreateDealModal={opencreateDealModal}
                       handleDealModal={handleDealModal}
                       />
                       <CreateDealModal 
                        selectedLanguage={props.selectedLanguage}
                        translateText={props.translateText}
                       opencreateDealModal={opencreateDealModal}
                       handleDealModal={handleDealModal}/>
                       
                       {teamsAccessInd ? (
                        <DealsTeamCardList
                        translateText={props.translateText}
                        selectedLanguage={props.selectedLanguage}
                        translatedMenuItems={props.translatedMenuItems}
                        />
                        ) : (
                      <>
                        {viewType === 'table' &&  <DealCardList
                          translateText={props.translateText}
                          selectedLanguage={props.selectedLanguage}
                          translatedMenuItems={props.translatedMenuItems}
                        />}
                        {viewType === 'stage' &&   <DealsBoard
                          translateText={props.translateText}
                          selectedLanguage={props.selectedLanguage}
                          translatedMenuItems={props.translatedMenuItems}
                        />}
                        {viewType === 'all' && <DealsAllCardList
                          translateText={props.translateText}
                          selectedLanguage={props.selectedLanguage}
                          translatedMenuItems={props.translatedMenuItems}
                        />}
                        {viewType === 'teams' &&   <DealsTeamCardList
                          translateText={props.translateText}
                          selectedLanguage={props.selectedLanguage}
                          translatedMenuItems={props.translatedMenuItems}
                        />}
                        {viewType === 'won' &&    <DealWonCard
                          translateText={props.translateText}
                          selectedLanguage={props.selectedLanguage}
                          translatedMenuItems={props.translatedMenuItems}
                        />}
                        {viewType === 'lost' &&  <DealLostCard
                          translateText={props.translateText}
                          selectedLanguage={props.selectedLanguage}
                          translatedMenuItems={props.translatedMenuItems}
                        />}
                        {viewType === 'delete' &&  <DealDeletedCard
                          translateText={props.translateText}
                          selectedLanguage={props.selectedLanguage}
                          translatedMenuItems={props.translatedMenuItems}
                        />}
          </>
        )}
          {/* {viewType === "table" ?

          <DealCardList/>
           :
             viewType === "stage" ?
             <DealsBoard/>
             :
             viewType === "all" ?
             <DealsAllCardList/>:
             viewType === "teams" ?
             <DealsTeamCardList/>
             :
        viewType === "won" ?
        
            <DealWonCard/>
             :
             viewType === "lost" ?
             (  <DealLostCard/> )
            
              :
            null} */}
                 </Suspense>
            </React.Fragment>
        )
}

const mapStateToProps = ({ auth,deal}) => ({
// viewType:deal.viewType,
teamsAccessInd:auth.userDetails.teamsAccessInd,
userId: auth.userDetails.userId,
opencreateDealModal:deal.opencreateDealModal
})

const mapDispatchToProps = dispatch => bindActionCreators({
    // setDealViewType,
    handleDealModal
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Deal);