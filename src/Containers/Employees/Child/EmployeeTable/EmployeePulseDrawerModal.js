import React, { Component,Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SalaryForm from "../EmployeeTable/SalaryForm"
import styled from 'styled-components'
import { StyledDrawer } from "../../../../Components/UI/Antd";
import EmployeeTreeMap from "./EmployeeTreeMap";
import EmployeeDocumentView from "./EmployeeDrawer/EmployeeDocumentView";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import ContactsIcon from '@mui/icons-material/Contacts';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import UserKpiList from "./EmployeeDrawer/UserKpiList";
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
          width={"60%"}
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
           <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            
            <TabPane
              tab={
                <>
                  <span>
 <ContactsIcon style={{fontSize:"1.1rem"}}/>
                    <span class=" ml-1">
                      Performance Mangement
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
                <UserKpiList employeeName={this.props.employeeName}/>
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



            <TabPane
              tab={
                <>
                  <span>
 <ContactsIcon style={{fontSize:"1.1rem"}}/>
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
const CardWrapper = styled.div`
border-radius: 1.2rem;
box-shadow: 0 0.5em 0.375em -0.375em rgb(46 44 44);
border: 0.0625em solid #eee;
background-color: #fff;
color: #444;
margin: 0.2rem;
padding: 0.3rem;
width: 8rem;
}
  }
`