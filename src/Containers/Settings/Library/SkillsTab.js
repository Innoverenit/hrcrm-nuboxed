import { Badge } from "antd";
import React, { lazy,Suspense ,useEffect,useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
// import {getLibraryRecords,getCertificationRecords} from "../Library/LibraryAction"
const Certification = lazy(() => import("../Recruitement/Child/Certification/Certification"));
const Library = lazy(() => import("./Library"));
const TabPane = StyledTabs.TabPane;

function SkillsTab(props) {
    const [activeKey, setActiveKey] = useState('1');
    // useEffect(() => {
    //    props.getLibraryRecords(props.orgId);
    //    props.getCertificationRecords(props.orgId)
    //   }, []);
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
                    <span style={{ marginLeft: "0.25em" }}>
                      <FormattedMessage
                        id="app.Skills"
                        defaultMessage="Skills"
                      />
                  </span>
                  </Badge>
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
                    <span style={{ marginLeft: "0.25em" }}>
                      <FormattedMessage
                        id="app.Certifications"
                        defaultMessage="Certifications"
                      />
                  </span>
                  </Badge>
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

