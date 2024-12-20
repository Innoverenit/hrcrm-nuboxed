import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../Components/UI/Antd";
import RecruiterTable from "./RecruiterTable"
// import RecruitmentMap from "./RecruitmentMap";
import TableViewIcon from '@mui/icons-material/TableView';
import LanguageIcon from '@mui/icons-material/Language';

// const CandidateCallForm = lazy(() =>
//   import("../Activity/CandidateActivityForm/CandidateCallForm")
// );
// const CandidateEventForm = lazy(() =>
//   import("../Activity/CandidateActivityForm/CandidateEventForm")
// );
// const CandidateTaskForm = lazy(() =>
//   import("../Activity/CandidateActivityForm/CandidateTaskForm")
// );

const TabPane = StyledTabs.TabPane;

export class RecruiterTab extends Component {
  render() {
    const { ...formProps } = this.props;
    console.log("np",this.props.candidatePostData.address)
    console.log("npx",this.props.recruiter)
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.15;
    // console.log("...this.props.formProps...", this.props.formProps);
    return (
      <>
        {/* <TabsWrapper> */}
          <StyledTabs
            defaultActiveKey="1"
            style={{ overflow: "visible", width: "95vw", padding: "15px" }}
            animated={false}
            scroll={{ y: tableHeight }}
          >
            <TabPane
              tab={
                <span>
                 <TableViewIcon  />&nbsp;
                  List
                </span>
              }
              key="1"
            >
              <Suspense fallback={"loading ..."}>
                 <RecruiterTable 
          
           rowSelectionForRecruiter={this.props.rowSelectionForRecruiter}
          candidatePostData={this.props.candidatePostData}
          recruiter={this.props.recruiter}
          //recruitmentId={props.recruitmentId}
           opportunityId={this.props.opportunityId}/>{" "}
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <LanguageIcon  />&nbsp;
                  Map
                </span>
              }
              key="2"
            >
              {/* <Suspense fallback={"loading ..."}>
              <RecruitmentMap
               candidatePostData={this.props.candidatePostData}
               recruiter={this.props.recruiter}
              />
              </Suspense> */}
            </TabPane>
            
          </StyledTabs>
        {/* </TabsWrapper> */}
      </>
    );
  }
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecruiterTab);
