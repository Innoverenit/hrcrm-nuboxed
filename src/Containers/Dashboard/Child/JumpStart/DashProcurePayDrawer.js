import React, { Component,Suspense,lazy } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import DashProcurePayDrawerCard from "./DashProcurePayDrawerCard";

function DashProcurePayDrawer (props) {

    return (
      <div className="pulse-background">
 <StyledDrawer 
          title={`Orders - ${props.title}`}
          width="90em"
          destroyOnClose
          closable
          visible={props.isModalOpen}
          onClose={props.setIsModalOpen}
        >
          <Suspense fallback={<BundleLoader />}>

<DashProcurePayDrawerCard 
     modalData={props.modalData}
/> 
        </Suspense>
         
        </StyledDrawer>
      </div>
    );
}
const mapStateToProps = ({ customer }) => ({

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DashProcurePayDrawer);