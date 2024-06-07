import React, { Component,Suspense,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
const InvestorPulseJumpstart =lazy(()=> import("./InvestorPulseJumpstart"));



class InvestorPulseDrawerModal extends Component {
  render() {
      console.log("data5", this.props.RowData.name);

    return (
      <div>
        <StyledDrawer
        // title="Notes"
          title={this.props.RowData.name}
          width="60%"
          destroyOnClose
          closable
          placement="right"
          visible={this.props.addDrawerInvestorPulseModal}
          onClose={() => this.props.handleInvestorPulseDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <InvestorPulseJumpstart
            RowData={this.props.RowData}
            />
          </Suspense>
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ opportunity, candidate }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvestorPulseDrawerModal);
