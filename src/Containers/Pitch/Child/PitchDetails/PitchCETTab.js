import React, {Suspense,lazy,useEffect } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import {handlePitchActivityModal,getPitchActivityRecords} from "../../PitchAction"
import { PlusOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { Tooltip,Badge } from "antd";
const PitchTimeline =lazy(()=>import("../../../Pitch/Child/PitchTimeline"));
const AddPitchActivityModal =lazy(()=>import("../PtchActivity/AddPitchActivityModal"));

const TabPane = StyledTabs.TabPane;


 function PitchCETTab (props) {
    useEffect(() => {
        props.getPitchActivityRecords(props.rowdata.investorLeadsId);
      }, [props.rowdata.investorLeadsId]);
  const { addPitchactivityModal, handlePitchActivityModal } = props;
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
                count={props.pitchActivityCount.count}
                overflowCount={999}
              > 
                       <i class="fas fa-phone-square"></i>&nbsp;
                       <FormattedMessage
                        id="app.activity"
                        defaultMessage="Activity"
                      />
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
                       
                        <PlusOutlined
                          type="plus"
                          
                          tooltiptitle={
                            <FormattedMessage
                              id="app.Create"
                              defaultMessage="Create"
                            />
                          }
                          onClick={() => {
                            handlePitchActivityModal(true);
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
                <PitchTimeline
                  rowdata={props.rowdata}
                />
                {/* <LeadsActivityTab 
                 rowdata={props.rowdata}
                /> */}
              </Suspense>
            </TabPane>
          
          </StyledTabs>
        </TabsWrapper>
        <AddPitchActivityModal
        rowdata={props.rowdata}
        addPitchactivityModal={addPitchactivityModal}
        handlePitchActivityModal={handlePitchActivityModal}
        />
      </>
    );
}



const mapStateToProps = ({ pitch }) => ({
  addPitchactivityModal: pitch.addPitchactivityModal,
  pitchActivityCount:pitch.pitchActivityCount

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handlePitchActivityModal,
      getPitchActivityRecords
     
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(PitchCETTab);


