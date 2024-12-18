import React, { Component } from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../../Components/Placeholder";

import { Icon } from "antd";
import { StyledTable } from "../../../../../Components/UI/Antd";

class ServiceTable extends Component {
  componentDidMount() {
    const {
      getServiceByOpportunityId,
      opportunity: { opportunityId },
      getProductsByOpportunityId,
      quoteId,
    } = this.props;
    // !this.props.quoteId && getServiceByOpportunityId(opportunityId);
  }
  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   const {
  //     getProductsByOpportunityId,
  //     getServiceByOpportunityId,
  //     opportunity: { opportunityId },
  //     quoteId,
  //   } = this.props;
  //   console.log(prevProps);
  //   if (this.props.quoteId !== prevProps.quoteId) {
  //     getServiceByOpportunityId(opportunityId);
  //   }
  // }
  render() {
    const {
      servicesByOpportunityId,
      fetchingServiceByOpportunityId,
    } = this.props;
    const columns = [
      {
        title: "Role",

        dataIndex: "role",
      },
      {
        title: "Region",
       
        dataIndex: "region",
      },

      {
        title: "Value",
      

        dataIndex: "minRate",
        render: (text, item) => {
          return (
            <>{`${item.exchangePrice.toFixed(2)} ${item.opportunityCurrency
              }`}</>
          );
        },
      },
      {
        title: "# ",
        dataIndex: "noOfUnit",
      },
      {
        title: "Unit",
         dataIndex: "unit",
      },
      {
        title: "",
        render: (name, item) => {
          return (
            <>
              {this.props.quoteId ? (
                ""
              ) : (
                  <Icon
                    type="delete"
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => {
                      this.props.deleteOppService(
                        this.props.opportunity.opportunityId,
                        item.serviceId
                      );
                    }}
                  />
                )}
            </>
          );
        },
      },
    ];

    if (fetchingServiceByOpportunityId) {
      return <BundleLoader />;
    }
    return (
      <>
        {true && (
          <StyledTable
            // rowSelection={rowSelection}
            rowKey=""
            scroll={{ y: 280 }}
            columns={columns}
            dataSource={
              this.props.quoteId
                ? this.props.quotationByQuoteId.productServiceMapper
                : servicesByOpportunityId
            }
            expandedRowRender={(record) => {
              return (
                <>
                  <p>{record.description || ""}</p>
                  <p>{`Max Rate : ${Number(record.maxRate).toFixed(2)} ${record.serviceCurrency
                    }`}</p>
                  <p>
                    {" "}
                    {`Min Rate : ${Number(record.minRate).toFixed(2)} ${record.serviceCurrency
                      }`}
                  </p>
                </>
              );
            }}
            pagination={this.props.quoteId ? false : false}
            onChange={console.log("contact onChangeHere...")}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = ({ opportunity }) => ({
  // opportunity: opportunity.opportunity,
  // fetchingServiceByOpportunityId: opportunity.fetchingServiceByOpportunityId,
  // fetchingServiceByOpportunityIdError:
  //   opportunity.fetchingServiceByOpportunityIdError,
  // servicesByOpportunityId: opportunity.servicesByOpportunityId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getServiceByOpportunityId,
      // getProductsByOpportunityId,
      // deleteOppService,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ServiceTable);
