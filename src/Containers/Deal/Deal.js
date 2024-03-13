import React, {Suspense, lazy } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader} from "../../Components/Placeholder";
import DealLostCard from './Child/DealTable/DealLostCard';
import {setDealViewType,handleDealModal}from "./DealAction";
const DealsBoard=lazy(()=>import ("./Child/DealsBoard"));
const DealHeader = lazy(()=>import("./Child/DealHeader"));
const DealCardList = lazy(()=>import("./Child/DealTable/DealCardList"));
const CreateDealModal = lazy(() => import("./Child/CreateDealModal"));
const DealWonCard=lazy(()=>import ("./Child/DealTable/DealWonCard"));
const DealsAllCardList = lazy(()=>import("./Child/DealDetail/Dealcards/DealsAllCardList"));

function Deal (props) {

   const {
    opencreateDealModal,
      handleDealModal,
      viewType,
      setDealViewType
    } = props;
        return (
     
            <React.Fragment>
                       <DealHeader 
                       viewType={viewType}
                       setDealViewType={setDealViewType}
                       opencreateDealModal={opencreateDealModal}
                       handleDealModal={handleDealModal}
                       />
                       <CreateDealModal 
                       opencreateDealModal={opencreateDealModal}
                       handleDealModal={handleDealModal}/>

                       <Suspense fallback={<BundleLoader />}>
          {viewType === "table" ?

          <DealCardList/>
           :
             viewType === "stage" ?
             <DealsBoard/>
             :
             viewType === "all" ?
             <DealsAllCardList/>
             :
        viewType === "won" ?
        
            <DealWonCard/>
             :
             viewType === "lost" ?
             (  <DealLostCard/> )
            
              :
            null}
                 </Suspense>
            </React.Fragment>
        )
}

const mapStateToProps = ({ auth,deal}) => ({
viewType:deal.viewType,
userId: auth.userDetails.userId,
opencreateDealModal:deal.opencreateDealModal
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setDealViewType,
    handleDealModal
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Deal);