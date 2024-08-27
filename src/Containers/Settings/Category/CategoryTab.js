import React, { useState,lazy, useEffect} from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../Components/UI/Antd";
import { connect } from "react-redux";
import EmployeeTab from "./EmployeeTab/EmployeeTab";
import SuppliersTab from "./SuppliersTab";
import ShipperTab from "./ShipperTab";
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
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
           "",   // "Module",
           "980",   // "Role",
           "1165",    // "Activity",
           "1011",   // "Corporate",
           "248",   // "Customer",
           "824",   // "Suppliers",
           "887",   // "Shipper",
           "511",   // "Investor",
           "660",   // "Order",
           "940",    // "Performance Management",
           "",    // "Words",
           "992",   // "Employee",
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);

        const name = [
              {
            rulesName: "Module",
            ruleId: "1",
            component:<ModuleTab
            translateText={props.translateText}
            selectedLanguage={props.selectedLanguage}/>,
          },

          {
            rulesName:"Role",
            ruleId: "2",
            component:<Category
            translateText={props.translateText}
            selectedLanguage={props.selectedLanguage}/>,
          },
            {
              rulesName:  "Activity",
              ruleId: "3",
              component:   <CategoryActivity
              translateText={props.translateText}
              selectedLanguage={props.selectedLanguage}/>,
            },
            {
              rulesName: "Corporate",
              ruleId: "4",
              component: <OthersTab 
              translateText={props.translateText}
              selectedLanguage={props.selectedLanguage}/>,
            },
            {
              rulesName: "Customer",
              ruleId: "5",
              component:<CustomerSectorTab 
              translateText={props.translateText}
              selectedLanguage={props.selectedLanguage}/>,
            },
            {
              rulesName: "Suppliers",
              ruleId: "6",
              component:<SuppliersTab 
              translateText={props.translateText}
              selectedLanguage={props.selectedLanguage}/>,
            },
            {
              rulesName: "Shipper",
              ruleId: "7",
              component:<ShipperTab 
              translateText={props.translateText}
              selectedLanguage={props.selectedLanguage}/>,
            },
            {
              rulesName: "Investor",
              ruleId: "8",
              component:<InvestorTab 
              translateText={props.translateText}
              selectedLanguage={props.selectedLanguage}/>,
            },
            {
              rulesName: "Order",
              ruleId: "9",
              component:<OrderTab
              translateText={props.translateText}
              selectedLanguage={props.selectedLanguage} />,
            },
            {
              rulesName: "Performance Management",
              ruleId: "10",
              component:<PerformanceManagementTab 
              translateText={props.translateText}
              selectedLanguage={props.selectedLanguage}/>,
            },
            {
              rulesName: "Words",
              ruleId: "11",
              component:<Words
              translateText={props.translateText}
              selectedLanguage={props.selectedLanguage}/>,
            },
            {
              rulesName: "Employee",
              ruleId: "12",
              component:<EmployeeTab
              translateText={props.translateText}
              selectedLanguage={props.selectedLanguage}/>,
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
                    translateText={props.translateText}
                    selectedLanguage={props.selectedLanguage}
                  />
                </div>
                <div class=" w-[78%]" >
                  <CategoryActionRight current={currentRulesOpen} 
                   translateText={props.translateText}
                           selectedLanguage={props.selectedLanguage}/>
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
   