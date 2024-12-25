import React, { } from "react";
import { StyledSelect } from "../../../Components/UI/Antd";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { Button, Tooltip } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Input } from "antd";

const Option = StyledSelect.Option;
const { Search } = Input;

const BillingActionLeft = (props) => {
  const dummy = ["cloud", "azure", "fgfdg"];

const billableCurr = props.billingByDesignation.length && props.billingByDesignation[0].billableCurency

  return (
    <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto ">
      <Tooltip
        title="Billing">
       
        <span
          onClick={() => props.setBillingViewType("list")}
          style={{
            marginRight: "0.5rem",
            color: props.viewType === "list" && "#1890ff",
            fontSize: "1.0625em",
            cursor: "pointer",
          }}
        >
          <LocalAtmIcon />
        </span>
        {/* </Badge> */}
      </Tooltip>

      <div style={{ width: "12rem" }}>
        <Input
          placeholder="Search by Name"
          // enterButton="Search"
          width={"100%"}     
          onChange={(e) => props.handleChange(e)}
          value={props.currentData}
        />
      </div>

      <Button
        type={props.currentData ? "primary" : "danger"}
        onClick={() => {
          props.inputCandidateDataSearch(props.currentData);
          props.getCandidateCountSearch(props.currentData)
        }}
      >
        Submit
      </Button>

      {/* &nbsp; */}

      <Button
        type={props.currentData ? "primary" : "danger"}
        // onClick={props.handleClear}
        onClick={() => {
          props.handleClear();
          props.getCandidateCountSearch()
        }}
      >
        Clear
      </Button>
    </div>
  );
};
const mapStateToProps = ({ billings, auth }) => ({
  billingByDesignation: billings.billingByDesignation,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(BillingActionLeft)