import React, { Component, Suspense } from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import { connect } from "react-redux";
import {  Badge } from "antd";
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import SourceIcon from '@mui/icons-material/Source';
import DevelopmentTab from "../DevelopmentTab/DevelopmentTab";
import Equipment from "../Equipment/Equipment";



const TabPane = StyledTabs.TabPane;

class EmployeeTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "0",
      value: 1,
    };
  }



  handleTabChange = (key) => this.setState({ activeKey: key });

  renderTabContent = (key) => {
    switch (key) {
        case "0":
            return   <DevelopmentTab />;
        case "1":
          return     <Equipment/>;
      

      default:
        return null;
    }
  };
  render() {
    const { activeKey } = this.state;
    return (
      <>
           <div class="flex flex-nowrap" >
          <div class ="w-full" >
            <TabsWrapper>
            <StyledTabs
                defaultActiveKey={activeKey}
                onChange={this.handleTabChange}
              >
            
            <TabPane
                  tab={
                    <>
                      <SourceIcon className="!text-icon" />
                     
                      <span class="!text-tab ml-1 text-sm">
                      Development
                      </span>
                      <Badge
                count={this.props.developeCount.DevelopmentCount}
                overflowCount={999} offset={[ 0, -16]}
              > </Badge>
                    </>
                  }
                  key="0"
                >
              
                </TabPane>
                    <TabPane
                  tab={
                    <>
                      <BuildCircleIcon className="!text-icon" />
                     
                      <span class="!text-tab ml-1 text-sm">
                Equipment 
                      </span>
                      <Badge
                count={this.props.equipmentCount.EquipmentCount}
                overflowCount={999} offset={[ 0, -16]}
              > </Badge>
                    </>
                  }
                  key="1"
                >
              
                </TabPane>
            
              </StyledTabs>
              <Suspense fallback={<div>Loading...</div>}>
                {this.renderTabContent(activeKey)}
              </Suspense>
            </TabsWrapper>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({auth ,equipment,development,itemTask,shipBy}) => ({
  user: auth.userDetails,
  developeCount:development.developeCount,
  itemTaskCount:itemTask.itemTaskCount,
  shipByCount:shipBy.shipByCount,
  equipmentCount:equipment.equipmentCount,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeTab);






