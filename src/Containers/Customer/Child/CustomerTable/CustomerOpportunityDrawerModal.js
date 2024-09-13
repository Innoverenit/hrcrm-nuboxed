import React, { Component,Suspense ,lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import LinkedOpportunity from "../CustomerDetail/CustomerTab/OpportunityTab/LinkedOpportunity";




class CustomerOpportunityDrawerModal extends Component {
  render() {
      console.log("data5", this.props.customer.customerId);

    return (
      <div>
        <StyledDrawer
        // title="Notes"
          title={this.props.customer.name}
          width="80%"
          destroyOnClose
          closable
          visible={this.props.addDrawerCustomerOpportunityModal}
          onClose={() => this.props.handleCustomerOpportunityDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
           
            <LinkedOpportunity customer={this.props.customer}
                 translateText={this.props.translateText}
                 selectedLanguage={this.props.selectedLanguage}
               translatedMenuItems={this.props.translatedMenuItems}
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
)(CustomerOpportunityDrawerModal);
