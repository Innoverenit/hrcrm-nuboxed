import React, {Suspense, lazy,useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader} from "../../Components/Placeholder";
import DealLostCard from './Child/DealTable/DealLostCard';
import {
  // setDealViewType,
  handleDealModal}from "./DealAction";
import DealDeletedCard from './DealDeletedCard';
const DealsTeamCardList=lazy(()=>import ("./DealsTeamCardList"));
const DealsBoard=lazy(()=>import ("./Child/DealsBoard"));
const DealHeader = lazy(()=>import("./Child/DealHeader"));
const DealCardList = lazy(()=>import("./Child/DealTable/DealCardList"));
const CreateDealModal = lazy(() => import("./Child/CreateDealModal"));
const DealWonCard=lazy(()=>import ("./Child/DealTable/DealWonCard"));
const DealsAllCardList = lazy(()=>import("./Child/DealDetail/Dealcards/DealsAllCardList"));

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
                       <DealHeader 
                       viewType={viewType}
                       teamsAccessInd={teamsAccessInd}
                       setDealViewType={setDealViewType}
                       opencreateDealModal={opencreateDealModal}
                       handleDealModal={handleDealModal}
                       />
                       <CreateDealModal 
                       opencreateDealModal={opencreateDealModal}
                       handleDealModal={handleDealModal}/>

                       <Suspense fallback={<BundleLoader />}>

                       {teamsAccessInd ? (
        <DealsTeamCardList/>
        ) : (
          <>
            {viewType === 'table' &&  <DealCardList/>}
            {viewType === 'stage' &&   <DealsBoard/>}
            {viewType === 'all' && <DealsAllCardList/>}
            {viewType === 'teams' &&   <DealsTeamCardList/>}
            {viewType === 'won' &&    <DealWonCard/>}
            {viewType === 'lost' &&  <DealLostCard/>}
            {viewType === 'delete' &&  <DealDeletedCard/>}
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