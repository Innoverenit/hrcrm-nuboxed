import React, { Component, Suspense } from "react";
import { BundleLoader } from "../../Components/Placeholder";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";

import { StyledDrawer } from "../../Components/UI/Antd";
import ProductBrandDetails from "./ProductBrandDetails"


class AddProductBrandDetailsModal extends Component {
  render() {
   

    return (
      <div>
        <StyledDrawer
          title="Brand"
          width="60%"
          visible={this.props.addProductBrandDetailsModal}
          closable
          placement="right"
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() => this.props.handleProductBrandDetailsModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
       <ProductBrandDetails
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
  opportunityId: opportunity.opportunity.opportunityId,
  candidate: candidate.candidate,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProductBrandDetailsModal);
