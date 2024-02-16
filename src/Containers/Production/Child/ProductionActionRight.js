
import React, { } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Button } from "antd";


function ProductionActionRight (props) {
  
    const { handleCreateProduction, userId,user } = props;
    return (
      <>
        <div class=" flex items-center">
          
          <Button
            type="primary"
         
            onClick={() => handleCreateProduction(true)}
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
  connect(mapStateToProps, mapDispatchToProps)(ProductionActionRight)
);
