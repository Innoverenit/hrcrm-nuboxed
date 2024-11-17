import React, { lazy, Suspense,useState } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ActionSteps from "../Dashboard/ActionSteps"
 import { BundleLoader } from "../../Components/Placeholder";
import { StyledDrawer, StyledModal } from "../../Components/UI/Antd";


const AddActionDrawerModal = (props) => {

  return (
    <>
      <StyledDrawer
        title="Action Steps"
        // title={this.state.message}
        // title={<FormattedMessage
        //   id="app.candidate"
        //   defaultMessage="Candidate"
        // />}
        width="45%"
        visible={props.addDrawerActionModal}
        maskClosable={false}
        destroyOnClose
        // maskStyle={{transition: '0.5s filter linear', filter: 'blur(20px)', width: '100%', height: '100%', padding: '50px', backgroundColor: 'rgba(49, 56, 66,0.7)'}}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onClose={()  => props.handleActionDrawerModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>


      <ActionSteps
      actionSteps={props.actionSteps}
      />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

const mapStateToProps = ({ settings,opportunity }) => ({
    //addRecruiterModal:opportunity.addRecruiterModal
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        // handleRecruiterModal,
      },
      dispatch
    );

    export default connect(mapStateToProps, mapDispatchToProps)(AddActionDrawerModal);




  
