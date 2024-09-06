import React, { Component, Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import MaterialBrandList from "./MaterialBrandList"

import { StyledDrawer } from "../../../Components/UI/Antd";

class MaterialBrandModal extends Component {
  render() {
    //console.log("dom", this.props.opportunityInitiativesSkillsDetails);

    return (
      <div>
        <StyledDrawer
          title="Brand"
          width="60%"
          visible={this.props.addSuppliesBrandModal}
          closable
          placement="right"
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() => this.props.handleSuppliesBrandModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <MaterialBrandList
            currentBrandId={this.props.currentBrandId}
            />
          </Suspense>
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ opportunity, candidate }) => ({
//   opportunityId: opportunity.opportunity.opportunityId,
//   candidate: candidate.candidate,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaterialBrandModal);
