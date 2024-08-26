import React, { Component, Suspense} from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import { connect } from "react-redux";
import FactoryIcon from '@mui/icons-material/Factory';
import SupplierCategory from "./SupplierCategory";


const TabPane = StyledTabs.TabPane;

class SuppliersTab extends Component {
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
        return    <SupplierCategory />;
      
      default:
        return null;
    }
  };
  render() {
    const { activeKey } = this.state;
    return (
      <>
         <div class="flex flex-nowrap" >
          <div class=" w-[100%]" >
            <TabsWrapper>
            <StyledTabs
                defaultActiveKey={activeKey}
                onChange={this.handleTabChange}
              >
                <TabPane
                  tab={
                    <>
                      <FactoryIcon className=" !text-icon"/>
            
                      <span class="font-poppins ml-1 text-sm ">
                      {/* <Badge
                count={this.props.sectorCount.SectorCount}
                overflowCount={999}
              > */}
                
                   Category 
                       
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

export default connect(mapStateToProps, mapDispatchToProps)(SuppliersTab);
