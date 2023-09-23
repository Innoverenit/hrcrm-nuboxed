import React, { lazy, Suspense, useEffect, useState } from "react";
import { MainWrapper } from "../../Components/UI/Elements";
import { BundleLoader } from "../../Components/Placeholder";
import { FlexContainer } from "../../Components/UI/Layout";
import ApprovalTab from "./Child/RulesTab/ApprovalTab";
import RulesTab from "./Child/RulesTab/RulesTab";
import ExclasionTab from "./Child/RulesTab/ExclasionTab";
import LeadsTab from "./Child/RulesTab/LeadsTab";
import MileageTab from "./Child/RulesTab/MileageTab";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getLeavesDetails } from "../Settings/SettingsAction";

const RulesActionLeft = lazy(() => import("./RulesActionLeft"));
const RulesActionRight = lazy(() => import("./RulesActionRight"));

const name = [
  {
    rulesName: "Leaves",
    ruleId: "1",
    component: <LeadsTab />,
  },
  {
    rulesName: "Mileage",
    ruleId: "2",
    component: <MileageTab />,
  },
  // {
  //   rulesName: "Approval",
  //   ruleId: "3",
  //   component: <ApprovalTab />,
  // },
  // {
  //   rulesName: "Escalation",
  //   ruleId: "4",
  //   component: <ExclasionTab />,
  // },
];
function Rules(props) {
  const [rules, setRules] = useState(name);
  const [currentRulesOpen, setCurrentRulesOpen] = useState(name[0]);
  const handleRuleClick = (item) => {
    debugger;
    setCurrentRulesOpen(item);
  };
  console.log(currentRulesOpen);
  useEffect(() => {
    props.getLeavesDetails();
  }, []);

  return (
    <div>
      {false ? (
        <MainWrapper>
          <BundleLoader />
        </MainWrapper>
      ) : (
          <FlexContainer>
            <Suspense fallback={"Loading..."}>
              <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
                <div style={{ width: "25%" }}>
                  <RulesActionLeft
                    handleRuleClick={handleRuleClick}
                    rule={rules}
                    currentRulesOpen={currentRulesOpen}
                  />
                </div>
                <div style={{ width: "75%" }}>
                  <RulesActionRight current={currentRulesOpen} />
                </div>
              </FlexContainer>
            </Suspense>
          </FlexContainer>
        )}
    </div>
  );
}

const mapStateToProps = ({ settings }) => ({ 
  leadsData: settings.leadsData,
  mileageData: settings.mileageData,
 });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ 
    getLeavesDetails,
    // getMileageDetails 
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Rules);
