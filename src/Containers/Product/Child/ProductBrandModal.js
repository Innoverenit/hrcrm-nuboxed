import React, { Component, Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import ProductBrandList from "./ProductBrandList"

import { bindActionCreators } from "redux";
//import MaterialBrandList from "./MaterialBrandList"

import { StyledDrawer } from "../../../Components/UI/Antd";

class ProductBrandModal extends Component {
  render() {
    //console.log("dom", this.props.opportunityInitiativesSkillsDetails);

    return (
      <div>
        <StyledDrawer
          title="Brand"
          width="60%"
          visible={this.props.addProductBrandModal}
          closable
          placement="right"
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() => this.props.handleProductBrandModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <ProductBrandList
                              translateText={this.props.translateText}
                              selectedLanguage={this.props.selectedLanguage}
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
)(ProductBrandModal);
