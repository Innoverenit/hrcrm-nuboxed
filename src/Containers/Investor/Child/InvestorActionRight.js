import React, {  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Button, Tooltip } from "antd";
import { StyledSelect } from "../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";

const Option = StyledSelect.Option;

function InvestorActionRight (props) {
 
    const {
      user,
      handleInvestorModal
    } = props;
    return (
      <div class=" flex  items-center">
        
        {props.viewType === "list"  &&  user.imInd === true  &&  user.investorCreateInd === true &&  (
        <Tooltip placement="left" title="Create">
          <Button
            type="primary"
            onClick={() => handleInvestorModal(true)}
          >
        <FormattedMessage
                        id="app.add"
                        defaultMessage="Add"
                      />
          </Button>
     </Tooltip>
        )}
      </div>
    );
}

const mapStateToProps = ({ auth}) => ({
  userId: auth.userDetails.userId,
  role: auth.userDetails.role,
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InvestorActionRight)
);
