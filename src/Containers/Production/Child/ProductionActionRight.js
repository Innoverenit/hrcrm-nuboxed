
import React, { } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Button } from "antd";
import { createProductionLink } from "../ProductionAction";


function ProductionActionRight (props) {
  console.log(props.viewType)
    const { handleCreateProduction, userId,user } = props;
    return (
      <>
        <div class=" flex items-center">
          {/* {(user.productionCreateInd === true || user.role === "ADMIN") &&(
          <Button
            type="primary"
        
            onClick={() => props.createProductionLink()}
          >
            Add
          </Button>
          )} */}

{(props.viewType === 'table') && (props.productionTableData.length===0)&&(  // Use !(props.viewtype === 'table') to check if viewtype is NOT 'table'
    (user.productionCreateInd === true || user.role === "ADMIN") && (
      <Button
        type="primary"
        onClick={() => props.createProductionLink()}
      >
        Add
      </Button>
    )
  )}
        </div>
      </>
    );
  
}

const mapStateToProps = ({ auth }) => ({
  userId: auth.userDetails.userId,
  role: auth.userDetails.role,
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
createProductionLink
}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductionActionRight)
);
