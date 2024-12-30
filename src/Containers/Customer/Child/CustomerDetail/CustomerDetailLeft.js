import React, { Component,lazy} from "react";
const CustomerOverviewCard =lazy(()=> import("./CustomerCards/CustomerOverViewCard"));
const CustomerDetailCard =lazy(()=> import("./CustomerCards/CustomerDetailCard"));
const CustomerExtraDetailCard =lazy(()=> import("./CustomerCards/CustomerExtraDetailCard"));
class CustomerDetailLeft extends Component {
  render() {
    const { customer } = this.props;
    return (
      <>
        <div class=" flex flex-col">
          <CustomerOverviewCard customer={customer}
           translateText={this.props.translateText}
           selectedLanguage={this.props.selectedLanguage}
           translatedMenuItems={this.props.translatedMenuItems} />
          {/* <CustomerTopicOfIntrest customer={customer} /> */}
          <CustomerExtraDetailCard customer={customer}
           translateText={this.props.translateText}
           selectedLanguage={this.props.selectedLanguage}
           translatedMenuItems={this.props.translatedMenuItems} />         
          <CustomerDetailCard customer={customer}
           translateText={this.props.translateText}
           selectedLanguage={this.props.selectedLanguage}
           translatedMenuItems={this.props.translatedMenuItems} />
        </div>
      </>
    );
  }
}
export default CustomerDetailLeft;
