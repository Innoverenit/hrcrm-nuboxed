import React, { Component,Suspense ,lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import LinkedContact from "../CustomerDetail/CustomerTab/ContactTab/LinkedContact";


class CustomerContactDrawerModal extends Component {
  render() {
      console.log("data5", this.props.customer.name);
      const {customer : {name,customerId}} =this.props
    return (
      <div>
        <StyledDrawer
        // title="Notes"
          title={name}
          width="65%"
          visible={this.props.addDrawerCustomerContactModal}
          destroyOnClose
          closable
          onClose={() => this.props.handleCustomerContactDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <LinkedContact 
            defaultCustomers={[{ label: name, value: customerId }]}
            customerId={ this.props.customer.customerId }
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
const mapStateToProps = ({ customer, candidate }) => ({
 
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerContactDrawerModal);
