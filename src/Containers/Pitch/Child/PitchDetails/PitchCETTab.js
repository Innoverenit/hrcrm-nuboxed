import React, {Suspense,lazy,useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import {handlePitchActivityModal,getPitchActivityRecords} from "../../PitchAction"
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Tooltip,Badge } from "antd";
import { BundleLoader, } from "../../../../Components/Placeholder";


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
            style={{ overflow: "visible", width: "52vw", padding: "5px" }}
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
                      Activity
                       </Badge>
                  </span>
                
                    <>
                      <Tooltip 
                        title="Create"
                         
                      >
                       
                         <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                         
                          
                          tooltiptitle="Create"                            
                          onClick={() => {
                            handlePitchActivityModal(true);
                          }}
                        
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
        <Suspense fallback={<BundleLoader />}>
        <AddPitchActivityModal
        rowdata={props.rowdata}
        addPitchactivityModal={addPitchactivityModal}
        handlePitchActivityModal={handlePitchActivityModal}
        />
        </Suspense>
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


