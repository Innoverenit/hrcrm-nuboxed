import React, { Component,lazy, Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
const MainNotes = lazy(() => import("../../../CustomNote/MainNotes"));


class AddInvestorNotesDrawerModal extends Component {
  render() {
      console.log("data5", this.props.RowData.name);

    return (
      <div>
        <StyledDrawer
          title={this.props.RowData.name}
          width="60%"
          visible={this.props.addDrawerInvestorNotesModal}
          closable
          placement="right"
          destroyOnClose
          onClose={() => this.props.handleInvestorNotesDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            
            <MainNotes
             type="investor"
             uniqueId={this.props.RowData.investorId}
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
)(AddInvestorNotesDrawerModal);
