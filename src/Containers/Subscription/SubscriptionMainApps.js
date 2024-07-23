import React,{lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SubscriptionHeader from "./Child/SubscriptionHeader";
import {handleCreateSubscriptionDrawer} from "./SubscriptionAction";

const CreateSubscriptionDrawer =lazy(()=>import("./Child/CreateSubscriptionDrawer"));
const SubscriptionNewCard =lazy(()=>import("./Child/SubscriptionNewCard"));

function SubscriptionMainApps (props) {

    return (
        <>
        <SubscriptionHeader 
          createSubscriptiondrawer={props.createSubscriptiondrawer}
          handleCreateSubscriptionDrawer={props.handleCreateSubscriptionDrawer}
          />
        <CreateSubscriptionDrawer
        rowData={props.rowData}
          createSubscriptiondrawer={props.createSubscriptiondrawer}
          handleCreateSubscriptionDrawer={props.handleCreateSubscriptionDrawer}
        />

       <SubscriptionNewCard/>
        </>
    )
};

const mapStateToProps = ({ subscription }) => ({
  createSubscriptiondrawer:subscription.createSubscriptiondrawer
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        handleCreateSubscriptionDrawer
      },
      dispatch
    );
  
  export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionMainApps);