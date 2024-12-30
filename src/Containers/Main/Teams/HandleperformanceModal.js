import React, {Component,Suspense,lazy } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import ContactsIcon from '@mui/icons-material/Contacts';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
const EmployeeTreeMap = lazy(() => import("../../Employees/Child/EmployeeTable/EmployeeTreeMap"));
const KpiList = lazy(() => import("./KpiList"));
const TabPane = StyledTabs.TabPane;


class HandleperformanceModal extends Component {

  render() {
    
console.log(this.props.rowdata)
    return (
      <div>
        <StyledDrawer
        title={this.props.rowdata.fullName}
          width="50%"
          visible={this.props.addDrawerPerformanceModal}
          destroyOnClose
          closable
          placement="right"
          onClose={() => this.props.handleperformanceDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
          <TabsWrapper style={{width:"100%",overflowY:"auto"}}>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            
            <TabPane
              tab={
                <>
                  <span>
 <ContactsIcon style={{fontSize:"1.1rem"}}/>
                    <span class=" ml-1">
                      Performance
                    </span>
                  </span>
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <KpiList 
            rowdata={this.props.rowdata}
            />
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                  <InsertDriveFileIcon 
                  style={{fontSize:"1.1rem"}}
                  />
                  <span class=" ml-1">
                    360 View
                    
                  </span>
                 
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <EmployeeTreeMap
          employeeTreeMap={this.props.employeeTreeMap}
          />
              </Suspense>
            </TabPane>
        </StyledTabs>
        </TabsWrapper>
        
           
          </Suspense>
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ opportunity, employee }) => ({
  employeeTreeMap:employee.employeeTreeMap,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HandleperformanceModal);
