import TabPane from "antd/lib/tabs/TabPane";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React, { Suspense } from "react";

import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import QuestionsGroup from "./AssessmentDetailsRight/Questions/QuestionsGroup";
import { handleQuestionrModal } from "../../../AccessmentAction";
import { Form } from "formik";

function AssessmentDetailsRight(props) {
  const { assessment,assessmentByAssessmentId } = props;
const assessmentId=props.assessmentByAssessmentId.assessmentId;
  const { activeKey, setState } = props;
  function handleTabChange(key) {
    setState({ activeKey: key });
  }
  return (
    <>
      <TabsWrapper>
        <StyledTabs defaultActiveKey="1" onChange={handleTabChange}>
          <TabPane
            tab={
              <>
                <span>
                  <FormattedMessage
                    id="app.questions"
                    defaultMessage="Questions"
                  />
                </span>
              </>
            }
            key="1"
          >
            <Suspense fallback={"Loading ..."}>
              {" "}
              <>
                
                  <div class="flex justify-between h-[26rem] overflow-scroll pr-2" >
                    <QuestionsGroup assessmentId={assessmentId} />
                  </div>
              </>
            </Suspense>
          </TabPane>
        </StyledTabs>
      </TabsWrapper>

    </>
  );
}
const mapStateToProps = ({ assessment }) => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleQuestionrModal,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssessmentDetailsRight);
