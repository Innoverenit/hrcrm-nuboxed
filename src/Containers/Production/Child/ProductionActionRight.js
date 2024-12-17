
import React, { } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Button } from "antd";
import { createProductionLink } from "../ProductionAction";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';

function ProductionActionRight (props) {
  console.log(props.viewType)
    const { handleCreateProduction, userId,user } = props;
    return (
      <>
        <div class=" flex items-center">
        
{(props.viewType === 'table') && (props.productionTableData.length===0)&&(  // Use !(props.viewtype === 'table') to check if viewtype is NOT 'table'
    (user.productionCreateInd === true || user.role === "ADMIN") && (
      <Button
        type="primary"
        onClick={() => props.createProductionLink()}>
       <DataSaverOnIcon className="!text-icon"/> Add
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
