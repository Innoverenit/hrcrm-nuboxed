import React, { useState,lazy} from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../Components/UI/Antd";
import { connect } from "react-redux";
import EmployeeTab from "./EmployeeTab/EmployeeTab";
const PerformanceManagementTab = lazy(() =>
  import("./PerformanceManagementTab/PerformanceManagementTab")
);
const OrderTab = lazy(() =>
  import("./OrderTab/OrderTab")
);
const CategoryActivity = lazy(() =>
  import("./CategoryActivity")
);
const Category = lazy(() =>
  import("./Category")
);
const CategoryActionLeft = lazy(() =>
  import("./CategoryActionLeft")
);
const CategoryActionRight = lazy(() =>
  import("./CategoryActionRight")
);
const OthersTab = lazy(() =>
  import("./OthersTab")
);
const CustomerSectorTab = lazy(() =>
  import("./CustomerSectorTab")
);
const InvestorTab = lazy(() =>
  import("./InvestorTab/InvestorTab")
);
const ModuleTab = lazy(() =>
  import("./Module/ModuleTab")
);
const Words =lazy(()=>import("./Words/Words"));

const TabPane = StyledTabs.TabPane;

function CategoryTab (props) {

        const name = [
              {
            rulesName: "Module",
            ruleId: "1",
            component:<ModuleTab/>,
          },

          {
            rulesName: "Role",
            ruleId: "2",
            component:<Category/>,
          },
            {
              rulesName: "Activity",
              ruleId: "3",
              component:   <CategoryActivity/>,
            },
            {
              rulesName: "Corporate",
              ruleId: "4",
              component: <OthersTab />,
            },
            {
              rulesName: "Customer",
              ruleId: "5",
              component:<CustomerSectorTab />,
            },
            {
              rulesName: "Investor",
              ruleId: "6",
              component:<InvestorTab />,
            },
            {
              rulesName: "Order",
              ruleId: "7",
              component:<OrderTab />,
            },
            {
              rulesName: "Performance Management",
              ruleId: "8",
              component:<PerformanceManagementTab />,
            },
            {
              rulesName: "Words",
              ruleId: "9",
              component:<Words/>,
            },
            {
              rulesName: "Employee",
              ruleId: "10",
              component:<EmployeeTab/>,
            },

          ];
          const [rules, setRules] = useState(name);
          const [currentRulesOpen, setCurrentRulesOpen] = useState(name[0]); 
          
          
          const handleRuleClick = (item) => {
            setCurrentRulesOpen(item);  
          };
        return (
          <div>
          <div>
            {/* <Suspense fallback={"Loading..."}> */}
              <div class=" flex flex-no-wrap w-full" >
                <div class=" w-[22%]" >
                  <CategoryActionLeft
                    handleRuleClick={handleRuleClick}
                    rules={rules}
                    currentRulesOpen={currentRulesOpen}
                  />
                </div>
                <div class=" w-[78%]" >
                  <CategoryActionRight current={currentRulesOpen} />
                </div>
              </div>
            {/* </Suspense> */}
          </div>
        </div>
      );
    }
    const mapStateToProps = ({ settings, auth }) => ({
      recruitmentDetailsId:
        auth.userDetails && auth.userDetails.recruitmentDetailsId,
        organizationId: auth.userDetails && auth.userDetails.organizationId,
      advanceRecruitInd:
        auth.userDetails &&
        auth.userDetails.metaData &&
        auth.userDetails.metaData.advanceRecruitInd,
    });
    const mapDispatchToProps = (dispatch) =>
      bindActionCreators(
        {  
        },
        dispatch
      );
export default connect(mapStateToProps, mapDispatchToProps)(CategoryTab);
   