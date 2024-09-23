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
      translatedMenuItems: [],
    };
  }
  componentDidMount() {
    this.fetchMenuTranslations();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }

  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
        "",//0  Performance
        "",//1  360 View
        "",//2 Salary
        "",//3  Equipment
        
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
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
      
      
           <TabsWrapper style={{ height:"81vh" }}>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            
            <TabPane
              tab={
                <>
                  <span>
 <ContactsIcon className="!text-icon"/>
                    <span class=" ml-1">
                    {this.state.translatedMenuItems[0]}{/* Performance */}
                    </span>
                  </span>
               
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                {/* <AssigenedKpiCardList employeeName={this.props.employeeName}/> */}
                <UserKpiList employeeName={this.props.employeeName}
                 translateText={this.props.translateText}
                 selectedLanguage={this.props.selectedLanguage}/>
              </Suspense>
            </TabPane>

           

            <TabPane
              tab={
                <>
                  <InsertDriveFileIcon 
                 className="!text-icon"
                  />
                  <span class=" ml-1">
                  {this.state.translatedMenuItems[1]}   {/* 360 View */}
                    
                  </span>
              
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <EmployeeTreeMap
                 translateText={this.props.translateText}
                 selectedLanguage={this.props.selectedLanguage}
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
                    {this.state.translatedMenuItems[2]} {/* Salary */}
                    </span>
                  </span>
                
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <SalaryForm
                 employeeName={this.props.employeeName}
                 translateText={this.props.translateText}
                 selectedLanguage={this.props.selectedLanguage}
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
                    {this.state.translatedMenuItems[3]}       {/* Equipment */}
                    </span>
                  </span>
                </>
              }
              key="4"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <EmployeeEquipmentForm
                 translateText={this.props.translateText}
                 selectedLanguage={this.props.selectedLanguage}
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
