import React, { Component, Suspense,lazy } from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import { connect } from "react-redux";
import {  Badge } from "antd";
import SourceIcon from '@mui/icons-material/Source';
import PaymentIcon from '@mui/icons-material/Payment';
import FactoryIcon from '@mui/icons-material/Factory';
import { FormattedMessage } from "react-intl";
import LOB from "./LOB/LOB";
import CategoryList from "./CategoryList/CategoryList";
import SupplierCategory from "./SupplierCategory";
import ShipperCategory from "./ShipperCategory";



const TabPane = StyledTabs.TabPane;

class ShipperTab extends Component {
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
        return    <ShipperCategory/>;
      default:
        return null;
    }
  };
  render() {
    const { activeKey } = this.state;
    return (
      <>
         <div class="flex flex-nowrap" >
          <div class=" w-[70%]" >
            <TabsWrapper>
            <StyledTabs
                defaultActiveKey={activeKey}
                onChange={this.handleTabChange}
              >
                <TabPane
                  tab={
                    <>
                      <FactoryIcon />
            
                      <span class="font-poppins ml-1 ">
                      {/* <Badge
                count={this.props.sectorCount.SectorCount}
                overflowCount={999}
              > */}
                
                ShipperCategory 
                       
                        {/* </Badge> */}
                      </span>
                    
                    </>
                  }
                  key="0"
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
const mapStateToProps = ({ sector,lob,categoryList,source,catgCustomer,payments}) => ({
  sectorCount:sector.sectorCount,
  sourceCount:source.sourceCount,
  paymentCount:payments.paymentCount,
  lobCount:lob.lobCount,
  customerCount:catgCustomer.customerCount,
  categoryCount:categoryList.categoryCount,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ShipperTab);
