import { Badge } from "antd";
import React, { lazy,Suspense ,useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
const Certification = lazy(() => import("../Recruitement/Child/Certification/Certification"));
const Library = lazy(() => import("./Library"));
const TabPane = StyledTabs.TabPane;

function SkillsTab(props) {
    const [activeKey, setActiveKey] = useState('1');
      function handleTabChange(key){
        setActiveKey(key)
      }
   return (
        <>
            <TabsWrapper>
                <StyledTabs defaultActiveKey="1" onChange={handleTabChange} type="card">
          
                <TabPane
              tab={
                <>
                     <Badge
  count={props.libraryRecordData.definationCount}
  overflowCount={999}
>
</Badge>
                    <span style={{ marginLeft: "0.25em" }}>
                     Skills
                  </span>
                
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <Library/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                     <Badge
  count={props.certificationRecordData.certificationLibraryCount}
  overflowCount={999}
>
</Badge>
                    <span style={{ marginLeft: "0.25em" }}>
                    Certifications
                  </span>
               
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <Certification />
              </Suspense>
            </TabPane>
                  
                </StyledTabs>
                {/* <h1>Approval</h1> */}
            </TabsWrapper>
        </>
    );
}

const mapStateToProps = ({ auth, librarys }) => ({
    orgId: auth.userDetails.organizationId,
    libraryRecordData:librarys.libraryRecordData,
    certificationRecordData:librarys.certificationRecordData,
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        // getLibraryRecords,
        // getCertificationRecords,
      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(SkillsTab);

