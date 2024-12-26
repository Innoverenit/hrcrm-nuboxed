import React, {  lazy} from "react";
import { StyledSelect, } from "../../../Components/UI/Antd";

import {
  setDashboardViewType,
} from "../DashboardAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Input,Tag } from "antd";

const DashboardShareForm=lazy(() => import("./DashboardShareForm"));


const Option = StyledSelect.Option;
const { Search } = Input;
const HeaderActionRight  = (props) => {
  const dummy = ["cloud", "azure", "fgfdg"];
  const {
    viewType,
    setDashboardViewType,
    user,
    role
  } = props;
 
  return (
    <div class=" flex items-center max-sm:-mr-[0.75rem]">
         { user.department=== "Management" && (  
            <>          
            </>
             )}

{user.dashboardFullListInd===true && (
              <Tag
                color={viewType === "ALL" ? "tomato" : "#FFA500"}
                style={{
                  cursor: "pointer",                  
                  fontWeight: viewType === "ALL" ? "tomato" : "#FFA500",
                  textAlign: "center",
                  fontFamily:"poppins",
                  borderColor: "tomato",
                }}
               onClick={() => setDashboardViewType("ALL")}
              >
              Enterprise
              </Tag>
            )}
             {viewType==="ALL" && (
        <DashboardShareForm/>
        )}
           
    </div>
  );
};
const mapStateToProps = ({ account,report, auth,opportunity,dashboard }) => ({
reportViewType: report.reportViewType,
viewType:dashboard.viewType,
user: auth.userDetails,
role: auth.userDetails.role,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    // setReportViewType,
    setDashboardViewType
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HeaderActionRight)

