import React, { Component,  Suspense } from "react";
import { StyledTabs } from "../../../../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { TabsWrapper } from "../../../../../../../Components/UI/Layout";
import RemarksTable from "../Child/RemarksTable";
import { Tooltip } from "antd";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

const TabPane = StyledTabs.TabPane;

class RecruitmentDetailsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
    };
  }
  handleTabChange = (key) => this.setState({ activeKey: key });
  render() {
    const { activeKey } = this.state;
    const { handleRemarksModal, addRemarksModal } = this.props;
    console.log(this.props.stageList);
    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            <TabPane
              tab={
                <>
                  <span>Remarks</span>
                  {activeKey === "1" && (
                    <>
                      <Tooltip
                       title="Tag Remarks"
                       
                      >
                         <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                     
                          tooltiptitle="Tag Remarks"
                        
                          // handleIconClick={() => handleRemarksModal(true)}
                      
                        />

                        {/* <AddRemarksModal
                        addRemarksModal={addRemarksModal}
                        handleRemarksModal={handleRemarksModal}
                        stageList={this.props.stageList}
                        profileId={this.props.profileId}
                      /> */}
                      </Tooltip>
                    </>
                  )}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                <RemarksTable profileId={this.props.profileId} />
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                  <span>
                    <TextSnippetIcon type="file" />
                
                  
                    Documents
                  </span>
                  {activeKey === "3" && (
                    <>
                      <Tooltip //title="Tag Document"
                        title="Tag Document"
                      
                      >
                         <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                      
                          tooltiptitle="Tag Document"
                        
                         
                        />
                      </Tooltip>
                    </>
                  )}
                </>
              }
              key="3"
            >
              {/* <DocumentUploadModal /> */}

              <Suspense fallback={"Loading ..."}>
                {/* <LinkContactDocumentTable contact={this.props.contact} /> */}
              </Suspense>
            </TabPane>
          </StyledTabs>
        </TabsWrapper>
      </>
    );
  }
}
const mappropsToProps = ({ opportunity }) => ({
  // addRemarksModal: opportunity.addRemarksModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // handleRemarksModal,
    },
    dispatch
  );

export default connect(
  mappropsToProps,
  mapDispatchToProps
)(RecruitmentDetailsTab);
