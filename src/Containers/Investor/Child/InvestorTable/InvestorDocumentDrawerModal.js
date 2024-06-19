import React, { Component,Suspense,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import InvestorDocumentTable from "./InvestorDocumentTable";
const InvestorPulseJumpstart =lazy(()=> import("./InvestorPulseJumpstart"));



class InvestorDocumentDrawerModal extends Component {
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
          visible={this.props.addDrawerInvestorDocumentModal}
          onClose={() => this.props.handleInvestorDocumentModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <InvestorDocumentTable
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
)(InvestorDocumentDrawerModal);

