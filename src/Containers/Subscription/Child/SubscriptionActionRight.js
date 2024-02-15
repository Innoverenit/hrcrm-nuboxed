
import React, { } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Button } from "antd";
import { StyledSelect } from "../../../Components/UI/Antd";

const Option = StyledSelect.Option;

function SubscriptionActionRight (props) {
  
    const { handleCreateSubscriptionDrawer, userId,user } = props;
    return (
      <>
        <div class=" flex items-center">
          
          <Button
            type="primary"
         
            onClick={() => handleCreateSubscriptionDrawer(true)}
          >
            Add
          </Button>
        
        </div>
      </>
    );
  
}

const mapStateToProps = ({ auth }) => ({
  userId: auth.userDetails.userId,
  role: auth.userDetails.role,
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SubscriptionActionRight)
);
