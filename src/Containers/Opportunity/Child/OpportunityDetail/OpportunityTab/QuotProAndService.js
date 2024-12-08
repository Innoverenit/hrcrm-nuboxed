import React, { Component } from "react";
// import QuotPro from "./QuotPro";
import { StyledCollapse } from "../../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Icon } from "antd";
import ServiceTable from "./ServiceTable";
// import { getCurrentQuotation } from "../../../OpportunityAction";
const Panel = StyledCollapse.Panel;

class QuotProAndService extends Component {
  // componentDidMount() {
  //   this.props.quoteId && this.props.getCurrentQuotation(this.props.quoteId);
  // }
  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   const { } = this.props;
  //   console.log(prevProps);
  //   if (this.props.quoteId !== prevProps.quoteId) {
  //     this.props.getCurrentQuotation(this.props.quoteId);
  //   }
  // }
  render() {
    const {
      productsByOpportunityId,
      fetchingProductsByOpportunityId,
      servicesByOpportunityId,
      quoteId,
    } = this.props;
    console.log(quoteId);
    let currency = "";
    productsByOpportunityId &&
      productsByOpportunityId.forEach((element) => {
        currency = element.opportunityCurrency;
      });
    const total =
      productsByOpportunityId &&
      productsByOpportunityId.reduce((acc, item) => {
        return (acc += item.exchangePrice);
      }, 0);
    const cost = `${total.toFixed(2)}`;

    let servicecurrency = "";
    servicesByOpportunityId &&
      servicesByOpportunityId.forEach((element) => {
        servicecurrency = element.opportunityCurrency;
      });
    const servicetotal =
      servicesByOpportunityId &&
      servicesByOpportunityId.reduce((acc, item) => {
        return (acc += item.exchangePrice);
      }, 0);
    const servicecost = `${servicetotal.toFixed(2)}`;

    return (
      <div>
        <StyledCollapse
          bordered={false}
          style={{ height: "40vh", overflow: "scroll" }}
          defaultActiveKey={["1"]}
          expandIcon={({ isActive }) => (
            <Icon type="caret-right" rotate={isActive ? 90 : 0} />
          )}
        >
          <Panel
            header={<Header cost={cost} curr={currency} quoteId={quoteId} />}
            key="1"
            style={{}}
          >
            {/* Total Cost&nbsp; {cost} &nbsp;
            {currency} */}
            {/* <QuotPro
              quoteId={this.props.quoteId}
              quotationByQuoteId={this.props.quotationByQuoteId}
            /> */}
          </Panel>
          <Panel
            header={
              <Header1
                cost={servicecost}
                curr={servicecurrency}
                quoteId={quoteId}
              />
            }
            key="2"
            style={{}}
          >
            <ServiceTable
              quoteId={this.props.quoteId}
              quotationByQuoteId={this.props.quotationByQuoteId}
            />
          </Panel>
        </StyledCollapse>
      </div>
    );
  }
}
const mapStateToProps = ({ opportunity }) => ({
  // opportunity: opportunity.opportunity,
  // fetchingProductsByOpportunityId: opportunity.fetchingProductsByOpportunityId,
  // fetchingProductsByOpportunityIdError:
  //   opportunity.fetchingProductsByOpportunityIdError,
  // productsByOpportunityId: opportunity.productsByOpportunityId,
  // servicesByOpportunityId: opportunity.servicesByOpportunityId,
  // quotationByQuoteId: opportunity.quotationByQuoteId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      //   getProductsByOpportunityId
      // getCurrentQuotation,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(QuotProAndService);

function Header(props) {
  return (
    <>
      {props.quoteId ? (
        <>
          <span style={{ fontWeight: "bold" }}>{`Product `} </span>
        </>
      ) : (
        <>
          <span style={{ fontWeight: "bold" }}>{`Product `} </span> &nbsp;
          <span> {` Total Value ${props.cost} ${props.curr}`}</span>
        </>
      )}
    </>
  );
}

function Header1(props) {
  return (
    <>
      {props.quoteId ? (
        <>
          <span style={{ fontWeight: "bold" }}>{`Service `} </span>
        </>
      ) : (
        <>
          <span style={{ fontWeight: "bold" }}>{`Service `} </span>
          &nbsp;
          <span> {` Total Value ${props.cost} ${props.curr}`}</span>
        </>
      )}
    </>
  );
}

// const columns = [
//       {
//         title: "",
//         width: "2%",
//       },
//       {
//         title: "User Id",
//         dataIndex: "userId",
//       },
//       {
//         title: "Currency",
//         dataIndex: "currency",
//       },
//       {
//         title: "Date",
//         render: (name, item, i) => {
//           return <span>{dayjs(item.quoteDate).format("ll")}</span>;
//         },
//       },
//       {
//         title: "Opportunity Name",
//         dataIndex: "oppName",
//       },
//       {
//         title: "Product cost",
//         dataIndex: "productCost",
//       },

//       {
//         title: "Service Cost",
//         dataIndex: "serviceCost",
//       },
//       {
//         title: "Total Cost",
//         dataIndex: "totalCost",
//       },

//       {
//         title: "",
//         render: (name, item, i) => {
//           return <div>/div>;
//         },
//       },
//     ];
