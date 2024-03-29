import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import { handleLeadCallModal } from "../../LeadsAction";
import { PlusOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { Tooltip } from "antd";

const CallLeadsTable = lazy(() => import("./CallLeadsTable"));
const AddCallTaskModal = lazy(() => import("./AddCallTaskModal"));



const TabPane = StyledTabs.TabPane;

function  OpenCETmodal(props)  {
  return (
    <>
      <StyledDrawer
        title={props.rowdata.name}
        width="60%"
        visible={props.openCETmodal}
        onClose={() => {
          props.handleCETmodal(false);
        }}
      >
        <Suspense fallback={<BundleLoader />}>
          <LeadsCETTab rowdata={props.rowdata}/>
        </Suspense>
      </StyledDrawer>
    </>
  );

 function LeadsCETTab () {
  const { addCallTaskModal, handleLeadCallModal } = props;
    const { ...formProps } = props;
    console.log(props.rowdata)
    return (
      <>
        <TabsWrapper>
          <StyledTabs
            defaultActiveKey="1"
            style={{ overflow: "visible", width: "53vw", padding: "15px" }}
            animated={false}
          >
            <TabPane
              tab={
                <>
                  <span>
                    
                       <i class="fas fa-phone-square"></i>&nbsp;
                  Activity
                  </span>
                
                    <>
                      <Tooltip 
                        title={
                          <FormattedMessage
                            id="app.create"
                            defaultMessage="Create"
                          />
                        }
                      >
                       &nbsp;
                        <PlusOutlined
                          type="plus"
                          style={{color:"blue"}}
                          tooltiptitle={
                            <FormattedMessage
                              id="app.Create"
                              defaultMessage="Create"
                            />
                          }
                          onClick={() => {
                            handleLeadCallModal(true);
                          }}
                          size="0.875em"
                        />
                       
                      </Tooltip>
                    </>
                 
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <CallLeadsTable
                  rowdata={props.rowdata}
                />
              </Suspense>
            </TabPane>
          
          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={<BundleLoader/>}>
        <AddCallTaskModal
        rowdata={props.rowdata}
          addCallTaskModal={addCallTaskModal}
          handleLeadCallModal={handleLeadCallModal}
        />
        </Suspense>
      </>
    );
}

};

const mapStateToProps = ({ leads }) => ({
  addCallTaskModal: leads.addCallTaskModal,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleLeadCallModal
     
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OpenCETmodal);


