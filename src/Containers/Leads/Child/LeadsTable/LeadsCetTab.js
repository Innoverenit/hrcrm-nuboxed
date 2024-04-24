import React, { lazy, Suspense,useEffect } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import { handleLeadCallModal,getLeadsActivityRecords } from "../../LeadsAction";
import { PlusOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { Tooltip,Badge } from "antd";

const CallLeadsTable = lazy(() => import("./CallLeadsTable"));
const AddCallTaskModal = lazy(() => import("./AddCallTaskModal"));



const TabPane = StyledTabs.TabPane;

 function LeadsCetTab (props) {
  useEffect(() => {
    props.getLeadsActivityRecords(props.rowdata.leadsId);
  }, []);
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
                  <Badge
                count={props.leadsActivityCount.count}
                overflowCount={999}
              > 
                       <i class="fas fa-phone-square"></i>&nbsp;
                  Activity
                  </Badge>
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


const mapStateToProps = ({ leads }) => ({
  addCallTaskModal: leads.addCallTaskModal,
  leadsActivityCount:leads.leadsActivityCount,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleLeadCallModal,
      getLeadsActivityRecords
     
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(LeadsCetTab);


