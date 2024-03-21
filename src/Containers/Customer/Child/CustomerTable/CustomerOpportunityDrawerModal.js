import React, { Component,Suspense ,lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";


const CustomerOpportunityCardList = lazy(() =>
  import("./CustomerOpportunityCardList")
);

class CustomerOpportunityDrawerModal extends Component {
  render() {
      console.log("data5", this.props.customer.name);

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
            <CustomerOpportunityCardList 
            customer={this.props.customer}
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
