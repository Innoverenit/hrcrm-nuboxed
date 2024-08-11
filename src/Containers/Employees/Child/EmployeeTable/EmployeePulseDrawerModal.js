import React, { Component,Suspense, lazy} from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import ContactsIcon from '@mui/icons-material/Contacts';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const EmployeeEquipmentForm  =lazy(()=> import("./EmployeeDrawer/EmployeeEquipmentForm"))
const  UserKpiList  =lazy(()=> import("./EmployeeDrawer/UserKpiList"));
const EmployeeTreeMap  =lazy(()=> import("./EmployeeTreeMap"));
const SalaryForm =lazy(()=> import("../EmployeeTable/SalaryForm"));
const TabPane = StyledTabs.TabPane;
class EmployeePulseDrawerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
    };
  }
  handleTabChange = (key) => {
    this.setState({ activeKey: key });

  };
  render() {
    const {
      singleEmployee: { employeeId, middleName, lastName,candidateId },
      toggleViewType,
      singleEmployee,
    } = this.props;
    return (
      <div>
 <StyledDrawer
          title={this.props.employeeName.fullName}
          closable
          maskClosable={false}
          destroyOnClose
          width={"90%"}
          visible={this.props.addDrawerEmployeePulseModal}
        onClose={() => this.props.handleEmployeePulseDrawerModal(false)}
        
        >
          <Suspense fallback={<BundleLoader />}>
      
        
          {/* <EmployeeDocumentView
           employeeId={employeeId}
           documentsByEmployeeId={this.props.documentsByEmployeeId}
          //candidate={candidate}
          />

          <EmployeeTreeMap
          employeeTreeMap={this.props.employeeTreeMap}
          /> */}
           <TabsWrapper style={{ height:"81vh" }}>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            
            <TabPane
              tab={
                <>
                  <span>
 <ContactsIcon className="!text-icon"/>
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
                {/* <AssigenedKpiCardList employeeName={this.props.employeeName}/> */}
                <UserKpiList employeeName={this.props.employeeName}/>
              </Suspense>
            </TabPane>

           

            <TabPane
              tab={
                <>
                  <InsertDriveFileIcon 
                 className="!text-icon"
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



            <TabPane
              tab={
                <>
                  <span>
 <ContactsIcon  className="!text-icon"/>
                    <span class=" ml-1">
                      Salary
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
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <SalaryForm
                 employeeName={this.props.employeeName}
                />
                {/* <UserKpiList employeeName={this.props.employeeName}/> */}
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>
 <ContactsIcon className="!text-icon"/>
                    <span class=" ml-1">
                    Equipment
                    </span>
                  </span>
                </>
              }
              key="4"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <EmployeeEquipmentForm
                 employeeName={this.props.employeeName}
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
const mapStateToProps = ({ profile, auth,employee,candidate }) => ({
    
  singleEmployee: employee.singleEmployee,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getCandidateById
      //getCandidateDocument
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EmployeePulseDrawerModal);
