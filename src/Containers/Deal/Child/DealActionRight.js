import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";
import { base_url } from "../../../Config/Auth";
import { Button, Tooltip, } from "antd";

class DealActionRight extends React.Component {
  render() {
    const {
      userId,
      user,
      handleDealModal,
    } = this.props;
    return (
      <div class=" flex items-center">
         {/* {user.employee_type === "contractor" && user.candiContShareInd === true || user.employee_type === "employee" && user.candiEmpShareInd === true && user.opportunityFullListInd===true &&( */}
  {/* <OpportunityShareForm/> */}
         {/* )} */}
         <div class="max-sm:hidden">
        <Button
        style={{lineHeight:"inherit"}}
           type="primary"
          // default
        href={`${base_url}/excel/export/user/opportunity/${userId}`}
        >
          {/* Export */}
          <FormattedMessage
                id="app.export"
                defaultMessage="Export"
              />
        </Button>
        </div>
        <Tooltip placement={"left"} title={<FormattedMessage
                id="app.create"
                defaultMessage="Create"
              />}>
           {/* {user.userType !== "USER" && user.department !== "Recruiter" && (  */}
           {user.imInd === true  && user.opportunityCreateInd ===true && (
          <Button
            type="primary"
            // ghost
            onClick={() => handleDealModal(true)}
          >
               <FormattedMessage
                        id="app.add"
                        defaultMessage="Add"
                      />
          </Button>
            )}  
        </Tooltip>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DealActionRight)
);
