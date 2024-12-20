import React, { Component } from "react";
import { Divider } from "antd";
import dayjs from "dayjs";
import {
  Title,
  SubTitle,
  MultiAvatar,
  
} from "../../../../../Components/UI/Elements";
import { connect } from "react-redux";
import { getQuotation } from "../../../OpportunityAction";
import { bindActionCreators } from "redux";

class OpportunityProductView extends Component {
  componentDidMount() {
    //debugger;
    const {
      opportunity: { opportunityId },
      getQuotation,
    } = this.props;
    //debugger;
    console.log(opportunityId);
    // getQuotation(opportunityId);
  }
  render() {
    const { quotation, fetchingquotation } = this.props;
    // let currency = "";
    // quotation &&
    //   quotation.forEach((element) => {
    //     currency = element.currency;
    //   });
    // const total =
    //   quotation &&
    //   quotation.reduce((acc, item) => {
    //     return (acc += item.productValue);
    //   }, 0);
    // const cost = `${total.toFixed(2)}`;

    // let servicecurrency = "";
    // quotation &&
    //   quotation.forEach((element) => {
    //     currency = element.currency;
    //   });
    // const servicetotal =
    //   quotation &&
    //   quotation.reduce((acc, item) => {
    //     return (acc += item.serviceValue);
    //   }, 0);
    // const servicecost = `${servicetotal.toFixed(2)}` ;

    // const finalTotal = total + servicetotal;
    // console.log(finalTotal);
    // const value = `${finalTotal}`;
    // console.log(total);
    // console.log(quotation);

    return (
      <>
        <ProfileItemRow
          label="Product value"
        // value={`${cost} ${this.props.opportunity.currency}`}
        />
        <ProfileItemRow
          label="Service value"
        // value={`${servicecost} ${this.props.opportunity.currency}`}
        />

        <ProfileItemRow
          // data={parseInt(this.props.opportunity.proposalAmount)}
          // data1={parseInt(servicecost)}
          label="Total value"
        // value={`${Number(value).toFixed(2)} ${
        //   this.props.opportunity.currency
        // }`}
        />
      </>
    );
  }
}
const mapStateToProps = ({ opportunity }) => ({
  // opportunity: opportunity.opportunity,
  // fetchingquotation: opportunity.fetchingquotation,
  // fetchingquotationError: opportunity.fetchingquotationError,
  // quotation: opportunity.quotation,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getQuotation,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpportunityProductView);

const ProfileItemRow = ({ label, value, data, data1 }) => {
  console.log(data);
  console.log(data1);
  console.log(data < data1);
  return (

   <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto  m-2">
      <div
        style={{
          color: "#444",
          fontWeight: 600,
          fontSize: "0.8125em",
          width: "40%",
        }}
      >
        {label}
      </div>
      <div
        overflow="hidden"
        textOverflow="ellipsis"
        style={{
          marginLeft: "0.2rem",
          color: data < data1 ? "red" : "#777",
          fontSize: "0.8125em",
        }}
      >
        {value}
      </div>
    </div>
  );
};
