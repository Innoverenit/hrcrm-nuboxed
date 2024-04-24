import React, { Component, Suspense } from "react";
import { BundleLoader } from "../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../Components/UI/Antd";
import ActionTab from "../Auth/ActionTab";

class AddActionModal extends Component {
  render() {
    //  console.log("data5", this.props.currentNameId.taskName);

    return (
      <div>
        <StyledDrawer
        title="Action Points"
          // title={this.props.rowdata.name}
          width="64%"
          visible={this.props.addDrawerActionModal}
          onClose={() => this.props.handleActionDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <ActionTab
            // rowdata={this.props.rowdata} 
            // leadsId={this.props.rowdata.leadsId} 
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
)(AddActionModal);
