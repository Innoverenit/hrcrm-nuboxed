import React,{lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SubscriptionHeader from "./Child/SubscriptionHeader";
import {handleCreateSubscriptionDrawer,handleSuscrptionModal} from "./SubscriptionAction";
import MainSuscriptionModal from "./MainSuscriptionModal";

const CreateSubscriptionDrawer =lazy(()=>import("./Child/CreateSubscriptionDrawer"));
const SubscriptionNewCard =lazy(()=>import("./Child/SubscriptionNewCard"));

function SubscriptionMainApps (props) {

    return (
        <>
        <SubscriptionHeader 
           handleSuscrptionModal={props.handleSuscrptionModal}
           addingSuscrpitionModal={props.addingSuscrpitionModal}
          />
       <MainSuscriptionModal
       handleSuscrptionModal={props.handleSuscrptionModal}
       addingSuscrpitionModal={props.addingSuscrpitionModal}
       />

       <SubscriptionNewCard/>
        </>
    )
};

const mapStateToProps = ({ subscription }) => ({
  createSubscriptiondrawer:subscription.createSubscriptiondrawer,
  addingSuscrpitionModal: subscription.addingSuscrpitionModal
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        handleCreateSubscriptionDrawer,
        handleSuscrptionModal
      },
      dispatch
    );
  
  export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionMainApps);