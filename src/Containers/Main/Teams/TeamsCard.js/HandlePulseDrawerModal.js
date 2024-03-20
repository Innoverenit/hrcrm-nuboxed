import React, { Component,Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from 'styled-components'
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import ContactsIcon from '@mui/icons-material/Contacts';
import PerformanceManList from "./PerformanceManList";
const TabPane = StyledTabs.TabPane;
class HandlePulseDrawerModal extends Component {
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
   
    return (
      <div>
 <StyledDrawer
          title={this.props.rowdata.fullName}
          width={"60%"}
          visible={this.props.addDrawerTeamsPulseModal}
        onClose={() => this.props.handleTeamsPulseDrawerModal(false)}
        
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
                
                      
                      
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <PerformanceManList rowdata={this.props.rowdata}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandlePulseDrawerModal);
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