import React, { Suspense,lazy } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";

const InvestorJumpstartDrawerCard =lazy(()=>import("./InvestorJumpstartDrawerCard"));
const  InvestorDealJumpstartDrawerCard=lazy(()=>import("./InvestorDealJumpstartDrawerCard"));
function InvestorJumpstartDrawer (props) {

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
          {props.title === "Investor" ? (
            <InvestorJumpstartDrawerCard 
     modalData={props.modalData}

/>  ) : 
 <InvestorDealJumpstartDrawerCard 
 modalData={props.modalData}

/>

}

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

export default connect(mapStateToProps, mapDispatchToProps)(InvestorJumpstartDrawer);