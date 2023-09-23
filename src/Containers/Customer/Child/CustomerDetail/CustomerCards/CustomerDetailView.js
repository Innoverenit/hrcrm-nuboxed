import React, { Component } from "react";
import { SubTitle } from "../../../../../Components/UI/Elements";
class CustomerDetailView extends Component {
  render() {
    console.log(this.props.customer);
    const {
      customer: { url, phoneNumber,address },
    } = this.props;

    const addressdata=address&&address.length&&address[0].address1;
    const addressdata1=address&&address.length&&address[0].street;
    const addressdata2=address&&address.length&&address[0].city;
    const addressdata3=address&&address.length&&address[0].state;
    const addressdata4=address&&address.length&&address[0].postalCode;
    return (
      <>
        

<CustomerItemRow label="Address" value={addressdata||""} />
        <CustomerItemRow label="Street" value={addressdata1||""} />
        <CustomerItemRow label="City" value={addressdata2||""} />
        <CustomerItemRow label="State" value={addressdata3||""} />
        <CustomerItemRow label="Pin Code" value={addressdata4||""} />
      </>
    );
  }
}
export default CustomerDetailView;

const CustomerItemRow = ({ label, value }) => {
  return (
    <div class=" flex items-center flex-nowrap m-1"
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle style={{
         }}>{value}</SubTitle>
    </div>
  );
};