

import React, { Component, lazy, Suspense } from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import { connect } from "react-redux";
import {  Badge } from "antd";
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import ApartmentIcon from '@mui/icons-material/Apartment';

const Designation = lazy(() => import("../Designation/Designation"));
const Department = lazy(() => import("../Department/Department"));
const Role = lazy(() => import("./Role/Role"));
const RoleTalent = lazy(() => import("./Role/RoleTalent"));

const TabPane = StyledTabs.TabPane;

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "4", 
    };
  }

  handleTabChange = (key) => this.setState({ activeKey: key });

  renderTabContent = (key) => {
    switch (key) {
      case "4":
        return <Department />;
      case "5":
        return <Role />;
      case "6":
        return <RoleTalent />;
      case "7":
        return <Designation />;
        
      default:
        return null;
    }
  };

  render() {
    const { activeKey } = this.state;

    return (
      <>
        <div flexWrap="nowrap">
          <div className="w-full">
            <TabsWrapper>
              <StyledTabs
                defaultActiveKey={activeKey}
                onChange={this.handleTabChange}
              >
 <TabPane
    tab={
        <>
         <ApartmentIcon className="!text-tab text-[#f0386b]"/>
            <span className="ml-1 !text-tab">Department 
            </span>
            <Badge 
            count={this.props.departmentCount.DepartmentCount}
            overflowCount={999}  offset={[ 0, -16]}>
            </Badge>
        </>
    }
    key="4"
/>


                <TabPane
                  tab={
                    <>
                      <AccessibilityIcon  className=" !text-icon"/>
                     
             
                      <span className="ml-1">Role (Internal)  
                      {/* <span className="text-red-500 font-bold">{this.props.roleCount.RoleTypeCount}</span> */}
                      </span>
                      <Badge 
                   count={this.props.roleCount.RoleTypeCount}
                   overflowCount={999}  offset={[ 0, -16]}>
                 </Badge>
                    </>
                  }
                  key="5"
                />
                <TabPane
                  tab={
                    <>
                      <AccessibilityIcon  className=" !text-icon"/>
                      <span className="ml-1">Role (External) 
                      {/* <span className="text-red-500 font-bold">{this.props.externalRoleCount.RoleTypeExternalCount}</span> */}
                      </span>
                      <Badge
                count={this.props.externalRoleCount.RoleTypeExternalCount}
                overflowCount={999} offset={[ 0, -16]}
              >
                   
                      </Badge>
                    </>
                  }
                  key="6"
                />
                <TabPane
                  tab={
                    <>
                      <i className="fab fa-artstation"></i>
                      <span className="ml-1">Designation 
                      {/* <span className="text-red-500 font-bold">{this.props.designationCount.DesignationCount}</span> */}
                      </span>
                      <Badge
                count={this.props.designationCount.DesignationCount}
                overflowCount={999}  offset={[ 0, -16]}
              >
                      
                      </Badge>
                    </>
                  }
                  key="7"
                />
                
              </StyledTabs>

              <Suspense fallback={<div class="flex justify-center">Loading...</div>}>
                {this.renderTabContent(activeKey)}
              </Suspense>
            </TabsWrapper>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({departments,role,designations}) => ({
  departmentCount:departments.departmentCount,
  roleCount:role.roleCount,
  externalRoleCount:role.externalRoleCount,
  designationCount:designations.designationCount,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Category);
