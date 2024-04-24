import React, { Component,Suspense ,lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";

const CustomerContactCardList = lazy(() =>
  import("./CustomerContactCardList")
);

class CustomerContactDrawerModal extends Component {
  render() {
      console.log("data5", this.props.customer.name);

    return (
      <div>
        <StyledDrawer
        // title="Notes"
          title={this.props.customer.name}
          width="80%"
          visible={this.props.addDrawerCustomerContactModal}
          destroyOnClose
          closable
          onClose={() => this.props.handleCustomerContactDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <CustomerContactCardList 
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
)(CustomerContactDrawerModal);
