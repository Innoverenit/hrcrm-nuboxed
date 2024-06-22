import React, { } from "react";
import { FlexContainer } from "../../../Components/UI/Layout";
import { Tooltip, Avatar } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import TocIcon from '@mui/icons-material/Toc';
import {
  inputCustomerAllDataSearch,
  inputCustomerReceivableDataSearch,
  inputDistributorAllDataSearch,
  inputDistributorReceivableDataSearch,
} from "../CollectionAction";

const CollectionActionLeft = (props) => {
  const dummy = ["cloud", "azure", "fgfdg"];
  const { user } = props;

  const { allCustomers } = props;
  console.log(allCustomers);
  var total =
    allCustomers &&
    allCustomers.reduce((a, item) => {
      return (a += item.totalPayableAmount) || 0;
    }, 0);
  var cost = `${Number(total).toFixed(2)}`;

  var totalA =
    allCustomers &&
    allCustomers.reduce((a, item) => {
      return (a += item.totalPayablePrev) || 0;
    }, 0);
  var costA = `${Number(totalA).toFixed(2)}`;

  const { allDistributors } = props;
  var total1 =
    allDistributors &&
    allDistributors.reduce((a, item) => {
      return (a += item.totalPayableAmount) || 0;
    }, 0);
  var cost1 = `${Number(total1).toFixed(2)}`;

  var totalB =
    allDistributors &&
    allDistributors.reduce((a, item) => {
      return (a += item.totalPayablePrev) || 0;
    }, 0);
  var costB = `${Number(totalB).toFixed(2)}`;

  return (
    <FlexContainer alignItems="center">
      <Tooltip title="All"
      // title="Distributor"
      >
        <span
          onClick={() => props.setCollectionViewType("distributor")}
          style={{
            marginRight: "0.5rem",
            color: props.viewType === "distributor" && "#1890ff",
          }}
        >
          <Avatar style={{ background: props.viewType === "distributor" ? "#f279ab" : "#4bc076" }}>
            <TocIcon />
          </Avatar>
        </span>
      </Tooltip>
      {/* <Tooltip
      //title="Customer"
      >
        <span
          onClick={() => props.setCollectionViewType("customer")}
          style={{
            marginRight: "0.5rem",
            color: props.viewType === "customer" && "#1890ff",
          }}
        > <FontAwesomeIcon icon={solid('address-card')}/>&nbsp; Customer
        </span>
      </Tooltip> */}

      {props.viewType === "distributor" && (
        <>
          <div style={{ marginLeft: "1.875em" }}>

          </div>
          &nbsp; &nbsp;

          &nbsp;
          {props.activeKey1 === "1" ? null : (
            <>
              <div style={{ marginLeft: "1.25em" }}>
                <></>
              </div>
              <div style={{ marginLeft: "1.25em" }}>
                <></>
              </div>
            </>
          )}
        </>
      )}

      {props.viewType === "customer" && (
        <>
          {props.activeKey === "1" ? (
            <div style={{ marginLeft: "1.875em" }}>

            </div>
          ) : (
            <div style={{ marginLeft: "1.875em" }}>

            </div>
          )}

          {props.activeKey === "1" ? null : (
            <>
              <div style={{ marginLeft: "1.25em" }}>
                <>
                  <b>Outstanding Opening ₹ {`${costA}`}</b>
                </>
              </div>
              <div style={{ marginLeft: "1.25em" }}>
                <>
                  <b>Outstanding Closing ₹ {`${cost}`}</b>
                </>
              </div>
            </>
          )}
        </>
      )}
    </FlexContainer>
  );
};
const mapStateToProps = ({ auth, collection, distributor, customer }) => ({
  user: auth.userDetails,
  viewType: collection.viewType,
  allCustomers: collection.allCustomers,
  allDistributors: collection.allDistributors,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      inputCustomerAllDataSearch,
      inputCustomerReceivableDataSearch,
      inputDistributorAllDataSearch,
      inputDistributorReceivableDataSearch,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CollectionActionLeft)
);
