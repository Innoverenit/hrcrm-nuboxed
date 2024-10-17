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
          width="100%"
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
                  {/* {activeKey === "1" && (
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
                              handleInvestorContactModal(true);
                            }}
                            size="0.875em"
                          />
                       
                      </Tooltip>
                    </>
                  )} */}
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
                  {/* {activeKey === "2" && (
                    <>
                      <PlusOutlined
                        type="plus"
                        title={
                          <FormattedMessage
                            id="app.uploaddocument"
                            defaultMessage="Upload Document"
                          />
                        }
                        onClick={() => handleInvestorDocumentUploadModal(true)}
                        size="0.875em"
                        style={{
                          marginLeft: "0.3125em",
                          verticalAlign: "center",
                        }}
                      />
                    </>
                  )} */}
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
